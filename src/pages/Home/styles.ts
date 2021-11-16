import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  margin-top: 100px;
  padding: 20px;
  width: 100%;
  height: 490px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: auto;
`;

export const Info = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const FooterArea = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`;