import { DEPOSIT_TOKENS_JAR_NAMES } from "../Jars/jars";

export const PICKLE_ETH_FARM = "0xdc98556ce24f007a5ef6dc1ce96322d65832a819";

export interface FarmMap {
  [contract: string]: {
    jarName: string;
  };
}
export const JAR_FARM_MAP: FarmMap = {
  "0xf79Ae82DCcb71ca3042485c85588a3E0C395D55b": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.UNIV2_ETH_DAI_OLD,
  },
  "0xCffA068F1E44D98D3753966eBd58D4CFe3BB5162": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.UNIV2_ETH_DAI,
  },
  "0x46206E9BDaf534d057be5EcF231DaD2A1479258B": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.UNIV2_ETH_USDC_OLD,
  },
  "0x53Bf2E62fA20e2b4522f05de3597890Ec1b352C6": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.UNIV2_ETH_USDC,
  },
  "0x3a41AB1e362169974132dEa424Fb8079Fd0E94d8": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.UNIV2_ETH_USDT_OLD,
  },
  "0x09FC573c502037B149ba87782ACC81cF093EC6ef": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.UNIV2_ETH_USDT,
  },
  "0xC1513C1b0B359Bc5aCF7b772100061217838768B": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.UNIV2_FEI_TRIBE,
  },
  "0x927e3bCBD329e89A8765B52950861482f0B227c4": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.UNIV2_LUSD_ETH,
  },
  "0x3Bcd97dCA7b1CED292687c97702725F37af01CaC": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.UNIV2_MIR_UST,
  },
  "0xaFB2FE266c215B5aAe9c4a9DaDC325cC7a497230": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.UNIV2_MTSLA_UST,
  },
  "0xF303B35D5bCb4d9ED20fB122F5E268211dEc0EBd": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.UNIV2_MAAPL_UST,
  },
  "0x7C8de3eE2244207A54b57f45286c9eE1465fee9f": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.UNIV2_MQQQ_UST,
  },
  "0x1ed1fD33b62bEa268e527A622108fe0eE0104C07": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.UNIV2_MSLV_UST,
  },
  "0x1CF137F651D8f0A4009deD168B442ea2E870323A": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.UNIV2_MBABA_UST,
  },
  "0x55282dA27a3a02ffe599f6D11314D239dAC89135": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.SUSHI_ETH_DAI,
  },
  "0x8c2D16B7F6D3F989eb4878EcF13D695A7d504E43": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.SUSHI_ETH_USDC,
  },
  "0xa7a37aE5Cb163a3147DE83F15e15D8E5f94D6bCE": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.SUSHI_ETH_USDT,
  },
  "0xde74b6c547bd574c3527316a2eE30cd8F6041525": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.SUSHI_ETH_WBTC,
  },
  "0x3261D9408604CC8607b687980D40135aFA26FfED": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.SUSHI_ETH_YFI,
  },
  "0x2385D31f1EB3736bE0C3629E6f03C4b3cd997Ffd": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.sCRV_OLD,
  },
  "0x68d14d66B2B0d6E157c06Dc8Fefa3D8ba0e66a89": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.sCRV,
  },
  "0xc80090AA05374d336875907372EE4ee636CBC562": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.UNIV2_ETH_WBTC,
  },
  "0xC66583Dd4E25b3cfc8D881F6DbaD8288C7f5Fd30": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.SUSHI_MIC_USDT,
  },
  "0x1BB74b5DdC1f4fC91D6f9E7906cf68bc93538e33": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES["3CRV"],
  },
  "0x2E35392F4c36EBa7eCAFE4de34199b2373Af22ec": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.renCRV,
  },
  "0x6949Bb624E8e8A90F87cD2058139fcd77D2F3F87": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.DAI,
  },
  "0x5Eff6d166D66BacBC1BF52E2C54dD391AE6b1f48": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.SUSHI_ETH_YVECRV,
  },
  "0xCeD67a187b923F0E5ebcc77C7f2F7da20099e378": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.SUSHI_ETH_YVBOOST,
  },
  "0xECb520217DccC712448338B0BB9b08Ce75AD61AE": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.SUSHI_ETH,
  },
  "0x77C8A58D940a322Aea02dBc8EE4A30350D4239AD": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.steCRV,
  },
  "0x0FAA189afE8aE97dE1d2F01E471297678842146d": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.SUSHI_MIS_USDT,
  },
  "0x9eb0aAd5Bb943D3b2F7603Deb772faa35f60aDF9": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.SUSHI_ETH_ALCX,
  },
  "0xEB801AB73E9A2A482aA48CaCA13B1954028F4c94": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.USDC,
  },
  "0x4fFe73Cf2EEf5E8C8E0E10160bCe440a029166D2": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.lusdCRV,
  },
  "0x729C6248f9B1Ce62B3d5e31D4eE7EE95cAB32dfD": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.fraxCRV,
  },
  "0x9eD7e3590F2fB9EEE382dfC55c71F9d3DF12556c": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.COMETH_USDC_WETH,
  },
  "0x7512105DBb4C0E0432844070a45B7EA0D83a23fD": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.COMETH_PICKLE_MUST,
  },
  "0x91bcc0BBC2ecA760e3b8A79903CbA53483A7012C": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.COMETH_MATIC_MUST,
  },
  "0x0519848e57Ba0469AA5275283ec0712c91e20D8E": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.DAI,
  },
  "0x261b5619d85B710f1c2570b65ee945975E2cC221": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.AM3CRV,
  },
  "0x80aB65b1525816Ffe4222607EDa73F86D211AC95": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.POLY_SUSHI_ETH_USDT,
  },
  "0xd438Ba7217240a378238AcE3f44EFaaaF8aaC75A": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.POLY_SUSHI_MATIC_ETH,
  },
  "0xf12BB9dcD40201b5A110e11E38DcddF4d11E6f83": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.QUICK_MIMATIC_USDC,
  },
  "0x74dC9cdCa9a96Fd0B7900e6eb953d1EA8567c3Ce": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.QUICK_MIMATIC_USDC,
  },
  "0xd06a56c864C80e4cC76A2eF778183104BF0c848d": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.QUICK_MIMATIC_QI,
  },
  "0xDCfAE44244B3fABb5b351b01Dc9f050E589cF24F": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.SUSHI_CVX_ETH,
  },
  "0x65B2532474f717D5A8ba38078B78106D56118bbb": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.LQTY,
  },
  "0xE484Ed97E19F6B649E78db0F37D173C392F7A1D9": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.IRON_3USD,
  },
  "0xe6487033F5C8e2b4726AF54CA1449FEC18Bd1484": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.SADDLE_D4,
  },
  "0x1Bf62aCb8603Ef7F3A0DFAF79b25202fe1FAEE06": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.MIM_3CRV,
  },
  "0xdB84a6A48881545E8595218b7a2A3c9bd28498aE": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.SPELL_ETH,
  },
  "0x993f35FaF4AEA39e1dfF28f45098429E0c87126C": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.MIM_ETH,
  },
  "0xeb8174F94FDAcCB099422d9A816B8E17d5e393E3": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.UNIV2_FOX_ETH,
  },
  "0xC8450922d18793AD97C401D65BaE8A83aE5353a8": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.POLY_SUSHI_DINO_USDC,
  },
  "0x1cCDB8152Bb12aa34e5E7F6C9c7870cd6C45E37F": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.QUICK_DINO_WETH,
  },
  "0xC3f393FB40F8Cc499C1fe7FA5781495dc6FAc9E9": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.CHERRY_OKT_CHE,
  },
  "0xe75c8805f9970c7547255059A22d14001d3D7b94": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.CHERRY_USDT_CHE,
  },
  "0x7072B80D4E259F26b82C2C4e53cDBFB71450195e": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.CHERRY_OKT_USDT
  },
  "0x4a19C49Ee3233A2AE103487f3699D70573EC2371": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.CHERRY_ETHK_USDT
  },
  "0x1d92e1702D7054f74eAC3a9569AeB87FC93e101D": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.SUSHI_TRU_ETH,
  },
  "0x4E9806345fb39FFebd70A01f177A675805019ba8": {
    jarName: DEPOSIT_TOKENS_JAR_NAMES.ibCRV,
  },
};
