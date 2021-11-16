
import {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import { v4 as createId } from "uuid";
import { useParams, useHistory } from "react-router-dom";

import { getIngredientes } from "../../utils/dbIngredientes";
import { setReceita, getOneReceita, updateReceita } from "../../utils/dbReceitas";
import { verifiNumber } from "../../utils/funcEdit";
import { pagination } from '../../utils/funcPag';

import { Ingrediente } from "../../types/ingrediente";
import { Page } from '../../types/page';
import { Receita } from '../../types/receita';

import * as C from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CustonButton from '../../components/CustonButton';
import IngTabel from '../../components/IngTable';
import PaginacaoIng from '../../components/PaginacaoIng';

export default function Receitas() {

  const { id } = useParams<{id: undefined | string}>();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [loadingHandle, setLoadingHandle] = useState(false);
  const [nameRec, setNameRec] = useState("");
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

    if (id) {
      getReceitaToEdit(id);
    }
  }, [id]);

  async function loadingIngredientes() {
    setLoading(true);
    const ingredientes = await getIngredientes();
    setListIng(ingredientes);
    setLoading(false);
  }

  async function getReceitaToEdit(id: string) {
    setLoading(true);
    const returnQuery = await getOneReceita(id);

    if (typeof returnQuery === "object" && returnQuery !== null) {
      console.log(returnQuery);
      setNameRec(returnQuery.name);
      setAddCost(returnQuery.addCost.toString());
      setRendiment(returnQuery.yield.toString());
      setSallerPrice(returnQuery.salePrice.toString());
      setListIngRec(returnQuery.items);

      const pages = pagination(returnQuery.items);
      setListPagination(pages);
      setActivePage(pages[0]);

      setLoading(false);
    }
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

    if (listIngRec.length === 0 || addCost === "" || rendiment === "" || sellerPrice === "" || nameRec === "") {
      alert("Por favor preencha as informações e a tabela de ingredientes.");
      return;
    }

    const rendParse = parseInt(rendiment);
    const addCostParse = parseFloat(addCost);
    const sallerPriceParse = parseFloat(sellerPrice);

    let soma = 0;
    listIngRec.forEach(ing => (
      soma = soma + ing.price
    ));

    const allCost = (soma + addCostParse).toFixed(2);
    const unitPrice = (parseFloat(allCost)/rendParse).toFixed(2);
    const gainUnit = (sallerPriceParse - parseFloat(unitPrice)).toFixed(2);
    const gainPorc = ((parseFloat(gainUnit)/sallerPriceParse)*100).toFixed(2);
    const allGain = ((parseFloat(gainUnit)*rendParse)).toFixed(2);

    let data: Receita;

    if (id) {

      data = {
        id,
        items: listIngRec,
        name: nameRec,
        salePrice: sallerPriceParse,
        unitPrice: parseFloat(unitPrice),
        gainUnit: parseFloat(gainUnit),
        yield: rendParse,
        ingCost: soma,
        addCost: addCostParse,
        allCost: parseFloat(allCost),
        gainPorc: parseFloat(gainPorc),
        allGain: parseFloat(allGain)
      }

      const returnUpdate = await updateReceita(data);

      if (returnUpdate === 0) {
        alert("Receita editada com sucesso");
        history.push("/home");
      } else {
        alert("Aconteceu algum erro, tente mais tarde.");
      }

    } else {
      const idRecita = createId();
      data = {
        id: idRecita,
        items: listIngRec,
        name: nameRec,
        salePrice: sallerPriceParse,
        unitPrice: parseFloat(unitPrice),
        gainUnit: parseFloat(gainUnit),
        yield: rendParse,
        ingCost: soma,
        addCost: addCostParse,
        allCost: parseFloat(allCost),
        gainPorc: parseFloat(gainPorc),
        allGain: parseFloat(allGain)
      }

      const rettAdd = await setReceita(data);

      if (rettAdd === 0) {
        setNameRec('');
        setAddCost('');
        setRendiment('');
        setSallerPrice('');
        setListIngRec([]);
        setListPagination([]);
        setActivePage({
          content: [],
          first: true,
          last: true,
          numberPage: 1,
          totalPages: 1,
          empty: true
        });
      }
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

  function handleName(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.value;
    setNameRec(name);
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
            <C.Title>Nome da receita</C.Title>
            <C.Input type="text" value={nameRec} onChange={handleName} placeholder='Nome da receita'/>
            <C.Title>Custos Adicionais</C.Title>
            <C.Input type="text" value={addCost} onChange={handleAddCost} placeholder='Outros gastos'/>
            <C.Title>Rendimento</C.Title>
            <C.Input type="text" value={rendiment} onChange={handleRendi} placeholder="Quantos itens são produzidos"/>
            <C.Title>Valor de venda</C.Title>
            <C.Input type="text" value={sellerPrice} onChange={handleSallerPrice} placeholder="Por quanto será vendido"/>
            <CustonButton label={id ? 'Editar Receita' : 'Adicionar Receita'}/>
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