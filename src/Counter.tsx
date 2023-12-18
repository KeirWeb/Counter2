import React, { FC } from "react";
import { Button } from "./Button";
import { inputsValue } from "./App";

type CounterProps = {
  counter: number;
  inputsValue: inputsValue;
  incrementCounter: () => void;
  resetValue: () => void;
  error: boolean;
  setMode: boolean;
  onChangeSettingMode: (settingMode: boolean) => void;
};

const Counter: FC<CounterProps> = ({
  counter,
  inputsValue,
  incrementCounter,
  resetValue,
  error,
  setMode,
  onChangeSettingMode,
}) => {
  const incrementCounterHandler = () => {
    incrementCounter();
  };

  const resetValueHandler = () => {
    resetValue();
  };
  const onChangeSettingModeHandler = () => {
    onChangeSettingMode(true);
  };

  return (
    <div className="counter">
      <div
        className={
          counter === inputsValue.maxValue ? "window maxCounter" : "window"
        }
      >
        {setMode && !error && (
          <span className="">enter values and press 'set'</span>
        )}
        {error && <span className="errorMode">Incorrect value!</span>}
        {!setMode && !error && counter}
      </div>
      <div className="buttons">
        <Button
          onClick={incrementCounterHandler}
          disabled={counter === inputsValue.maxValue || setMode || error}
        >
          inc
        </Button>
        <Button
          onClick={resetValueHandler}
          disabled={counter === inputsValue.minValue || setMode || error}
        >
          reset
        </Button>
        <Button onClick={onChangeSettingModeHandler}>set</Button>
      </div>
    </div>
  );
};

export default Counter;
