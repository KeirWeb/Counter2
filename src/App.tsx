import { useEffect, useState } from "react";
import "./App.css";
import Counter from "./Counter";
import CounterSettings from "./CounterSettings";

export type inputsValue = {
  maxValue: number;
  minValue: number;
};
export type error = {
  maxValueError: boolean;
  minValueError: boolean;
};

function App() {
  const minValueAsNumber = JSON.parse(
    localStorage.getItem("minValue") || "null"
  );
  const maxValueAsNumber = JSON.parse(
    localStorage.getItem("maxValue") || "null"
  );
  const minInitialValue = minValueAsNumber ? minValueAsNumber : 0;
  const maxInitialValue = maxValueAsNumber ? maxValueAsNumber : 1;

  const [counter, setCounter] = useState<number>(minInitialValue);

  const [inputsValue, setInputsValue] = useState<inputsValue>({
    maxValue: maxInitialValue,
    minValue: minInitialValue,
  });
  const { maxValue, minValue } = inputsValue;
  const [settingMode, setSettingMode] = useState<boolean>(false);
  const [setMode, setSetMode] = useState<boolean>(false);
  const incrementCounter = () => {
    setCounter((prev) => prev + 1);
  };
  const resetValue = () => {
    setCounter(minInitialValue);
  };

  const onChangeInputsValue = (
    newValue: number | string,
    name: keyof inputsValue
  ) => {
    if (!setMode) {
      setSetMode(true);
    }

    setInputsValue({ ...inputsValue, [name]: newValue });
  };

  const onChangeSetMode = () => {
    if (!errorMode) {
      setSetMode(false);

      localStorage.setItem("maxValue", JSON.stringify(maxValue));
      localStorage.setItem("minValue", JSON.stringify(minValue));
      setCounter(minValue);
    }
  };

  const onChangeSettingMode = (settingMode: boolean) => {
    setSettingMode(settingMode);
  };

  const errorMode = minValue < 0 || maxValue < 1 || maxValue <= minValue;
  const minValueInputErrorMode = minValue < 0 || maxValue <= minValue;
  const maxValueInputErrorMode = maxValue < 1 || maxValue <= minValue;

  return (
    <div className="App">
      {settingMode ? (
        <CounterSettings
          onChangeSetMode={onChangeSetMode}
          inputsValue={inputsValue}
          minValueInputErrorMode={minValueInputErrorMode}
          maxValueInputErrorMode={maxValueInputErrorMode}
          errorMode={errorMode}
          onChangeInputsValue={onChangeInputsValue}
          onChangeSettingMode={onChangeSettingMode}
        />
      ) : (
        <Counter
          error={errorMode}
          setMode={setMode}
          counter={counter}
          incrementCounter={incrementCounter}
          resetValue={resetValue}
          inputsValue={inputsValue}
          onChangeSettingMode={onChangeSettingMode}
        />
      )}
    </div>
  );
}

export default App;
