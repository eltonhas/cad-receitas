import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const FooterArea = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`;
export const Content = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const FormCad = styled.form`
  width: 40%;
  margin: 15px;
`;
export const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
`;
export const InputForm = styled.input`
  font-size: 20px;
  padding: 10px 5px;
  width: 90%;
  border: 0;
  border-radius: 5px;
`;
export const SelectArea = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: row;
`;
export const SelectForm = styled.select`
  margin-left: 10px;
`;
export const InputButton = styled.button`
  margin-top: 20px;
  height: 50px;
  width: 90%;
  border-radius: 50px;
  background: #770B00;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  
  &:hover {
    background: #881717;
  }
`;
export const TableArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 20px 10px 5px 10px;
`;