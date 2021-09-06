import { FC, useState } from "react";
import styled from "styled-components";
import { Spacer, Grid, Checkbox } from "@geist-ui/react";

import { MiniFarmCollapsible } from "../MiniFarms/MiniFarmCollapsible";
import { UserMiniFarms } from "../../containers/UserMiniFarms";
import { Connection } from "../../containers/Connection";
import { MiniIcon } from "../../components/TokenIcon";
import { useJarData } from "features/Gauges/useJarData";
import { JAR_FARM_MAP } from "../../containers/Farms/farms";
import { JAR_ACTIVE } from "../../containers/Jars/jars";
import { JarMiniFarmCollapsible } from "./JarMiniFarmCollapsible";
import { uncompoundAPY } from "../../util/jars";
import { NETWORK_NAMES } from "containers/config";
import { copySync } from "fs-extra";

const Container = styled.div`
  padding-top: 1.5rem;
`;

export interface JarApy {
  [k: string]: number;
}

export const MiniFarmList: FC = () => {
  const { signer, chainName } = Connection.useContainer();
  const { farmData } = UserMiniFarms.useContainer();
  const { jarData } = useJarData();
  const [showInactive, setShowInactive] = useState<boolean>(false);

  if (!signer) {
    return <h2>Please connect wallet to continue</h2>;
  }

  if (!jarData || !farmData) return <h2>Loading...</h2>;

  const farmsWithAPY = farmData.map((farm) => {
    let APYs: JarApy[] = [
      { pickle: farm.apy * 100 },
      { matic: farm.maticApy * 100 },
    ];

    const jar =
      JAR_FARM_MAP[farm.depositToken.address as keyof typeof JAR_FARM_MAP];
    if (jar) {
      const farmingJar = jarData.filter((x) => x.name === jar.jarName)[0];
      APYs = farmingJar?.APYs ? [...APYs, ...farmingJar.APYs] : APYs;
    }
    const tooltipText = [
      `Base APRs:`,
      ...APYs.map((x) => {
        const k = Object.keys(x)[0];
        const v = uncompoundAPY(Object.values(x)[0]);
        return `${k}: ${v.toFixed(2)}%`;
      }),
    ]
      .filter((x) => x)
      .join(" <br/> ");

    const totalAPY = APYs.map((x) => {
      return Object.values(x).reduce((acc, y) => acc + y, 0);
    }).reduce((acc, x) => acc + x, 0);

    return {
      ...farm,
      APYs,
      totalAPY,
      tooltipText,
    };
  });

  const isOK = chainName === NETWORK_NAMES.OKEX;
  const activeJars = jarData.filter((jar) => JAR_ACTIVE[jar.depositTokenName]);

  const inactiveJars = jarData.filter(
    (jar) => !JAR_ACTIVE[jar.depositTokenName],
  );

  const activeFarms = farmData?.filter((x) => x.maticApy !== 0);
  const inactiveFarms = farmData?.filter((x) => x.maticApy === 0);

  return (
    <Container>
      <Grid.Container gap={1}>
        <Grid md={16}>
          <p>
            Farms allow you to earn dual PICKLE{" "}
            <MiniIcon source="/pickle.png" /> and MATIC{" "}
            <MiniIcon source={isOK ? "/okex.png" : "/matic.png"} /> rewards by staking tokens. 
            {!isOK && `(Note: MATIC rewards end August 23)`}
            <br />
            Hover over the displayed APY to see where the returns are coming
            from.
          </p>
        </Grid>
        <Grid md={8} style={{ textAlign: "right" }}>
          <Checkbox
            checked={showInactive}
            size="medium"
            onChange={(e) => setShowInactive(e.target.checked)}
          >
            Show Inactive Farms
          </Checkbox>
        </Grid>
      </Grid.Container>
      <Spacer y={0.5} />
      <Grid.Container gap={1}>
        {activeJars.map((jar) => {
          const farm = farmsWithAPY.find(
            (x) =>
              x.depositToken.address.toLowerCase() ===
              jar.jarContract.address.toLowerCase(),
          );
          return (
            <Grid xs={24} key={jar.name}>
              {farm && <JarMiniFarmCollapsible farmData={farm} jarData={jar} />}
            </Grid>
          );
        })}
      </Grid.Container>
      <Spacer y={1} />
      <Grid.Container gap={1}>
        {showInactive && <h2>Inactive</h2>}
        {showInactive &&
          inactiveJars.map((jar) => {
            const farm = farmsWithAPY.find(
              (x) =>
                x.depositToken.address.toLowerCase() ===
                jar.jarContract.address.toLowerCase(),
            );
            return (
              <Grid xs={24} key={jar.name}>
                {farm && (
                  <JarMiniFarmCollapsible jarData={jar} farmData={farm} />
                )}
              </Grid>
            );
          })}
      </Grid.Container>
    </Container>
  );
};
