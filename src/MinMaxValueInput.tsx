import React, { FC } from "react";
import { inputsValue } from "./App";

type MaxMinInput = {
  labelValue: string;
  value: number;
  onChangeInputsValue: (
    newValue: number | string,
    name: keyof inputsValue
  ) => void;
  error: boolean;
  name: keyof inputsValue;
};
export const MaxMinInput: FC<MaxMinInput> = ({
  labelValue,
  value,
  error,
  onChangeInputsValue,
  name,
}) => {
  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isInteger(+e.currentTarget.value)) {
      onChangeInputsValue(+e.currentTarget.value || "", name);
    }
  };
  return (
    <label className="label">
      {labelValue}
      <input
        className={error ? "input errorInput" : "input"}
        value={value}
        type="number"
        onChange={onChangeInputHandler}
      />
    </label>
  );
};
