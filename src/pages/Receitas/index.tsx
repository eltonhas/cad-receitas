
import {useState, useEffect, ChangeEvent, FormEvent} from 'react';

import { getIngredientes } from "../../utils/dbIngredientes";
import { verifiNumber } from "../../utils/funcEdit";
import { pagination } from '../../utils/funcPag';

import { Ingrediente } from "../../types/ingrediente";
import { Page } from '../../types/page';

import * as C from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CustonButton from '../../components/CustonButton';
import IngTabel from '../../components/IngTable';
import PaginacaoIng from '../../components/PaginacaoIng';

export default function Receitas() {

  const [loading, setLoading] = useState(false);
  const [loadingHandle, setLoadingHandle] = useState(false);
  const [qtdIng, setQtdIng] = useState("");
  const [ing, setIng] = useState("");
  const [addCost, setAddCost] = useState("");
  const [rendiment, setRendiment] = useState("");
  const [sellerPrice, setSallerPrice] = useState("");
  const [listIng, setListIng] = useState<Ingrediente[]>([]);
  const [listIngRec, setListIngRec] = useState<Ingrediente[]>([]);
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
    loadingIngredientes();
  }, []);

  async function loadingIngredientes() {
    setLoading(true);
    const ingredientes = await getIngredientes();
    setListIng(ingredientes);
    setLoading(false);
  }

  function handleQtd(e: ChangeEvent<HTMLInputElement>) {
    let number = e.target.value;
    let returnFunc = verifiNumber(number[number.length-1]);

    if (returnFunc === "") {
      number = number.slice(0, -1);
      setQtdIng(number);
      return;
    }
    
    number = e.target.value.replace(',', '.');
    let count = number.split('.').length-1;
    if (count > 1) {
      number = number.slice(0, -1);
    }
    setQtdIng(number);
  }

  function handleAddCost(e: ChangeEvent<HTMLInputElement>) {
    let number = e.target.value;
    let returnFunc = verifiNumber(number[number.length-1]);

    if (returnFunc === "") {
      number = number.slice(0, -1);
      setAddCost(number);
      return;
    }
    
    number = e.target.value.replace(',', '.');
    let count = number.split('.').length-1;
    if (count > 1) {
      number = number.slice(0, -1);
    }
    setAddCost(number);
  }

  function handleRendi(e: ChangeEvent<HTMLInputElement>) {
    let number = e.target.value;
    let returnFunc = verifiNumber(number[number.length-1]);

    if (returnFunc === "") {
      number = number.slice(0, -1);
      setRendiment(number);
      return;
    }
    
    number = e.target.value.replace(',', '.');
    let count = number.split('.').length-1;
    if (count > 1) {
      number = number.slice(0, -1);
    }
    setRendiment(number);

    if (addCost !== "" && listIngRec.length !== 0) {
      let soma = 0;
      listIngRec.forEach(ing => (
        soma = soma + ing.price
      ));

      soma = soma*3;
      soma = soma + parseFloat(addCost);

      let price = (soma/parseInt(number)).toFixed(2);

      setSallerPrice(price);
    }
  }

  function handleSallerPrice(e: ChangeEvent<HTMLInputElement>) {
    let number = e.target.value;
    let returnFunc = verifiNumber(number[number.length-1]);

    if (returnFunc === "") {
      number = number.slice(0, -1);
      setSallerPrice(number);
      return;
    }
    
    number = e.target.value.replace(',', '.');
    let count = number.split('.').length-1;
    if (count > 1) {
      number = number.slice(0, -1);
    }
    setSallerPrice(number);
  }

  function handleIng(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (qtdIng === "" || ing === "") {
      alert('Por favor preencha todos os campos.');
      setLoadingHandle(false);
      return;
    }

    const detailsIng = listIng[parseInt(ing)];
    const propPrice = (parseFloat(qtdIng)/detailsIng.qtd)*detailsIng.price;

    const data: Ingrediente = {
      id: detailsIng.id,
      name: detailsIng.name,
      qtd: parseFloat(qtdIng),
      unit: detailsIng.unit,
      price: parseFloat(propPrice.toFixed(2))
    }

    let dataList = listIngRec;
    dataList = [...listIngRec, data];

    setListIngRec(dataList);

    const pages = pagination(dataList);
    setListPagination(pages);
    setActivePage(pages[0]);

    setLoadingHandle(false);
    setIng('');
    setQtdIng('');
  }

  async function handleReceita(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (listIngRec.length === 0 || addCost === "" || rendiment === "" || sellerPrice === "") {
      alert("Por favor preencha as informações e a tabela de ingredientes.");
      return;
    }
  }

  function handleDelete(id: string) {
    setLoadingHandle(true);
    const filtro = listIngRec.filter(ing => id !== ing.id);
    setListIngRec(filtro);

    const pages = pagination(filtro);
    setListPagination(pages);
    setActivePage(pages[0]);
    setLoadingHandle(false);
  }

  function changePageUp(page: number) {
    let index = page - 1;
    setActivePage(listPagination[index+1]);
  }
  function changePageDown(page: number) {
    let index = page - 1;
    setActivePage(listPagination[index-1]);
  }

  return (
    <C.Container>
      <Header item='receita'/>
      <C.Content>
        <C.IngForm onSubmit={handleIng}>
          <C.TitleArea>Ingredientes</C.TitleArea>
          <C.ContentArea>
            <C.Title>Escolha um ingrediente</C.Title>
            { 
              loading ? <input disabled value="Carregando lista de ingredientes ..."/> :
              (
                listIng.length === 0 ? <input disabled value="Não existe produtos cadastrados"/> :
                  <C.SelectIng value={ing} onChange={ e => setIng(e.target.value)}>
                    <option value=""></option>
                    {
                      listIng.map((ing, index) => (
                        <option key={ing.id} value={index}>{ing.name}</option>
                      ))
                    }
                  </C.SelectIng>
              )
            }
            <C.Title>Quantidade</C.Title>
            <C.Input type='text' value={qtdIng} onChange={handleQtd} placeholder='quantidade do ingrediente'/>
            <CustonButton label='Adicionar'/>
          </C.ContentArea>
        </C.IngForm>
        <C.InfoForm onSubmit={handleReceita}>
          <C.TitleArea>Outras informações</C.TitleArea>
          <C.ContentArea>
            <C.Title>Custos Adicionais</C.Title>
            <C.Input type="text" value={addCost} onChange={handleAddCost} placeholder='Outros gastos'/>
            <C.Title>Rendimento</C.Title>
            <C.Input type="text" value={rendiment} onChange={handleRendi} placeholder="Quantos itens são produzidos"/>
            <C.Title>Valor de venda</C.Title>
            <C.Input type="text" value={sellerPrice} onChange={handleSallerPrice} placeholder="Por quanto será vendido"/>
            <CustonButton label='Adicionar Receita'/>
          </C.ContentArea>
        </C.InfoForm>
        <C.TableArea>
          <IngTabel page={activePage} load={loadingHandle} deleteFunc={handleDelete} origin='rec'/>
          <PaginacaoIng listPag={activePage} changeUp={changePageUp} changeDown={changePageDown}/>
        </C.TableArea>
      </C.Content>
      <C.FooterArea>
        <Footer/>
      </C.FooterArea>
    </C.Container>
  );
}