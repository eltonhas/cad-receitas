
import {useState, useEffect, ChangeEvent} from 'react';

import { getIngredientes } from "../../utils/dbIngredientes";
import { verifiNumber } from "../../utils/funcEdit";

import { Ingrediente } from "../../types/ingrediente";
import { IngredienteDetails } from "../../types/ingredienteDetails";

import * as C from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Receitas() {

  const [loading, setLoading] = useState(false);
  const [qtdIng, setQtdIng] = useState("");
  const [ing, setIng] = useState("");
  const [listIng, setListIng] = useState<Ingrediente[]>([]);

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

  return (
    <C.Container>
      <Header item='receita'/>
      <C.Content>
        <C.IngForm>
          <C.TitleArea>Ingredientes</C.TitleArea>
          <C.ContentArea>
            <C.Title>Escolha um ingrediente</C.Title>
            { 
              loading ? <input disabled value="Carregando lista de ingredientes ..."/> :
              <C.SelectIng value={ing} onChange={ e => setIng(e.target.value)}>
                <option value=""></option>
                {
                  listIng.map((ing, index) => (
                    <option key={ing.id} value={index}>{ing.name}</option>
                  ))
                }
              </C.SelectIng>
            }
            <C.Title>Quantidade</C.Title>
            <C.InputQtd type='text' value={qtdIng} onChange={handleQtd}/>
            <C.ButtonIng>Adicionar</C.ButtonIng>
          </C.ContentArea>
        </C.IngForm>
        <C.InfoForm>Outras Informações</C.InfoForm>
        <C.TableArea>Area tabela</C.TableArea>
      </C.Content>
      <C.FooterArea>
        <Footer/>
      </C.FooterArea>
    </C.Container>
  );
}