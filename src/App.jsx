import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Die from './Die';
import generateRandomDice from './helperFunctions/generateRandomDice';
import timeout from './helperFunctions/timeout';

const Main = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *, *::before, *::active {
    box-sizing: inherit;
  }
  body {
    background: white;
  }
`;

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
`;

const DiceContainer = styled.div`
  display: flex;
`;

const StyledDice = styled.div`
  display: flex;
  flex-flow: column;
`;


function App () {

  const [ dice, rollDice ] = React.useState([1, 2, 3, 4, 5, 6]);
  const [ rollDiceStatus, changeRollDiceStatus ] = React.useState(false);
  const [ selectedDice, setSelectedDice ] = React.useState([null, null, null, null, null, null]);

  async function handleRollButtonClick() {
    changeRollDiceStatus(true);
    await timeout(1000);
    rollDice(generateRandomDice(6));
    changeRollDiceStatus(false);
  }

  function selectDie(name, position, dots) {
    if (name === "notSelected") {
      rollDice(dice.map((d, i) => i === position ? null: d));
      setSelectedDice(selectedDice.map((d, i) => i === position ? dots: d));
    } else {
      rollDice(dice.map((d, i) => i === position ? dots: d));
      setSelectedDice(selectedDice.map((d, i) => i === position ? null : d));
    }
  }

  return (
    <StyledApp>
      <Main />
      <DiceContainer>
        <StyledDice>
          {
            dice.map((die, i) => (
              <Die dots={die} key={i} roll={rollDiceStatus} position={i} selectDie={selectDie} name="notSelected"/>
            ))
          }
        </StyledDice>
        <StyledDice>
          {
            selectedDice.map((die, i) => (
              <Die dots={die} key={i} position={i} selectDie={selectDie} name="selected"/>
            ))
          }
        </StyledDice>
      </DiceContainer>
      <button onClick={handleRollButtonClick}>Roll</button>
    </StyledApp>
  );
}

export default App;
