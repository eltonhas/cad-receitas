import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100px;
  border-bottom: 5px solid #774000;;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  padding: 0 20px 0 0px;
`;
export const Image = styled.img`
  width: 100px;
  height: 100px;
`;
export const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: #770B00;
`;
export const ContLink = styled.div`
  align-items: center;
  a {
    font-size: 20px;
    padding-left: 50px;
    color: #770B00;
  }
`;
export const ButtonLogout = styled.button`
  border: none;
  color: #770B00;
`;