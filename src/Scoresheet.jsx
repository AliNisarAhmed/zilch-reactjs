import React from 'react'
import styled from 'styled-components';

import ScoreTile from './ScoreTile';

const ScoreContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 50px 1fr 50px;
  border: 1px solid red;
  text-align: center;
`;

const StyledLabel1 = styled.p`
  display: inline-block;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  border-bottom: 1px solid blue;
`;

const StyledLabel2 = styled(StyledLabel1)`
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  border-left: 1px solid blue;
`;

const Scores = styled.div`
  grid-column: 1 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const TotalScore1 = styled.p`
  display: inline-block;
  grid-column: 1 / 2;
  border-top: 1px solid black;
`;

const TotalScore2 = styled(TotalScore1)`
  grid-column: 2 / 3;
  border-left: 1px solid black;
`;

export default function Scoresheet({ p1Banks, p2Banks }) {
  return (
    <ScoreContainer>
      <StyledLabel1>Player 1</StyledLabel1>
      <StyledLabel2>Player 2</StyledLabel2>
      <Scores>
        <div>
          <ScoreTile score={p1Banks}/>
        </div>
        <div>
          <ScoreTile score={p2Banks} />
        </div>
      </Scores>
      <TotalScore1>= {p1Banks.filter(x => typeof x === "number").reduce((a, x) => a + x, 0)}</TotalScore1>
      <TotalScore2>= {p2Banks.filter(x => typeof x === "number").reduce((a, x) => a + x, 0)}</TotalScore2>
    </ScoreContainer>
  )
}
