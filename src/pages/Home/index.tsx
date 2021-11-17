
import { useEffect, useState } from 'react';
import * as C from './styles';

import { Receita } from "../../types/receita";

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CardReceita from '../../components/CardReceita';
import Modal from '../../components/Modal';

import { getReceitas, deleteReceita } from "../../utils/dbReceitas";

export default function Home() {

  const [loading, setLoading] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [listRec, setListRec] = useState<Receita[]>([]);
  const [detailsRec, setDetailsRec] = useState<Receita>({
    id: "",
    items: [],
    name: "",
    salePrice: 0,
    unitPrice: 0,
    gainUnit: 0,
    yield: 0,
    ingCost: 0,
    addCost: 0,
    allCost: 0,
    gainPorc: 0,
    allGain: 0
  });

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

  function togglePostModal(id?: string ) {
    if (id) {
      const filter = listRec.filter(rec => id === rec.id);
      setDetailsRec(filter[0]);
    }
    setShowPostModal(!showPostModal);
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
                key={index}
                id={receita.id}
                name={receita.name}
                unitV={receita.unitPrice} 
                Sprice={receita.salePrice} 
                Rend={receita.yield} 
                PorcWin={receita.gainPorc}
                deleteFunc={handleDelete}
                openModal={togglePostModal}
              />
            ))
          )
        }
        {
          showPostModal &&
          <Modal
            detail={detailsRec}
            closeModal={togglePostModal}
          />
        }
      </C.Content>
      <C.FooterArea>
        <Footer/>
      </C.FooterArea>
    </C.Container>
  );
}