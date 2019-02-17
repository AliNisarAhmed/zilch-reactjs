import React from 'react'
import styled, { css } from 'styled-components';
import { callToAction } from '../constants/animations'

const animateButton = css`
  animation: ${callToAction} 1s infinite backwards;
`;

const hideButton = css`
  display: none;
`;

function generateColorBasedOnProps (props) {
  if (props.name === "roll") return "green";
  if (props.name === "restart") return "red";
  if (props.name === "bank") return "blue";
}

const StyledButton = styled.button`
  display: inline-block;  
  min-width: 100px;
  height: 50px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  margin-top: 5px;
  position: relative;

  /* ${props => 
        props.name === "restart" && props.gameState !== "RESTART_REQD" ?
        hideButton :
        null
  } */

  color: ${props => generateColorBasedOnProps(props)};
  border: 1px solid ${props => generateColorBasedOnProps(props)};

  :hover {
    color: whitesmoke;
    background-color: ${props => generateColorBasedOnProps(props)};
  }

  ::after {
    content: "";
    z-index: -1;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${props => generateColorBasedOnProps(props)};
    border-radius: 8px;
    ${props => 
        (props.gameState === "INIT" || props.gameState === "FREE_ROLL") && props.name === "roll" ?
        animateButton :
        null
    }
    ${props => 
        props.gameState === "RESTART_REQD" && props.name === "restart" ?
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
