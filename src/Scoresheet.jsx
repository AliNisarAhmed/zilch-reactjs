import React from 'react'
import styled from 'styled-components';


const ScoreContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px 1fr;
  border: 1px solid red;
`;

const StyledLabel1 = styled.p`
  display: inline-block;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
`;

const StyledLabel2 = styled(StyledLabel1)`
  grid-row: 1 / 2;
  grid-column: 2 / 3;
`;

const Scores = styled.div`

`;

export default function Scoresheet() {
  return (
    <ScoreContainer>
      <StyledLabel1>Player 1</StyledLabel1>
      <StyledLabel2>Player 2</StyledLabel2>
      <Scores>
        <div>Player 1 scores here</div>
        <div>Player 2 scores here</div>
      </Scores>
    </ScoreContainer>
  )
}
