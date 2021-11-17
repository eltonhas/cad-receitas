import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background: #F8F8F8;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 110px;
  margin-bottom: 80px;
  display: flex;
  align-items: start;
  flex-direction: row;
`;
export const IngForm = styled.form`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
export const TitleArea = styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  color: #7E3F3F;
  margin-bottom: 10px;
`;
export const ContentArea = styled.div`
  padding-top: 20px;
`;
export const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;
export const SelectIng = styled.select`
  width: 90%;
  height: 30px;
  margin-bottom: 10px;
`;
export const Input = styled.input`
  font-size: 20px;
  padding: 10px 5px;
  width: 90%;
  border: 0;
  border-radius: 5px;
  margin-bottom: 2px;
`;
export const InfoForm = styled.form`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
export const TableArea = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const FooterArea = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`;