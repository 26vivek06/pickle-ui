import { JarWithData } from "v2/store/core";
import { JarWithDataV3 } from "../FarmTableRowBodyTransactionControlsUniV3";
import { JarDefinition, PickleModelJson } from "picklefinance-core/lib/model/PickleModelJson";

export const useUniV3 = (jar: JarWithData, core: PickleModelJson | undefined): JarWithDataV3 => {
  if (core === undefined) {
    return {
      ...jar,
      token0: null,
      token1: null,
      proportion: null,
    };
  }

  const found: JarDefinition | undefined = core.assets.jars.find(
    (x) => x.details?.apiKey === jar.details?.apiKey,
  );
  return {} as JarWithDataV3;
};
