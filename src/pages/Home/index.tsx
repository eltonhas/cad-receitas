
import { useEffect, useState } from 'react';
import * as C from './styles';

import { Receita } from "../../types/receita";

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CardReceita from '../../components/CardReceita';

import { getReceitas, deleteReceita } from "../../utils/dbReceitas";

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

  async function handleDelete(id: string) {
    const returnQuery = await deleteReceita(id);

    if (returnQuery === 0) {
      let data = listRec;

      const filter = data.filter(rec => id !== rec.id);
      setListRec(filter);
    } else {
      alert("Alguma coisa deu errado, tente mais tarde.");
    }
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
                deleteFunc={handleDelete}
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