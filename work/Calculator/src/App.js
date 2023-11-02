import React from "react";
import "./App.css";
import { useState } from "react";
import styled from "@emotion/styled";

const App = () => {
  //style
  const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  `;
  const ButtonContainer = styled.div`
    display: grid;
    width: 40%;
    max-width: 450px;
    height: 50%;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  `;
  const Button = styled.button``;
  const CalButton = styled(Button)``;
  const ZeroButton = styled(Button)`
    grid-column: 1/3;
  `;
  const InputBar = styled.input`
    width: 40%;
    max-width: 450px;
    height: 65px;
    margin-bottom: 10px;
    font-size: 30px;
    text-align: right;
    padding-right: 20px;
  `;

  //Hook
  const [result, setCalc] = useState("");
  const [operCheck, setOperCheck] = useState(true);
  const [pointCheck, setPointCheck] = useState(true);

  //operation
  const getNum = (e) => {
    setCalc((prev) => prev + e.target.value);
    setOperCheck(true);
  };
  const getOper = (e) => {
    setCalc((prev) => prev + e.target.value);
    setOperCheck(false);
    setPointCheck(true);
  };

  //operation symbol
  const getPoint = (e) => {
    if (result.length === 0) {
      return;
    }
    if (pointCheck) {
      setCalc((prev) => prev + e.target.value);
      setPointCheck(false);
    }
  };

  //point
  const getResult = () => {
    //replacement of symbol
    let replace_str = result.replace(/×/gi, "*").replace(/÷/gi, "/");

    if (isNaN(eval(replace_str))) {
      setCalc("");
    } else if (eval(replace_str) == Infinity) {
      alert("Can't divide by 0");
      setCalc("");
      return false;
    } else {
      setCalc((prev) => eval(replace_str));
    }
  };

  //modify
  const delCalc = () => {
    setPointCheck(true);
    setOperCheck(true);
    let str = String(result).slice(0, -1);
    setCalc((prev) => str);
  };
  const allClear = () => {
    setPointCheck(true);
    setCalc((prev) => "");
  };

  return (
    <MainContainer>
      <InputBar readOnly value={result} />
      <ButtonContainer>
        <Button onClick={allClear}>AC</Button>
        <Button onClick={delCalc}>DEL</Button>
        <CalButton value="%" onClick={getOper}>
          %
        </CalButton>
        <CalButton value="÷" onClick={getOper}>
          ÷
        </CalButton>
        <Button value={7} onClick={getNum}>
          7
        </Button>
        <Button value={8} onClick={getNum}>
          8
        </Button>
        <Button value={9} onClick={getNum}>
          9
        </Button>
        <CalButton value="×" onClick={getOper}>
          ×
        </CalButton>
        <Button value={4} onClick={getNum}>
          4
        </Button>
        <Button value={5} onClick={getNum}>
          5
        </Button>
        <Button value={6} onClick={getNum}>
          6
        </Button>
        <CalButton value="-" onClick={getOper}>
          -
        </CalButton>
        <Button value={1} onClick={getNum}>
          1
        </Button>
        <Button value={2} onClick={getNum}>
          2
        </Button>
        <Button value={3} onClick={getNum}>
          3
        </Button>
        <CalButton value="+" onClick={getOper}>
          +
        </CalButton>
        <ZeroButton value={0} onClick={getNum}>
          0
        </ZeroButton>
        <Button value="." onClick={getPoint}>
          .
        </Button>
        <CalButton onClick={getResult}>=</CalButton>
      </ButtonContainer>
    </MainContainer>
  );
};

export default App;
