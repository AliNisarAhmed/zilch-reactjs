import React from 'react';
import styled, { css } from 'styled-components';
import { spin } from '../constants/animations';
import { SELECT_DIE } from '../constants/actions';


const rollAnimation = css`
  animation: ${spin} ease-out .3s infinite;
`;

const oneDot = css`
  display: flex;
  justify-content: center;
  align-items: center;
  .dots {
    width: 30%;
    height: 30%;
  }
`;

const twoDots = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-flow: row;
  
  .dots {
    width: 30%;
    height: 30%;
  }
`;

const threeDots = css`
  display: flex;
  justify-content: center;
  align-items: center;
  .dots--0 {
    align-self: flex-end;
  }

  .dots--2 {
    align-self: flex-start;
  }

  .dots {
    width: 26%;
    height: 26%;
  }
`;

const fourDots = css`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  .dots {
    width: 50%;
    height: 50%;
  }
`;

const fiveDots = css`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  padding: 5px;

  .dots {
    width: 60%;
    height: 60%;
  }  

  .dots--1 {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }

  .dots--2 {
    grid-row: 1 / 2;
    grid-column: 3 / 4;
  }

  .dots--3 {
    grid-row: 3 / 4;
    grid-column: 1 / 2;
  }

  .dots--4 {
    grid-row: 3 / 4;
    grid-column: 3 / 4;
  }
`;

const sixDots = css`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;

  .dots {
    width: 43%;
    height: 50%;
  }
`;

const hoveredDieStyles = css`
  transform: scale(1.1);
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.4);
  cursor: pointer;
`;

const StyledDie = styled.div`
  width: 50px;
  height: 50px;
  margin-bottom: 5px;
  border-radius: 30%;
  padding: 5px;
  background: #282c32;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.4);
  transition: 
    transform .2s,
    left .4s;

  display: flex;
  flex-flow: column;

  position: absolute;
  left: ${props => props.dieObj.selected ? "60%": "10%"};
  top: ${props => String((props.dieObj.position - 1) * 16.5) + "%"};

  ${(props) => dotsGen(props.dots)}
  ${props => props.roll && !props.dieObj.selected ? rollAnimation: null}

  :hover {
    ${props => props.gameState !== "INIT" ? hoveredDieStyles: null}
  }

  @media only screen and (max-width: 800px) {
    width: 40px;
    height: 40px;
  }
  @media only screen and (max-width: 400px) {
    width: 30px;
    height: 30px;
  }
`;

const Dot = styled.div`
  border-radius: 50%;
  background: white;
`;


const Die = ({ gameState, dispatch, dieObj, roll }) => {
  
  function clickHandler () {
    if (gameState !== "INIT") {
      dispatch( {type: SELECT_DIE, payload: dieObj.position} );
    }
  }

  let dotCount = roll && !dieObj.selected ? 5 : dieObj.dots;
  
  return (
    <StyledDie dots={dotCount} dieObj={dieObj} roll={roll} onClick={clickHandler} gameState={gameState}>
      {new Array(dotCount).fill(1).map((elem, i) => (
        <Dot key={i} className={`dots dots--${i}`} />
      ))}
    </StyledDie>
  );
};

export default Die;

// used to select one of the six css style groups based on number of dots
function dotsGen (dots) {
  switch (dots) {
    case 1:
      return oneDot;
    case 2:
      return twoDots
    case 3: 
      return threeDots;
    case 4: 
      return fourDots;
    case 5: 
      return fiveDots;
    case 6:
      return sixDots;
    default:
      break;
  }
}