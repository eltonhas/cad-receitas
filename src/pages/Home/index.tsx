
import * as C from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <C.Container>
      <Header item='home'/>
      <h1>HOME</h1>
      <C.FooterArea>
        <Footer/>
      </C.FooterArea>
    </C.Container>
  );
}