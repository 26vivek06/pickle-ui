import { ChangeEvent, FC, useState } from "react";
import { useTranslation } from "next-i18next";

import Button from "v2/components/Button";
import ErrorMessage from "../Error";
import AmountSteps from "v2/components/AmountSteps";
import { JarWithData } from "v2/store/core";

interface Props {
  balance0: number;
  balance1: number;
  jar: JarWithData;
  nextStep: (amount: string) => void;
}

const FormUniV3: FC<Props> = ({ balance0, balance1, jar, nextStep }) => {
  const { t } = useTranslation("common");
  const [amount0, setAmount0] = useState<string>(balance0.toString());
  const [amount1, setAmount1] = useState<string>(balance1.toString());

  const invalidAmountError = Error(t("v2.farms.invalidAmount"));
  const [error, setError] = useState<Error | undefined>();

  const validate = (value: string, balance: number) => {
    if (!value) {
      setError(invalidAmountError);
      return;
    }

    const amount = parseFloat(value);
    const isValid = amount > 0 && amount <= balance;

    isValid ? setError(undefined) : setError(invalidAmountError);
  };

  const handleChange0 = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setAmount0(value);
    validate(value, balance0);
  };

  const handleChange1 = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setAmount1(value);
    validate(value, balance1);
  };
  const handleFormSubmit = () => {
    if (error) return;

    nextStep(amount0);
  };

  return (
    <>
      <h2 className="text-foreground-alt-100 flex font-title text-lg mb-4 ml-4">
        {jar.token0?.name.toUpperCase()}
      </h2>
      <div className="bg-background-lightest rounded-xl px-4 py-2 mb-6">
        <div className="flex justify-between mb-2">
          <p className="font-bold text-foreground-alt-300 text-xs tracking-normal leading-4">
            {t("v2.balances.amount")}
          </p>
          <p className="font-bold text-foreground-alt-300 text-xs tracking-normal leading-4">
            {t("v2.balances.balance")}: {balance0}
          </p>
        </div>

        <div className="flex justify-between">
          <input
            type="number"
            className="w-3/5 bg-transparent focus:outline-none flex-shrink-0 font-medium text-primary leading-7"
            value={amount0}
            onChange={handleChange0}
          />
          <Button
            size="small"
            onClick={() => {
              setAmount0(balance0.toString());
              validate(balance0.toString(), balance0);
            }}
          >
            {t("v2.balances.max")}
          </Button>
        </div>
      </div>

      <h2 className="text-foreground-alt-100 flex font-title text-lg mt-6 mb-4 ml-4">
        {jar.token1?.name.toUpperCase()}
      </h2>
      <div className="bg-background-lightest rounded-xl px-4 py-2 mb-6">
        <div className="flex justify-between mb-2">
          <p className="font-bold text-foreground-alt-300 text-xs tracking-normal leading-4">
            {t("v2.balances.amount")}
          </p>
          <p className="font-bold text-foreground-alt-300 text-xs tracking-normal leading-4">
            {t("v2.balances.balance")}: {balance1}
          </p>
        </div>

        <div className="flex justify-between">
          <input
            type="number"
            className="w-3/5 bg-transparent focus:outline-none flex-shrink-0 font-medium text-primary leading-7"
            value={amount1}
            onChange={handleChange1}
          />
          <Button
            size="small"
            onClick={() => {
              setAmount1(balance1.toString());
              validate(balance1.toString(), balance1);
            }}
          >
            {t("v2.balances.max")}
          </Button>
        </div>
      </div>

      <ErrorMessage error={error} />
      <Button state={error ? "disabled" : "enabled"} onClick={handleFormSubmit}>
        {t("v2.actions.confirm")}
      </Button>
    </>
  );
};

export default FormUniV3;
