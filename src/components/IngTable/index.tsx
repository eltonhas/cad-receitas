
import { Link } from 'react-router-dom';
import {MdDelete, MdEditNote} from 'react-icons/md';

import * as C from './styles';

import { Page } from '../../types/page';


type Props = {
  lista: Page | undefined,
  load: boolean,
  deleteFunc: (id: string) => {}
}

export default function IngTabel({lista, load, deleteFunc}: Props) {
  
  if (load) {
    return (
      <div>Carregando...</div>
    );
  }

  if (lista?.empty) {
    return(
      <C.Container>
        <h1>Nenhum ingrediente cadastrado.</h1>
      </C.Container>
    )
  }
  return(
    <C.Container>
      <C.TableTitle>INGREDIENTES</C.TableTitle>
      <C.TableArea>
        <tbody>
        {
          lista?.content.map((ing, index) => (
            <C.TableLine key={index}>
              <C.TableColumn>{ing.name}</C.TableColumn>
              <C.TableColumn>{ing.qtdEmb}</C.TableColumn>
              <C.TableColumn>{ing.unit}</C.TableColumn>
              <C.TableColumn>R$ {ing.price}</C.TableColumn>
              <C.TableColumn>
                <Link to={`/ingredientes/${ing.id}`}>
                  <MdEditNote size={30}/>
                </Link>
                <C.ExcluirButton onClick={()=> deleteFunc(ing.id)}>
                  <MdDelete size={30}/>
                </C.ExcluirButton>
              </C.TableColumn>
            </C.TableLine>
          ))
        }
        </tbody>
        </C.TableArea>
    </C.Container>
  );
}