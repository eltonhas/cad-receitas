import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const TableTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  color: #7E3F3F;
  margin-bottom: 10px;
`;
export const TableArea = styled.table`
  width: 100%;
  padding: 0 30px;
  border-collapse: collapse;
  text-align: center;
  vertical-align: bottom;
  font-size: 15px;
`;
export const TableLine = styled.tr`
  height: 40px;
  align-items: center;
  justify-content: center;
`;
export const TableColumn = styled.td`
  border-bottom: 2px solid #774000;

  a {
    color: #185467;
    padding-right: 20px;

    &:hover {
      color: #189090;
    }
  }
`;
export const ExcluirButton = styled.button`
  border: none;
  background: none;
  color: #881717;
  &:hover {
    color: #885050;
  }
`;
