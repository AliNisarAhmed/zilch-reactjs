import React from 'react';
import styled, { css } from 'styled-components';
import { spin } from './animations';
import { SELECT_DIE } from './actions';


const rollAnimation = css`
  animation: ${spin} ease-out .3s infinite;
`;

const oneDot = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const twoDots = css`
  display: flex;
  justify-content: center;
  align-items: center;
  
  .dots {
    margin: 4px;
    width: 12px;
    height: 12px;
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
    width: 10px;
    height: 10px;
  }
`;

const fourDots = css`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
`;

const fiveDots = css`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  padding: 5px;

  .dots {
    margin: 2px;
    width: 12px;
    height: 12px;
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
    width: 10px;
    height: 10px;
  }
`;

const StyledDie = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  border-radius: 30%;
  padding: 5px;
  background: #282c32;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.4);

  display: flex;
  flex-flow: column;

  ${(props) => dotsGen(props.dots)}
  ${props => props.roll ? rollAnimation: null}
`;

const Dot = styled.div`
  width: 35%;
  height: 35%;
  border-radius: 50%;
  background: white;
`;

const EmptyDie = styled.div`
  width: 60px;
  height: 60px;
  background: white;
  border: 1px solid black;
  border-radius: 30%;
`;


const Die = (props) => {
  
  function clickHandler () {
    props.dispatch( {type: SELECT_DIE, payload: props.position} );
  }

  let dotCount = props.roll ? 6 : props.dots;
  if (props.dots === null) {
    return <EmptyDie />
  } else {
    return (
      <StyledDie dots={dotCount} roll={props.roll} onClick={clickHandler}>
        {new Array(dotCount).fill(1).map((elem, i) => (
          <Dot key={i} className={`dots dots--${i}`} />
        ))}
      </StyledDie>
    );
  }
};

export default Die;


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