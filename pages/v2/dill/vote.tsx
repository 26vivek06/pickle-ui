import { FC, useState } from "react";
import type { PickleFinancePage } from "v2/types";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import { CoreSelectors } from "v2/store/core";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { iOffchainVoteData, VoteSelectors } from "v2/store/offchainVotes";
import { UserSelectors } from "v2/store/user";

import PickleToastContainer from "v2/components/PickleToastContainer";
import LoadingIndicator from "v2/components/LoadingIndicator";

import MainnetVote from "v2/features/dill/vote/MainnetVote";
import OffchainVote from "v2/features/dill/vote/OffchainVote";

const Vote: PickleFinancePage = () => {
  const core = useSelector(CoreSelectors.selectCore);
  const user = useSelector(UserSelectors.selectData);
  const offchainVoteData: iOffchainVoteData | undefined = useSelector(VoteSelectors.selectVoteData);

  const { library } = useWeb3React<Web3Provider>();
  const [onMainnet, setOnMainnet] = useState(false);

  library?.getNetwork().then((n) => (n.chainId === 1 ? setOnMainnet(true) : setOnMainnet(false)));

  return (
    <>
      {core ? (
        user ? (
          onMainnet ? (
            <>
              <MainnetVote core={core} user={user} />
              <hr className="border-foreground-alt-500 mt-5 mb-5" />
              <OffchainVote core={core} offchainVoteData={offchainVoteData} />
            </>
          ) : (
            <>
              <p>
                TEMP - You must be on mainnet to Vote. ( add modal for this message with button to
                switch to mainnet )
              </p>
            </>
          )
        ) : (
          <LoadingIndicator waitForUserModel />
        )
      ) : (
        <LoadingIndicator waitForCore />
      )}
      <PickleToastContainer />
    </>
  );
};

const PageTitle: FC = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <h1 className="font-title font-medium text-2xl sm:text-3xl pt-2">
        {t("v2.dill.vote.title")}
      </h1>
      <h2 className="font-body font-normal text-foreground-alt-200 text-sm sm:text-base leading-4 sm:leading-6 mt-1">
        {t("v2.dill.vote.description")}
      </h2>
    </>
  );
};

Vote.PageTitle = PageTitle;

export { getStaticProps } from "../../../util/locales";

export default Vote;
