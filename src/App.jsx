import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Die from './Die';
import generateRandomDice from './helperFunctions/generateRandomDice';
import timeout from './helperFunctions/timeout';
import initialState from './initialState';
import { ROLL_DICE, SELECT_DIE, LOCK_SELECTED, RESET } from './actions';
import Button from './Button';
import calculateScore from './helperFunctions/calculateScore';
import hasPlayerZilched from './helperFunctions/hasPlayerZilched';
import Scoresheet from './Scoresheet';


const Main = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *, *::before, *::active {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    padding: 0;
  }
`;

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 100vh;
  width: 85%;
  height: 100%;
  margin: 0 auto;
  border: 1px solid black;
`;

const Container = styled.div`
  display: flex;
`;

const StyledScoresheet = styled.div`
  height: 100%;
  border-left: 1px solid black;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 50px) 1fr;
`;

const StyledDice = styled.div`
  display: flex;
  flex-flow: column;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
`;



// ------------------------------------------------------------ //

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
  const [ gameState, setGameState ] = React.useState('INIT');  // INIT | PLAYER_TURN  
  const [ gameStatusMsg, setGameStatusMsg ] = React.useState('');
  const [ turn, setTurn ] = React.useState(true)  // true | false == Player1 | Player2
  const [ p1Banks, setP1Banks ] = React.useState([]);
  const [ p2Banks, setP2Banks ] = React.useState([]);

  async function handleRollButtonClick() {
    if (currentScore > 0 || gameState === "INIT") {
      changeRollDiceStatus(true);
      await timeout(800);
      dispatch( {type: ROLL_DICE, payload: generateRandomDice(dice)} );
      changeRollDiceStatus(false);
    }
  }

  function bankPoints() {
    if (lockedScore + currentScore >= 300) {
      setTotalPoints(lockedScore + currentScore);
      setCurrentScore(0);
      setLockedScore(0);
      setGameState("INIT");
      dispatch({ type: RESET, payload: initialState })
    }
  }

  // calulcating score after each update to dice array
  React.useEffect(() => {
    let score = calculateScore(dice);
    setCurrentScore(score);
  }, [dice])


  // Locking the selected dice when user clicks on roll
  React.useEffect(() => {
    if (!rollDiceStatus) {
      console.log('start');
      dispatch( {type: LOCK_SELECTED} );
      setLockedScore(prev => prev + currentScore);
      setCurrentScore(0);
      if (hasPlayerZilched(dice)) {
        console.log("ZILCH!!!");
        setCurrentScore(0);
        setLockedScore(0);
        setTotalPoints("ZILCH");
        dispatch({type: RESET, payload: initialState});
        setGameState("INIT");
        setGameStatusMsg("ZILCH!!!");
      }
    } else {
      setGameState("PLAYER_TURN")
    }
  }, [rollDiceStatus]);

  // Banking points for respective players after click on bank points button
  React.useEffect(() => {
    if (totalPoints > 0 || totalPoints === "ZILCH") {
      if (turn) {
        setP1Banks(prev => [...prev, totalPoints])
      } else {
        setP2Banks(prev => [...prev, totalPoints])
      }
      setTotalPoints(0);
      setTurn(prev => !prev);
    }
  }, [totalPoints])


  // Async function to clear the game status message after certain time
  async function clearGameStatusMsg () {
    await timeout(1500);
    setGameStatusMsg('');
  }
  // clear gameStatusMsg hook
  React.useEffect(() => {
    clearGameStatusMsg();
  })

  return (
    <StyledApp>
      <Main />
      <Container>
        <StyledDice>
          {
            dice.map(dieObj => dieObj.selected ? {...dieObj, dots: null}: dieObj).map((dieObj, i) => (
              <Die dots={dieObj.dots} key={i} roll={rollDiceStatus} position={dieObj.position} dispatch={dispatch} gameState={gameState}/>
            ))
          }
        </StyledDice>
        <StyledDice>
          {
            dice.map(dieObj => dieObj.selected ?  dieObj: {...dieObj, dots: null}).map((dieObj, i) => (
              <Die dots={dieObj.dots} key={i} position={dieObj.position} dispatch={dispatch} locked={dieObj.locked} gameState={gameState}/>
            ))
          }
        </StyledDice>
        <Controls>
          <Button clickHandler={handleRollButtonClick} gameState={gameState} name="roll">Roll</Button>
          <h4>{gameStatusMsg}</h4>
          <Button clickHandler={bankPoints} gameState={gameState} name="bank">Bank Points</Button>
        </Controls>
      </Container>
      <StyledScoresheet>
        <h3>Target: 10,000 points</h3>
        <h5>Current Points: {currentScore}</h5>
        <h5>Locked Points: {lockedScore}</h5>
        <h5><b>Total Score: {lockedScore + currentScore}</b></h5>
        <Scoresheet p1Banks={p1Banks} p2Banks={p2Banks}></Scoresheet>
      </StyledScoresheet>
    </StyledApp>
  );
}

export default App;
