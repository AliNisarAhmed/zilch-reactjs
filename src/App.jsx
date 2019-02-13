import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Die from './Die';
import generateRandomDice from './helperFunctions/generateRandomDice';
import timeout from './helperFunctions/timeout';
import winningConditions from './helperFunctions/winningConditions';
import initialState from './initialState';
import { ROLL_DICE, SELECT_DIE, LOCK_SELECTED, RESET } from './actions';
import Button from './Button';


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

function reducer (state, action) {
  switch (action.type) {
    case ROLL_DICE:
      return action.payload;  
    case SELECT_DIE: 
      return state.map(dieObj => !dieObj.locked && dieObj.position === action.payload ? {...dieObj, selected: !dieObj.selected}: dieObj);
    case LOCK_SELECTED:
      return state.map(dieObj => dieObj.selected ? {...dieObj, locked: true}: dieObj);
    case RESET: 
      return init(action.payload);
    default:
      break;
  }
}

function init(initialState) {
  return initialState;
}


function App () {

  const [ dice, dispatch ] = React.useReducer(reducer, initialState, init);
  const [ rollDiceStatus, changeRollDiceStatus ] = React.useState(false);
  const [ currentScore, setCurrentScore ] = React.useState(0);
  const [ totalPoints, setTotalPoints ] = React.useState(0);
  const [ lockedScore, setLockedScore ] = React.useState(0);
  const [ gameState, setGameState ] = React.useState('ROLL_REQUIRED');

  async function handleRollButtonClick() {
    if (gameState === "ROLL_REQUIRED") {
      changeRollDiceStatus(true);
      await timeout(1000);
      dispatch( {type: ROLL_DICE, payload: generateRandomDice(dice)} );
      changeRollDiceStatus(false);
    }
  }

  function calculateScore() {
    let current = [...dice].sort().filter(dieObj => dieObj.selected && !dieObj.locked);
    console.log(current);
    let currentScore = winningConditions[current.map(dieObj => dieObj.dots).sort()]
    setCurrentScore(currentScore);
  }

  function bankPoints() {
    setTotalPoints(prevTotalPoints => prevTotalPoints + lockedScore + currentScore);
    setCurrentScore(0);
    setLockedScore(0);
    dispatch({ type: RESET, payload: initialState })
  }

  // calulcating score after each update to dice array
  React.useEffect(() => {
    calculateScore();
  }, [dice])


  // Locking the selected dice when user clicks on roll
  React.useEffect(() => {
    if (!rollDiceStatus) {
      console.log('locking');
      dispatch( {type: LOCK_SELECTED} );
      setLockedScore(lockedScore + currentScore);
      setCurrentScore(0);
    }
  }, [rollDiceStatus])

  return (
    <StyledApp>
      <Main />
      <DiceContainer>
        <StyledDice>
          {
            dice.map(dieObj => dieObj.selected ? {...dieObj, dots: null}: dieObj).map((dieObj, i) => (
              <Die dots={dieObj.dots} key={i} roll={rollDiceStatus} position={dieObj.position} dispatch={dispatch} />
            ))
          }
        </StyledDice>
        <StyledDice>
          {
            dice.map(dieObj => dieObj.selected ?  dieObj: {...dieObj, dots: null}).map((dieObj, i) => (
              <Die dots={dieObj.dots} key={i} position={dieObj.position} dispatch={dispatch} locked={dieObj.locked}/>
            ))
          }
        </StyledDice>
      </DiceContainer>
      <div>Current Score: {currentScore}</div>
      <div>Locked Score: {lockedScore}</div>
      <Button clickHandler={handleRollButtonClick} gameState={gameState}>Roll</Button>
      <Button clickHandler={bankPoints} gameState={gameState}>Bank Points</Button>
      <h3>Total Points: {totalPoints}</h3>
    </StyledApp>
  );
}

export default App;
