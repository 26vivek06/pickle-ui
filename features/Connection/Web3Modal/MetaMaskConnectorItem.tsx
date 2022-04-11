import { useTranslation } from "next-i18next";
import { FC, useEffect } from "react";
import ConnectorItem from "./ConnectorItem";
import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";


interface ConnectorItemProps {
  onClick: Function;
  ethereum: any;
}

export const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions));

const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

const MetaMaskItem: FC<ConnectorItemProps> = ({ onClick, ethereum }) => {
  const { t } = useTranslation("common");

  const icon = "metamask.svg";
  const title = t("connection.metamask");

  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly();
  }, []);

  return (
    <ConnectorItem
      icon={icon}
      disabled={title === t("connection.metamask") && !ethereum}
      title={title}
      loading={isActivating}
      onClick={
        () =>
          onClick(
            metaMask,
            error,
            isActivating,
            isActive,
          ) /* (web3connector, hooks, hooks.useError(), hooks.useIsActivating(),hooks.useIsActive(),hooks.useProvider()) */
      }
      connector={metaMask}
      hooks={hooks}
    />
  );
};
export default MetaMaskItem;
