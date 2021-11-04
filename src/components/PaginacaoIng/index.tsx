import * as C from './styles';

import { MdSkipPrevious, MdSkipNext} from 'react-icons/md';

import {Page} from '../../types/page';

type Props = {
  listPag: Page | undefined,
  changeUp: Function
  changeDown: Function
}

export default function PaginacaoIng({listPag, changeUp, changeDown}: Props) {

  if (listPag?.empty) {
    return <div></div>
  }

  return (
    <C.Container>
      <C.Preview onClick={()=> changeDown(listPag?.numberPage)} disabled={listPag?.first}>
        <MdSkipPrevious size={25}/>
      </C.Preview>
      <C.Content>{`${listPag?.numberPage} / ${listPag?.totalPages}`}</C.Content>
      <C.Next  onClick={()=> changeUp(listPag?.numberPage)} disabled={listPag?.last}>
        <MdSkipNext size={25}/>
      </C.Next>
    </C.Container>
  );
}