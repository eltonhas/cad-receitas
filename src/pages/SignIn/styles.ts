import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #770B00;
`;
export const Content = styled.div`
  width: 500px;
  height: 300px;
  background-color: #EFEFEF;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Image = styled.img`
  width: 70px;
  height: 70px;
  margin-left: -80%;
`;
export const Area = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -25px;
`;
export const Text = styled.div`
  font-size: 20px;
  font-weight: 200;
  color: #000;
  padding-bottom: 5px;
`;
export const Input = styled.input`
  width: 90%;
  font-size: 20px;
  padding: 5px 5px 5px 10px;
  margin-bottom: 5px;
  border-radius: 15px;
`;
export const Button = styled.button`
  margin-top: 10px;
  width: 50%;
  height: 30px;
  border-radius: 15px;
  background-color: #881717;
  color: #FFF;
  font-size: 15px;
  font-weight: bold;
`;