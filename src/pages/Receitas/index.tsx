
import * as C from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Receitas() {
  return (
    <C.Container>
      <Header item='receita'/>
      <h1>RECEITAS</h1>
      <C.FooterArea>
        <Footer/>
      </C.FooterArea>
    </C.Container>
  );
}