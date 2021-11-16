
import { useEffect, useState } from 'react';
import * as C from './styles';

import { Receita } from "../../types/receita";

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CardReceita from '../../components/CardReceita';

import { getReceitas } from "../../utils/dbReceitas";

export default function Home() {

  const [loading, setLoading] = useState(false);
  const [listRec, setListRec] = useState<Receita[]>([]);

  useEffect(() => {
    loadingReceitas();
  }, []);

  async function loadingReceitas() {
    setLoading(true);
    const receitas = await getReceitas();
    setListRec(receitas);
    setLoading(false);
  }

  return (
    <C.Container>
      <Header item='home'/>
      <C.Content>
        {
          loading ? <C.Info>Carregando informações...</C.Info> :
          (
            listRec.length === 0 ? <C.Info>Sem receitas cadastradas</C.Info> :
            listRec.map( (receita, index) => (
              <CardReceita
                id={receita.id}
                name={receita.name}
                unitV={receita.unitPrice} 
                Sprice={receita.salePrice} 
                Rend={receita.yield} 
                PorcWin={receita.gainPorc}
              />
            ))
          )

        }
      </C.Content>
      <C.FooterArea>
        <Footer/>
      </C.FooterArea>
    </C.Container>
  );
}