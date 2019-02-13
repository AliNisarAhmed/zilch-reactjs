import React from 'react'
import styled, { css } from 'styled-components';
import { callToAction } from './animations'

const animateButton = css`
  animation: ${callToAction} 1s infinite both;
`;

const StyledButton = styled.button`
  width: 200px;
  color: blue;
  background-color: whitesmoke;
  border: 1px solid blue;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  margin-top: 5px;

  :hover {
    color: whitesmoke;
    background-color: blue;
  }

  ::before {
    ${props => 
        props.gameState === "ROLL_REQUIRED" ?
        animateButton :
        null
    }
  }

`;

export default function Button({ children, clickHandler, gameState}) {
  return (
    <StyledButton onClick={clickHandler} disabled={gameState !== "ROLL_REQUIRED"}>{children}</StyledButton>
  )
}
