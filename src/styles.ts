import styled from "styled-components";

export const ScoresContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Score = styled.div`
  color: #abb78a;
  font-size: 40px;
  font-weight: bolder;
  margin: 10px 0;
`;

export const HighScore = styled.div`
  font-size: 40px;
  font-weight: bolder;
  margin: 10px 0;
  color: #d8ddca;
`;

export const GameBorderOuter = styled.div`
  border: #595f43 solid 10px;
  border-radius: 30px;
  box-shadow: inset 0 0 0 10px #595f43;
`;

export const GameBorderMiddle = styled.div`
  border: #abb78a solid 8px;
  border-radius: 26px;
  box-shadow: inset 0 0 0 10px #abb78a;
`;

export const GameBorderInner = styled.div`
  background-color: #c4cfa3;
  border: #8b966c solid 30px;
  border-radius: 20px;
  box-shadow: inset 0 0 0 5px #8b966c;
`;

export const InstructionText = styled.h1`
  position: absolute;
  top: 60%;
  color: #333;
  width: 300px;
  text-align: center;
  text-transform: capitalize;
  padding: 30px;
  margin: 0;
`;

export const Logo = styled.img`
  background-color: #c4cfa3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -52%);
`;
