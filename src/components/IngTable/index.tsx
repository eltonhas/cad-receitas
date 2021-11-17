
import { Link } from 'react-router-dom';
import {MdDelete, MdEditNote} from 'react-icons/md';

import * as C from './styles';

import { Page } from '../../types/page';


type Props = {
  page: Page | undefined,
  load: boolean,
  deleteFunc: Function,
  origin: string,
}

export default function IngTabel({page, load, deleteFunc, origin}: Props) {
  
  if (load) {
    return (
      <div>Carregando...</div>
    );
  }

  if (page?.empty) {
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
          origin === 'ing' ?
            page?.content.map((ing, index) => (
              <C.TableLine key={index}>
                <C.TableColumn>{ing.name}</C.TableColumn>
                <C.TableColumn>{ing.qtd}</C.TableColumn>
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
          : (
              origin === 'ing' ? 
                page?.content.map((ing, index) => (
                  <C.TableLine key={index}>
                    <C.TableColumn>{ing.name}</C.TableColumn>
                    <C.TableColumn>{ing.qtd}</C.TableColumn>
                    <C.TableColumn>{ing.unit}</C.TableColumn>
                    <C.TableColumn>R$ {ing.price}</C.TableColumn>
                    <C.TableColumn>
                      <C.ExcluirButton onClick={()=> deleteFunc(ing.id)}>
                        <MdDelete size={30}/>
                      </C.ExcluirButton>
                    </C.TableColumn>
                  </C.TableLine>
                ))
              :    
                page?.content.map((ing, index) => (
                  <C.TableLine key={index}>
                    <C.TableColumn>{ing.name}</C.TableColumn>
                    <C.TableColumn>{ing.qtd}</C.TableColumn>
                    <C.TableColumn>{ing.unit}</C.TableColumn>
                    <C.TableColumn>R$ {ing.price}</C.TableColumn>
                  </C.TableLine>
                ))
            )
        }
        </tbody>
        </C.TableArea>
    </C.Container>
  );
}