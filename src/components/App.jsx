import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Die from './Die';
import generateRandomDice from '../helperFunctions/generateRandomDice';
import timeout from '../helperFunctions/timeout';
import initialState from '../constants/initialState';
import { ROLL_DICE, SELECT_DIE, LOCK_SELECTED, RESET, UNSELECT_ALL } from '../constants/actions';
import Button from './Button';
import calculateScore from '../helperFunctions/calculateScore';
import hasPlayerZilched from '../helperFunctions/hasPlayerZilched';
import Scoresheet from './Scoresheet';
import { FREE_ROLL } from '../constants/stringConstants';


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
  grid-template-rows: repeat(5, 50px) 1fr;
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
    case UNSELECT_ALL: 
      return state.map(dieObj => ({ ...dieObj, selected: false, locked: false }));
    case RESET: 
      return action.payload;
    default:
      break;
  }
}


function App () {

  const [ dice, dispatch ] = React.useReducer(reducer, initialState); // Array containing DieObj = {position, dots, selected, locked}
  const [ rollDiceStatus, changeRollDiceStatus ] = React.useState(false);  // turns true when the dices are being rolled.
  const [ currentScore, setCurrentScore ] = React.useState(0);  // the current Score of the player
  const [ lockedScore, setLockedScore ] = React.useState(0);  // the points the player has already locked in previous turns
  const [ totalPoints, setTotalPoints ] = React.useState(0);  // lockedScore + currentScore
  const [ gameState, setGameState ] = React.useState('INIT');  // INIT | PLAYER_TURN | FREE_ROLL 
  const [ gameStatusMsg, setGameStatusMsg ] = React.useState('');  // Messages to be shown to player
  const [ turn, setTurn ] = React.useState(true)  // true | false == Player1 | Player2
  const [ p1Banks, setP1Banks ] = React.useState([]);  // array containing the points banked by player1 on each turn
  const [ p2Banks, setP2Banks ] = React.useState([]);  // same array as above for player2
  const [ currentDieCount, setCurrentDieCount ] = React.useState(0);  // used to count the number of scoring die
  const [ lockedDieCount, setLockedDieCount ] = React.useState(0);  // used to count the number of scoring die
  // const [ freeRoll, setFreeRoll ] = React.useState(false);  // if countScoringDie reaches 6 the player has earned FREE ROLL

  async function handleRollButtonClick() {  // this function handles dice roll
    // roll is only allowed if currentScore is > 0, i.e. player has selected at least one scoring die, or gameState is in INIT
    if (currentScore > 0 || gameState === "INIT" || gameState === FREE_ROLL) {  
      if (gameState === FREE_ROLL) {
        dispatch({ type: RESET, payload: initialState });
      } 
      changeRollDiceStatus(true);
      await timeout(300);
      dispatch( {type: ROLL_DICE, payload: generateRandomDice(dice)} );
      changeRollDiceStatus(false);
    }
  }

  // Handles Bank Points Button click
  function bankPoints() {
    // Banking is allowed only if the player has TotalScore of 300 or more in the current turn
    if (lockedScore + currentScore >= 300) {
      setTotalPoints(lockedScore + currentScore);
      setCurrentScore(0);
      setLockedScore(0);
      setGameState("INIT");
      dispatch({ type: RESET, payload: initialState })
    }
  }

  // calulcating score after each update to dice array -- depends on [dice]
  React.useEffect(() => {
    if (dice.some(dieObj => dieObj.selected)) {
      let { score, count } = calculateScore(dice);
      setCurrentScore(score);
      setCurrentDieCount(count);
      console.log("scoring die", currentDieCount);
    }
  }, [dice])

  // checking for FREE ROLL 
  React.useEffect(() => {
    if (gameState !== FREE_ROLL && lockedDieCount + currentDieCount === 6) {
      // setFreeRoll(true);
      console.log('free roll');
      setGameState(FREE_ROLL);
      setGameStatusMsg(FREE_ROLL);
    }
  }, [currentDieCount]);

  // Locking the selected dice when user clicks on roll
  React.useEffect(() => {
    console.log('roll clicked')
    if (!rollDiceStatus) {
      console.log('inside !rollDiceStatus')
      // checking immediately after dice roll
      if (gameState === FREE_ROLL) {
        console.log('free roll path inside roll clicked');
        setGameState("INIT");
        dispatch( {type: ROLL_DICE, payload: generateRandomDice(dice)} );
        setLockedScore(prev => prev + currentScore);
        setLockedDieCount(prev => prev + currentDieCount);
        setCurrentScore(0);
        setCurrentDieCount(0);
      } else if (gameState === "PLAYER_TURN" && currentScore > 0) {
        console.log('inside not FREE_ROLL');
        dispatch({ type: LOCK_SELECTED });
        setLockedScore(prev => prev + currentScore);
        setLockedDieCount(prev => prev + currentDieCount);
        setCurrentScore(0);
        setCurrentDieCount(0);
        if (hasPlayerZilched(dice)) {
          console.log("ZILCH!!!");
          setCurrentScore(0);
          setLockedScore(0);
          setTotalPoints("ZILCH");
          dispatch({type: RESET, payload: initialState});
          setGameState("INIT");
          setGameStatusMsg("ZILCH!!!");
        }
      }
    } else if (rollDiceStatus && gameState === "INIT") {
      console.log('inside player_turn branch');
      setGameState("PLAYER_TURN")
    }
  }, [rollDiceStatus]);

  // Banking points for respective player after click on bank points button
  React.useEffect(() => {
    if (totalPoints > 0 || totalPoints === "ZILCH") {
      if (turn) {
        setP1Banks(prev => [...prev, totalPoints])
      } else {
        setP2Banks(prev => [...prev, totalPoints])
      }
      setTotalPoints(0);
      setLockedDieCount(0);
      setTurn(prev => !prev);
    }
  }, [totalPoints])


  // function to clear the game status message after certain time
  async function clearGameStatusMsg (time) {
    await timeout(time);
    setGameStatusMsg('');
  }
  // clear gameStatusMsg hook
  React.useEffect(() => {
    if (gameStatusMsg === FREE_ROLL) {
      clearGameStatusMsg(4000);
    } else {
      clearGameStatusMsg(1500);
    }
  }, [gameStatusMsg])


  // ------ RENDER ----- //
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
        <h4>{turn ? "Player 1" : "Player 2"}</h4>
        <h5>Current Points: {currentScore}</h5>
        <h5>Locked Points: {lockedScore}</h5>
        <h5><b>Total Score: {lockedScore + currentScore}</b></h5>
        <Scoresheet p1Banks={p1Banks} p2Banks={p2Banks}></Scoresheet>
      </StyledScoresheet>
    </StyledApp>
  );
}

export default App;
