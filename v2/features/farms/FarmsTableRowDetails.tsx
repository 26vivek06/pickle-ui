import { FC, Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { NULL_ADDRESS } from "picklefinance-core/lib/model/PickleModel";
import { Trans, useTranslation } from "next-i18next";
import { useWeb3React } from "@web3-react/core";
import type { Web3Provider } from "@ethersproject/providers";
import { Chains } from "picklefinance-core";

import { roundToSignificantDigits, shortenAddress } from "v2/utils";
import MoreInfo from "v2/components/MoreInfo";
import Button from "v2/components/Button";
import Link from "v2/components/Link";
import { JarWithData } from "v2/store/core";
import DetailsToggle from "./DetailsToggle";
import FarmDocs from "./FarmDocs";
import { jarSupportsStaking } from "v2/store/core.helpers";

interface Props {
  jar: JarWithData;
  hideDescription?: boolean;
}

interface InfoProps {
  label: string;
  tooltipText: string | null;
  value: string;
}

const InfoRowContent: FC<InfoProps> = ({ label, tooltipText, value }) => (
  <p className="flex py-2 text-foreground-alt-200 justify-between">
    <span className="font-body font-bold">
      {label}
      {tooltipText && (
        <MoreInfo>
          <span className="text-foreground-alt-200 text-sm">{tooltipText}</span>
        </MoreInfo>
      )}
    </span>
    <span className="font-medium text-primary text-base">{value}</span>
  </p>
);

interface ComponentRowProps {
  property: string;
  value: string;
}

const ComponentRow: FC<ComponentRowProps> = ({ property, value }) => (
  <p className="flex justify-between">
    <span className="ml-4 font-body font-medium text-sm">{property}</span>
    <span className="text-primary font-medium text-sm">{value}</span>
  </p>
);

const FarmsTableRowDetails: FC<Props> = ({ jar, hideDescription }) => {
  const { t } = useTranslation("common");
  const chain = Chains.get(jar.chain);
  const { library } = useWeb3React<Web3Provider>();

  const totalTokensInJarAndFarm =
    parseFloat(jar.depositTokensInJar.tokens) + parseFloat(jar.depositTokensInFarm.tokens);

  const userShare = jar.details.tokenBalance
    ? totalTokensInJarAndFarm / jar.details.tokenBalance
    : 0;

  const userShareHarvestUsd =
    userShare *
    (jar.details.harvestStats?.harvestableUSD || 0) *
    (1 - (chain?.defaultPerformanceFee || 0.2));

  const metamaskAdd = async () => {
    const tokenAddress = jar.contract;
    const tokenSymbol = `p${jar.depositToken.name.replace(/[\s\/-]/g, "").substring(0, 10)}`;
    const tokenDecimals = 18;
    const tokenImage = new URL("/tokens/pickle.png", document.baseURI).href;

    if (library?.provider.request !== undefined) {
      try {
        // Returns a boolean. Like any RPC method, an error may be thrown.
        await library.provider.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
              image: tokenImage,
            },
          },
        });
      } catch (error) {}
    }
  };

  return (
    <Disclosure as={Fragment}>
      {({ open }) => (
        <>
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-100 ease-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Disclosure.Panel as="div" className="grid grid-cols-4 py-4 gap-2">
              <div className="pr-4 col-span-3 border-r border-foreground-alt-500">
                <div className="flex justify-between">
                  <span className="font-title text-foreground-alt-200 inline-flex items-center font-medium text-base leading-5">
                    <Trans i18nKey="v2.farms.tokensDeposited">
                      You have
                      <span className="text-primary mx-2">
                        {{ amount: roundToSignificantDigits(totalTokensInJarAndFarm, 7) }}
                      </span>
                      pTokens
                    </Trans>
                    <MoreInfo>
                      <span className="text-foreground-alt-200 text-sm">
                        {t("v2.farms.pToken")}
                      </span>
                    </MoreInfo>
                  </span>
                  <Button onClick={() => metamaskAdd()} type="secondary">
                    {t("v2.farms.metamaskAdd")}
                  </Button>
                </div>
                <div className="pt-2 mb-4">
                  <FarmDocs jar={jar} hideDescription={hideDescription} />
                </div>
                <div className="grid grid-cols-3 py-1">
                  <div>
                    <span className="font-body font-bold text-foreground-alt-200">
                      {t("v2.farms.jarAddress")}
                    </span>
                  </div>
                  <div>
                    <span className="ml-auto">
                      <Link href={`${chain?.explorer}/address/${jar.contract}`} external primary>
                        {shortenAddress(jar.contract)}
                      </Link>
                    </span>
                  </div>
                </div>
                {jar.details?.strategyAddr != NULL_ADDRESS &&
                  jar.details?.strategyAddr !== undefined && (
                    <div className="grid grid-cols-3 py-1">
                      <div>
                        <span className="font-body font-bold text-foreground-alt-200">
                          {t("v2.farms.strategyAddress")}
                        </span>
                      </div>
                      <div>
                        <span className="ml-auto">
                          <Link
                            href={`${chain?.explorer}/address/${jar.details?.strategyAddr}`}
                            external
                            primary
                          >
                            {shortenAddress(jar.details?.strategyAddr!)}
                          </Link>
                        </span>
                      </div>
                    </div>
                  )}
                {jarSupportsStaking(jar) && (
                  <div className="grid grid-cols-3 py-1">
                    <div>
                      <span className="font-body font-bold text-foreground-alt-200">
                        {t("v2.farms.farmAddress")}
                      </span>
                    </div>
                    <div>
                      <span className="ml-auto">
                        <Link
                          href={`${chain?.explorer}/address/${jar.farm?.farmAddress}`}
                          external
                          primary
                        >
                          {shortenAddress(jar.farm?.farmAddress!)}
                        </Link>
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="px-4 border-r border-foreground-alt-500">
                <InfoRowContent
                  label={t("v2.farms.ratio")}
                  tooltipText={t("v2.farms.ratioTooltip")}
                  value={jar.details.ratio?.toFixed(4) || ""}
                />
                <InfoRowContent
                  label={t("v2.farms.pending")}
                  tooltipText={t("v2.farms.pendingTooltip")}
                  value={`$${userShareHarvestUsd.toFixed(4)}`}
                />
                <InfoRowContent
                  label={t("v2.farms.baseApr")}
                  tooltipText={t("v2.farms.baseAprTooltip")}
                  value={`${jar.aprStats?.apr.toFixed(3)}%`}
                />
                <InfoRowContent label={t("v2.farms.yieldRates")} tooltipText={null} value="" />
                <ComponentRow
                  property={t("v2.time.weekly")}
                  value={`${((jar.aprStats?.apr || 0) / 52).toFixed(2)}%`}
                />
                <ComponentRow
                  property={t("v2.time.monthly")}
                  value={`${((jar.aprStats?.apr || 0) / 12).toFixed(2)}%`}
                />
              </div>
            </Disclosure.Panel>
          </Transition>
          <Disclosure.Button as="div">
            <DetailsToggle open={open} />
          </Disclosure.Button>
        </>
      )}
    </Disclosure>
  );
};

export default FarmsTableRowDetails;
