import React from 'react'
import styled, { css } from 'styled-components';
import { callToAction } from './animations'

const animateButton = css`
  animation: ${callToAction} 1s infinite backwards;
`;

const StyledButton = styled.button`
  display: inline-block;  
  width: 200px;
  height: 50px;
  color: blue;
  background-color: whitesmoke;
  border: 1px solid blue;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  margin-top: 5px;
  position: relative;

  :hover {
    color: whitesmoke;
    background-color: blue;
  }

  ::after {
    content: "";
    z-index: -1;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: blue;
    border-radius: 8px;
    ${props => 
        props.gameState === "INIT" && props.name === "roll" ?
        animateButton :
        null
    }
  }

`;

export default function Button({ children, clickHandler, gameState, name }) {
  return (
    <StyledButton onClick={clickHandler} gameState={gameState} name={name}>{children}</StyledButton>
  )
}
