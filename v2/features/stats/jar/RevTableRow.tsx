import { FC } from "react";
import { RecentHarvest, Transfer } from "v2/types";
import { formatDollars, formatDate } from "v2/utils";
import Link from "next/link";

const RevRow: FC<{ recentHarvest: RecentHarvest; chainExplorer: string }> = ({
  recentHarvest,
  chainExplorer,
}) => (
  <tr className="border border-foreground-alt-400 pt-2 pb-2">
    <td className="text-center pt-2 pb-2">
      {recentHarvest.timestamp &&
        formatDate(
          // this condition was added in POC because of sec vs millisec inconsistancy
          // this may not be necessary in the future
          new Date(
            recentHarvest.timestamp > 10 ** 12
              ? recentHarvest.timestamp
              : recentHarvest.timestamp * 1000,
          ),
        )}
    </td>
    <td className="text-center pt-2 pb-2">
      {recentHarvest.transfers && formatTxLink(chainExplorer, recentHarvest.txid)}
    </td>
    <td className="text-center pt-2 pb-2">
      {recentHarvest.transfers &&
        formatDollars(sumHarvestTransfers(recentHarvest.transfers, recentHarvest.fee))}
    </td>
  </tr>
);

const formatTxLink = (chainExplorer: string, txid: string): JSX.Element => (
  <Link href={`${chainExplorer}/tx/${txid}`}>
    <a target="_blank" rel="noreferrer" className="text-accent-light hover:underline">
      {txid.substring(0, 10) + "..."}
    </a>
  </Link>
);

const sumHarvestTransfers = (transfers: Transfer[], fee: number): number => {
  let sum = 0;
  transfers.forEach((x) => (sum = sum + x.usdval));
  return sum / fee;
};

export default RevRow;
