import styled from "styled-components";

export const Container = styled.div`
  width: 300px;
  height: 180px;
  border: 5px solid #774000;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;
export const TitleCard = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #7E3F3F;
  margin: 5px;
`;
export const ContentCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-top: 10px;
  margin-bottom: 5px;
`;
export const CardLeft = styled.div`
  padding-left: 15px;
`;
export const TitleInfo = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;
export const Info = styled.div`
  margin-bottom: 5px;
`;
export const CardRight = styled.div`
  display: flex;
  flex-direction: column;
  text-align: flex-end;
  padding-right: 15px;
`;
export const LinkArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
export const OpenLink = styled.button`
  border: none;
  background: none;
  color: #774000;
  margin-right: 20px;

  &:hover {
    color: #B96502;
  }
`;
export const EditLink = styled.div`
  margin-right: 20px;
  a {
    color: #185467;

    &:hover {
      color: #189090;
    }
  }
`;
export const ExcluirLink = styled.button`
  border: none;
  background: none;
  color: #881717;

  &:hover {
    color: #885050;
  }
`;