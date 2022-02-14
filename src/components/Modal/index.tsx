
import { useState, useEffect } from 'react';
import { FiX } from "react-icons/fi";

import * as C from './styles';
import IngTabel from '../IngTable';
import PaginacaoIng from '../PaginacaoIng';

import { pagination } from "../../utils/funcPag";

import { Receita } from '../../types/receita';
import { Page } from "../../types/page";

type Props = {
  closeModal: ()=> void,
  detail: Receita,
}

export default function Modal({closeModal, detail}: Props) {

  const [loadingHandle, setloadingHandle] = useState(false);
  const [listPagination, setListPagination] = useState<Page[]>([]);
  const [activePage, setActivePage] = useState<Page>({
                                                      content: [],
                                                      first: true,
                                                      last: true,
                                                      numberPage: 1,
                                                      totalPages: 1,
                                                      empty: true
                                                    });

  useEffect(() => {
    loadInfos();
  }, []);

  function loadInfos() {
    setloadingHandle(true);
    const pages = pagination(detail.items);
    setListPagination(pages);
    setActivePage(pages[0]);
    setloadingHandle(false);
  }

  function changePageUp(page: number) {
    let index = page - 1;
    setActivePage(listPagination[index+1]);
    console.log(index);
  }

  function changePageDown(page: number) {
    let index = page - 1;
    setActivePage(listPagination[index-1]);
    console.log(index);
  }

  function delOff(){}

  return (
    <C.Modal>
      <C.Container>
        <C.Close onClick={closeModal}><FiX size={23}/>Voltar</C.Close>
        <C.TitleIng>
          <h3>{detail.name}</h3>
        </C.TitleIng>
        <C.Content>
          <C.ContentLeft>
            <IngTabel origin="modal" page={activePage} load={loadingHandle} deleteFunc={delOff}/>
            <PaginacaoIng listPag={activePage} changeUp={changePageUp} changeDown={changePageDown}/>
          </C.ContentLeft>
          <C.ContentRight>
            <C.TitleText>INFORMAÇÕES</C.TitleText>
            <C.InfoText>Valor de venda: R$ {detail.salePrice}</C.InfoText>
            <C.InfoText>Custo Unitário: R$ {detail.unitPrice}</C.InfoText>
            <C.InfoText>Lucro Unitário: R$ {detail.gainUnit}</C.InfoText>
            <C.InfoText>Rendimento: {detail.yield} unid</C.InfoText>
            <C.InfoText>Custo total: R$ {detail.allCost}</C.InfoText>
            <C.InfoText>Custo Ingr: R$ {detail.ingCost.toFixed(2)}</C.InfoText>
            <C.InfoText>Custos add: R$ {detail.addCost}</C.InfoText>
            <C.InfoText>Porcent. lucro: {detail.gainPorc}%</C.InfoText>
            <C.InfoText>Lucro receita: R$ {detail.allGain}</C.InfoText>
          </C.ContentRight>
        </C.Content>
      </C.Container>
    </C.Modal>
  )
}