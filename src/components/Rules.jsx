import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const StyledRules = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  z-index: 10;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-column-gap: 10px;

  & h3 {
    margin: 0 0 10px 0;
  }

  & b {
    font-size: 18px;
  }
`;

const StyledRulesColumn = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`;    

const StyledList = styled.ol`
  text-align: left;
  margin: 0;
`;

export default function Rules(props) {
  function clickHandler () {
    props.toggleModal(!props.showModal);
  }
  
  console.log(props);

  return (
    props.showModal ?
    <Modal toggleModal={props.toggleModal}>
      <StyledRules onClick={clickHandler}>
        <StyledRulesColumn>
          <h3>How to: </h3>
          <StyledList>
            <li><b>Roll</b> the dice</li>
            <li>Set aside Scoring Die or Dice (See Scoring) by clicking on them to move them to the right</li>
            <li>Click <b>Roll</b> to lock the scoring die selected in (2) and roll the remaining</li>
            <li>You can <b>Bank</b> your accumulated points once your total score <b>>= 300</b></li>
            <li>If you use up all the dice for scoring, you earn a <b>FREE ROLL</b></li>
            <li>if you roll a no scoring combination, you <b>ZILCH</b>, that is, you lose all your score AND your turn is over</li>
            <li>You cannot <b>ZILCH</b> when 6 dice are left (hence no <b>ZILCH</b> on first roll OR any Free Rolls)</li>
          </StyledList>
        </StyledRulesColumn>
        <StyledRulesColumn>
          <h3>Scoring</h3>
          <StyledList>
            <li>each <b>5</b> = 50 points</li>
            <li>each <b>1</b> = 100 points</li>
            <li><b>n</b> of a kind (n >= 3) = <b>Die Value x (n - 2) x 100 </b> (for <b>1</b>'s multiply by 1000)</li>
            <ul>
              <li>So Three <b>3</b>'s = 300 points</li>
              <li>Five <b>4</b>'s = 1200 points</li>
              <li>Six <b>6</b>'s = 2400 points</li>
              <li>Four <b>1</b>'s = 2000 points</li>
            </ul>
            <li><b>Straight</b> (1-2-3-4-5-6) = 1500 points + <b>FREE ROLL</b></li>
            <li><b>Three pairs</b> (any) = 750 points + <b>FREE ROLL</b></li>
            <li><b>NO SCOIRNG DIE</b> AND Dice === 6 = 500 points + <b>FREE ROLL</b></li>
            <li><b>NO SCOIRNG DIE</b> AND Dice &lt; 6 = <b>ZILCH</b> + all points lost</li>
            <li>First to <b>10,000 Points</b> Wins!</li>
          </StyledList>
        </StyledRulesColumn>
      </StyledRules>
    </Modal> :
      <span className={props.className} onClick={clickHandler}>
        {props.children}
      </span>
  )
}
