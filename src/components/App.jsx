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
import { FREE_ROLL, INIT, PLAYER_TURN, RESTART_REQD } from '../constants/stringConstants';
import calculateTotalScore from '../helperFunctions/calculateTotalScore';

const winCondition = 5000;

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
    background-image: url('../assets/table-top.jpg');
    background-size: cover;
    background-repeat: no-repeat;
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 80px 1fr 80px;
`;

const StyledGameStatusMsg = styled.p`
  grid-column: 2 / 4;
  grid-row: 1 / 2;
  font-weight: bold;
`;

const Controls = styled.div`
  grid-column: 2 / 4;
  grid-row: 3 / 4;
  display: flex;
  justify-content: space-between;
`;

const StyledDiceContainer = styled.div`
  grid-column: 2 / 4;
  grid-row: 2 / 3;
  display: flex;
  flex-flow: column nowrap;
  justify-content:center;
  position: relative;
  border: 1px solid rebeccapurple;
  padding: 10px;
`;

const StyledScoresheet = styled.div`
  height: 100%;
  border-left: 1px solid black;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, 50px) 1fr;
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

  async function rollDice() {
    changeRollDiceStatus(true);
    await timeout(300);
    dispatch( {type: ROLL_DICE, payload: generateRandomDice(dice)} );
    changeRollDiceStatus(false);
  }

  async function handleRollButtonClick() {  // this function handles dice roll
    // roll is only allowed if currentScore is > 0, i.e. player has selected at least one scoring die, or gameState is in INIT
    if (currentScore > 0 || gameState === "INIT" || gameState === FREE_ROLL) {  
      if (gameState === FREE_ROLL) {
        setLockedScore(prev => prev + currentScore);
        setCurrentScore(0);
        setCurrentDieCount(0);
        setLockedDieCount(0);
        dispatch({ type: UNSELECT_ALL });
      } else {
        await rollDice();
      } 
    }
  }

  // Handles Bank Points Button clickabout:blank
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

  function handleRestart () {
    setGameState(INIT);
    dispatch({ type: RESET, payload: initialState });
    setCurrentScore(0);
    setTurn(true);
    setCurrentDieCount(0);
    setLockedDieCount(0);
    setLockedScore(0);
    setP1Banks([]);
    setP2Banks([]);
  }

  // calulcating score after each update to dice array -- depends on [dice]
  React.useEffect(() => {
    if (gameState === PLAYER_TURN) {
      let { score, count } = calculateScore(dice);
      setCurrentScore(score);
      setCurrentDieCount(count);
      console.log("scoring die", currentDieCount);
    }

    else if (gameState === FREE_ROLL) {
      rollDice();
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
      if (gameState === INIT) { 
        // setGameState(PLAYER_TURN);
      } else if (gameState === PLAYER_TURN) {  // this point will be reached when player has clicked on roll after selecting some scoring die
        dispatch({ type: LOCK_SELECTED });
        setLockedScore(prev => prev + currentScore);
        setLockedDieCount(prev => prev + currentDieCount);
        setCurrentScore(0);
        setCurrentDieCount(0);
        if (hasPlayerZilched(dice)) {
          console.log("ZILCH!");
          setTotalPoints("ZILCH");
          dispatch({type: RESET, payload: initialState});
          setGameState("INIT");
          setGameStatusMsg("ZILCH!!!");
          setCurrentScore(0);
          setLockedScore(0);
          setCurrentDieCount(0);
          setLockedDieCount(0);
        }
      } else if (gameState === FREE_ROLL) {
        setGameState(PLAYER_TURN);
      }
    } else if (rollDiceStatus && gameState === "INIT") { // this point will be reached at the start
      console.log('inside player_turn branch');
      setGameState(PLAYER_TURN);
    }
  }, [rollDiceStatus]);

  // Banking points for respective player after click on bank points button
  React.useEffect(() => {
    if (totalPoints > 0 || totalPoints === "ZILCH") {
      if (turn) {
        setP1Banks(prev => [...prev, totalPoints]);
      } else {
        setP2Banks(prev => [...prev, totalPoints]);
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
  }, [gameStatusMsg]);

  // Checking for win
  React.useEffect(() => {
    if (calculateTotalScore(p1Banks) > winCondition || calculateTotalScore(p2Banks) > winCondition) {
      setGameStatusMsg(`Player ${turn ? 1 : 2} Wins!!!`);
      setGameState(RESTART_REQD);
    }
  }, [p1Banks, p2Banks])


  // ------ RENDER ----- //
  return (
    <StyledApp>
      <Main />
      <Container>
        <StyledGameStatusMsg>{gameStatusMsg}</StyledGameStatusMsg>
        <StyledDiceContainer>
          {
            dice.map((die, i) => (
              <Die key={i} dieObj={die} gameState={gameState} dispatch={dispatch} roll={rollDiceStatus} />
            ))
          }
        </StyledDiceContainer>  
        <Controls>
          <Button clickHandler={handleRollButtonClick} gameState={gameState} name="roll">Roll</Button>
          <Button clickHandler={bankPoints} gameState={gameState} name="bank">Bank Points</Button>
          <Button clickHandler={handleRestart} gameState={gameState} name="restart">Restart</Button>
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
