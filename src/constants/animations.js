import { keyframes } from 'styled-components';

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  12% {
    transform: rotate(180deg);
    filter: blur(3px);
  }
  25% {
    transform: rotate(0deg);
  }
  37% {
    transform: rotate(-180deg);
    filter: blur(3px);
  }
  50% {
    transform: rotate(0deg);
  }
  62% {
    transform: rotate(180deg);
    filter: blur(3px);
  }
  75% {
    transform: rotate(0deg);
  }
  87% {
    transform: rotate(-180deg);
    filter: blur(3px);
  }
  100% {
    transform: rotate(0deg);
  }
`;


export const callToAction = keyframes`
  from {
    opacity: 0.8;
  }
  to {
    opacity: 0;
    transform: scaleX(1.5) scaleY(2);
  }
`;

export const zoomingText = keyframes`
  from {
    font-size: 56px;
    z-index: 10;
  }
  to {
    font-size: 24px;
    z-index: 0;
  }
`;