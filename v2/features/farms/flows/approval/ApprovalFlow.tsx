import { FC, useState } from "react";
import { useTranslation } from "next-i18next";
import { ethers } from "ethers";
import { useMachine } from "@xstate/react";
import { IUserDillStats, UserTokenData } from "picklefinance-core/lib/client/UserModel";
import { ChainNetwork, Chains } from "picklefinance-core";

import Button from "v2/components/Button";
import Modal from "v2/components/Modal";
import { stateMachine, Actions, States } from "../stateMachineNoUserInput";
import AwaitingConfirmationNoUserInput from "../AwaitingConfirmationNoUserInput";
import AwaitingReceipt from "../AwaitingReceipt";
import Success from "../Success";
import Failure from "../Failure";
import { useTokenContract, useTransaction } from "../hooks";
import { AppDispatch } from "v2/store";
import { UserActions } from "v2/store/user";
import { ApprovalEvent } from "containers/Contracts/Erc20";
import { eventsByName } from "../utils";

interface Props {
  apiKey?: string;
  tokenAddress: string;
  tokenName: string | undefined;
  spenderAddress: string | undefined;
  storeAttribute: keyof UserTokenData | keyof IUserDillStats;
  chainName: ChainNetwork;
  visible: boolean;
}

const ApprovalFlow: FC<Props> = ({
  apiKey,
  tokenAddress,
  tokenName,
  spenderAddress,
  storeAttribute,
  chainName,
  visible,
}) => {
  const { t } = useTranslation("common");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [current, send] = useMachine(stateMachine);
  const TokenContract = useTokenContract(tokenAddress);

  const chain = Chains.get(chainName);
  const amount = ethers.constants.MaxUint256;

  const transactionFactory = () => {
    if (!TokenContract || !spenderAddress) return;

    return () => TokenContract.approve(spenderAddress, amount);
  };

  const callback = (receipt: ethers.ContractReceipt, dispatch: AppDispatch) => {
    const approvalEvents = eventsByName<ApprovalEvent>(receipt, "Approval");
    const approvedAmount = approvalEvents[0].args[2];

    // No apiKey implicitly means DILL approval.
    if (!apiKey) {
      dispatch(UserActions.setDillData({ [storeAttribute]: approvedAmount.toString() }));

      return;
    }

    dispatch(
      UserActions.setTokenData({
        apiKey: apiKey,
        data: { [storeAttribute]: approvedAmount.toString() },
      }),
    );
  };

  const { sendTransaction, error, isWaiting } = useTransaction(
    transactionFactory(),
    callback,
    send,
  );

  const openModal = () => {
    send(Actions.RESET);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {visible && <Button onClick={openModal}>{t("v2.actions.approve")}</Button>}
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title={t("v2.farms.approveToken", { token: tokenName })}
      >
        {current.matches(States.AWAITING_CONFIRMATION) && (
          <AwaitingConfirmationNoUserInput
            title={t("v2.farms.givePermission", { token: tokenName })}
            error={error}
            sendTransaction={sendTransaction}
            isWaiting={isWaiting}
            cta={t("v2.actions.approve")}
          />
        )}
        {current.matches(States.AWAITING_RECEIPT) && (
          <AwaitingReceipt chainExplorer={chain?.explorer} txHash={current.context.txHash} />
        )}
        {current.matches(States.SUCCESS) && (
          <Success
            chainExplorer={chain?.explorer}
            txHash={current.context.txHash}
            closeModal={closeModal}
          />
        )}
        {current.matches(States.FAILURE) && (
          <Failure
            chainExplorer={chain?.explorer}
            txHash={current.context.txHash}
            retry={() => send(Actions.RESET)}
          />
        )}
      </Modal>
    </>
  );
};

export default ApprovalFlow;
