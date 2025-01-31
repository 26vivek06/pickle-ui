import { FC, useState } from "react";
import { useTranslation } from "next-i18next";
import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers } from "ethers";
import { useMachine } from "@xstate/react";
import { useSelector } from "react-redux";
import { UserTokenData } from "picklefinance-core/lib/client/UserModel";
import { ChainNetwork } from "picklefinance-core";

import Button from "v2/components/Button";
import Modal from "v2/components/Modal";
import { CoreSelectors, JarWithData } from "v2/store/core";
import { stateMachine, Actions, States } from "../stateMachineUserInput";
import Form from "../deposit/Form";
import { jarDecimals } from "v2/utils/user";
import AwaitingConfirmation from "../deposit/AwaitingConfirmation";
import AwaitingReceipt from "../AwaitingReceipt";
import Success from "../Success";
import Failure from "../Failure";
import { useFarmContract, useTransaction } from "../hooks";
import { UserActions } from "v2/store/user";
import { truncateToMaxDecimals } from "v2/utils";
import { Gauge, StakedEvent } from "containers/Contracts/Gauge";
import { DepositEvent, Minichef } from "containers/Contracts/Minichef";
import { AppDispatch } from "v2/store";
import { eventsByName } from "../utils";

interface Props {
  jar: JarWithData;
  balances: UserTokenData | undefined;
}

const StakeFlow: FC<Props> = ({ jar, balances }) => {
  const { t } = useTranslation("common");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const core = useSelector(CoreSelectors.selectCore);
  const [current, send] = useMachine(stateMachine);
  const { account } = useWeb3React<Web3Provider>();

  const chain = core?.chains.find((chain) => chain.network === jar.chain);
  const FarmContract = useFarmContract(jar.farm?.farmAddress, chain);

  const decimals = jarDecimals(jar);
  const pTokenBalanceBN = BigNumber.from(balances?.pAssetBalance || "0");
  const pTokenBalance = parseFloat(ethers.utils.formatUnits(pTokenBalanceBN, decimals));
  const pStakedBalanceBN = BigNumber.from(balances?.pStakedBalance || "0");

  const transactionFactory = () => {
    if (!FarmContract || !account) return;

    const { chain } = jar;
    const amount = ethers.utils.parseUnits(truncateToMaxDecimals(current.context.amount), decimals);

    if (chain === ChainNetwork.Ethereum) {
      return () => (FarmContract as Gauge).deposit(amount);
    }

    const poolId = jar.farm?.details?.poolId;
    if (poolId === undefined) return;

    return () => (FarmContract as Minichef).deposit(poolId, amount, account);
  };

  const callback = (receipt: ethers.ContractReceipt, dispatch: AppDispatch) => {
    if (!account) return;

    const { chain } = jar;
    let amount: BigNumber;

    /**
     * This will generate different events on mainnet and on sidechains.
     * On mainnet, read amount from the StakedEvent.
     * On sidechains, read amount from the DepositEvent.
     */
    if (chain === ChainNetwork.Ethereum) {
      const events = eventsByName<StakedEvent>(receipt, "Staked");
      amount = events[0].args.amount;
    } else {
      const events = eventsByName<DepositEvent>(receipt, "Deposit");
      amount = events[0].args.amount;
    }

    const pAssetBalance = pTokenBalanceBN.sub(amount).toString();
    const pStakedBalance = pStakedBalanceBN.add(amount).toString();

    dispatch(
      UserActions.setTokenData({
        apiKey: jar.details.apiKey,
        data: {
          pAssetBalance,
          pStakedBalance,
        },
      }),
    );
  };

  const { sendTransaction, error, setError, isWaiting } = useTransaction(
    transactionFactory(),
    callback,
    send,
    true,
  );

  const openModal = () => {
    send(Actions.RESET);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button
        type="primary"
        state={pTokenBalance > 0 ? "enabled" : "disabled"}
        onClick={openModal}
        className="w-11"
      >
        +
      </Button>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title={t("v2.farms.stakeToken", { token: jar.farm?.farmDepositTokenName })}
      >
        {current.matches(States.FORM) && (
          <Form
            balance={pTokenBalance}
            nextStep={(amount: string) => send(Actions.SUBMIT_FORM, { amount })}
          />
        )}
        {current.matches(States.AWAITING_CONFIRMATION) && (
          <AwaitingConfirmation
            title={t("v2.farms.confirmStake")}
            cta={t("v2.actions.stake")}
            tokenName={jar.farm?.farmDepositTokenName}
            amount={current.context.amount}
            error={error}
            sendTransaction={sendTransaction}
            isWaiting={isWaiting}
            previousStep={() => {
              setError(undefined);
              send(Actions.EDIT);
            }}
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

export default StakeFlow;
