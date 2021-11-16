
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { v4 as createId } from "uuid";

import * as C from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import IngTabel from '../../components/IngTable';
import PaginacaoIng from '../../components/PaginacaoIng';
import CustonButton from '../../components/CustonButton';

import { Ingrediente } from '../../types/ingrediente';

import { setIngrediente, getIngredientes, 
        deleteIngrediente, getOneIngrediente,
        updateIngrediente
      } from "../../utils/dbIngredientes";

import { capitalize, verifiNumber } from "../../utils/funcEdit";
import { pagination } from "../../utils/funcPag";
import { Page } from '../../types/page';

export default function Ingredientes() {

  const { id } = useParams<{id: undefined | string}>();
  const history = useHistory();

  const [name, setName] = useState('');
  const [qtdEmb, setQtdEmb] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('g');
  const [ingList, setIngList] = useState<Ingrediente[]>([]);
  const [listPagination, setlistPagination] = useState<Page[]>([]);
  const [activePage, setActivePage] = useState<Page>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    loadingIngredientes();

    if (id) {
      getIngredienteToEdit(id);
    }

  }, [id]);

  async function loadingIngredientes() {
    setLoading(true);
    const ingredientes = await getIngredientes();
    setIngList(ingredientes);
    const pages = pagination(ingredientes);
    setlistPagination(pages);
    setActivePage(pages[0]);
    setLoading(false);
  }
  function handleQtdEmb(e: ChangeEvent<HTMLInputElement>) {
    let number = e.target.value;
    let returnFunc = verifiNumber(number[number.length-1]);

    if (returnFunc === "") {
      number = number.slice(0, -1);
      setQtdEmb(number);
      return;
    }

    number = number.replace(',', '.');
    // Verificação da quantidade de pontos
    let count = number.split('.').length-1;
    if (count > 1) {
      // Remove o ultimo elemento da string
      number = number.slice(0, -1);
    }
    setQtdEmb(number);
  }
  function handlePrice(e: ChangeEvent<HTMLInputElement>) {
    let number = e.target.value;
    let returnFunc = verifiNumber(number[number.length-1]);

    if (returnFunc === "") {
      number = number.slice(0, -1);
      setPrice(number);
      return;
    }

    number = e.target.value.replace(',', '.');
    let count = number.split('.').length-1;
    if (count > 1) {
      number = number.slice(0, -1);
    }
    setPrice(number);
  }
  async function handleIng(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name === "" || qtdEmb === ""  || price === "") {
      alert("Existem campus sem preencher, por favor preencha todos.");
      return;
    }

    const nameCap = capitalize(name);
    let datas = ingList;
    let data: Ingrediente

    if (id) {
      
      data = {
        id,
        name,
        qtd: parseFloat(qtdEmb),
        price: parseFloat(price),
        unit
      }

      const returnUpdate = await updateIngrediente(data);

      if (returnUpdate === 0) {
        alert("Produto editado com sucesso");
        history.push("/ingredientes");
      } else {
        alert("Aconteceu algum erro, tente mais tarde.");
      }

    } else {

      const filtro = datas.filter(ing => ing.name === nameCap);

      if (filtro.length !== 0) {
        alert("Já existe um produto cadastrado com esse nome");
        return;
      }

      const idIng = createId();
      data = {
        id: idIng,
        name: nameCap,
        qtd: parseFloat(qtdEmb),
        price: parseFloat(price),
        unit
      }
      
      let retAdd = await setIngrediente(data);

      if (retAdd === 0) {
        const dataList = [...ingList, data];
        const pages = pagination(dataList);
        setlistPagination(pages);
        setActivePage(pages[0]);
        setIngList(dataList);
      }

      setName('');
      setQtdEmb('');
      setPrice('');
      setUnit('g');
    }
  }
  async function handleDelete(id: string){
    let datas = ingList;
    const deleteIten = await deleteIngrediente(id);

    if (deleteIten === 0) {
      const filtro = datas.filter(ing => ing.id !== id);
      const pages = pagination(filtro);
      setlistPagination(pages);
      setActivePage(pages[0]);
      setIngList(filtro);
    } else {
      alert("Alguma coisa deu errado, tente mais tarde");
    }
  }
  async function getIngredienteToEdit(id: string) {
    const returnQuery = await getOneIngrediente(id);

    if (typeof returnQuery === "object" && returnQuery !== null) {
      setName(returnQuery.name);
      setQtdEmb(returnQuery.qtd.toString());
      setPrice(returnQuery.price.toString());
      setUnit(returnQuery.unit);
    }
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
      <Header item='ingrediente'/>
      <C.Content>
        <C.FormCad onSubmit={handleIng}>
          <C.Title>Nome</C.Title>
          <C.InputForm type="text" value={name} onChange={e => setName(e.target.value)} placeholder='nome do ingrediente'/>
          <C.Title>Quantidade</C.Title>
          <C.InputForm type="text" value={qtdEmb} onChange={handleQtdEmb} placeholder='quantidade'/>
          <C.Title>Preço</C.Title>
          <C.InputForm type="text" value={price} onChange={handlePrice} placeholder='preço'/>
          <C.SelectArea>
            <C.Title>Unidade</C.Title>
            <C.SelectForm value={unit} onChange={e => setUnit(e.target.value)}>
              <option value="g">gramas</option>
              <option value="ml">mililitros</option>
              <option value="unid">unidades</option>
            </C.SelectForm>
          </C.SelectArea>
          <CustonButton label={id ? "EDITAR" : "CADASTRAR"}/>
        </C.FormCad>
        <C.TableArea>
          <IngTabel page={activePage} load={loading} deleteFunc={handleDelete} origin='ing'/>
          <PaginacaoIng listPag={activePage} changeUp={changePageUp} changeDown={changePageDown}/>
        </C.TableArea>
      </C.Content>
      <C.FooterArea>
        <Footer/>
      </C.FooterArea>
    </C.Container>
  );
}