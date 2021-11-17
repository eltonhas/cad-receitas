import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0,0,0, 0.5);
  z-index: 99;
`;

export const Container = styled.div`
  position: fixed;
  max-width: 900px;
  max-height: 550px;
  top: 15%;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 4em 2rem;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0,0,0, 1);
`;

export const Close = styled.button`
  background-color: #F65835;
  border: 0;
  color: #fff;
  position: absolute;
  top: 15px;
  left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 15px;
  border-radius: 5px;

  svg {
    margin-right: 5px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
`;

export const TitleIng = styled.div`
  width: 100%;
  border-bottom: 3px solid #774000;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;

  h3 {
    position: relative;
    top: 20px;
    background: #FFF;
    padding: 0 20px;
    font-size: 30px;
    font-weight: bold;
    font-style: italic;
    color: #7E3F3F;
  }  
`;

export const ContentLeft = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px;
`;
export const ContentRight = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

export const TitleText = styled.div`
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  color: #7E3F3F;
  margin-bottom: 10px;
`;

export const InfoText = styled.span`
  width: 50%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
  border-bottom: 2px solid #774000;
`;