
import { Link } from 'react-router-dom';
import { MdDelete, MdEditNote, MdOpenInBrowser } from 'react-icons/md';

import * as C from './styles';

type Props = {
  id: string,
  name: string,
  unitV: number,
  Sprice: number,
  Rend: number,
  PorcWin: number,
  deleteFunc: Function
}

export default function CardReceita({id, name, unitV, Sprice, Rend, PorcWin, deleteFunc} : Props) {
  return(
    <C.Container>
      <C.TitleCard>{name}</C.TitleCard>
      <C.ContentCard>
        <C.CardLeft>
          <C.TitleInfo>Valor unitário</C.TitleInfo>
          <C.Info>R$ {unitV}</C.Info>
          <C.TitleInfo>Preço de venda</C.TitleInfo>
          <C.Info>R$ {Sprice}</C.Info>
        </C.CardLeft>
        <C.CardRight>
        <C.TitleInfo>Rendimento</C.TitleInfo>
          <C.Info>{Rend} unidades</C.Info>
          <C.TitleInfo>Porc. de ganho</C.TitleInfo>
          <C.Info>{PorcWin}%</C.Info>
        </C.CardRight>
      </C.ContentCard>
      <C.LinkArea>
        <C.OpenLink><MdOpenInBrowser size={25}/></C.OpenLink>
        <C.EditLink>
          <Link to={`/receitas/${id}`}><MdEditNote size={30}/></Link>
        </C.EditLink>
        <C.ExcluirButton onClick={()=> deleteFunc(id)}><MdDelete size={25}/></C.ExcluirButton>
      </C.LinkArea>
    </C.Container>
  );
}