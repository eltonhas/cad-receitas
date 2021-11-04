
import {useContext} from 'react';
import {Link} from 'react-router-dom';

import * as C from './styles';
import logo from '../../assets/logof.png';
import {AuthContext} from "../../context/auth";

import {MdLogout} from "react-icons/md";

type Props = {
  item: string;
}

export default function Header( {item} : Props ) {

  const { signOutContext } = useContext(AuthContext);

  const infos = [
    {label1: "RECEITAS CADASTRADAS", link1: "/ingredientes", label2: "Ingredientes", link2: "/receitas", label3: "Receitas"},
    {label1: "CADASTRO DE INGREDIENTES", link1: "/", label2: "Home", link2: "/receitas", label3: "Receitas"},
    {label1: "CADASTRO DE RECEITAS", link1: "/", label2: "Home", link2: "/ingredientes", label3: "Ingredientes"},
  ];

  return(
    <C.Container>
      <C.Image src={logo}/>
      <C.Title>
        {
          item === "home" ? infos[0].label1 : (item === "ingrediente" ? infos[1].label1 : infos[2].label1)
        }
      </C.Title>
      <C.ContLink>
        <Link 
          to={
            item === "home" ? infos[0].link1 : (item === "ingrediente" ? infos[1].link1 : infos[2].link1)
          }
        >
          {
            item === "home" ? infos[0].label2 : (item === "ingrediente" ? infos[1].label2 : infos[2].label2)
          }
        </Link>
        <Link 
          to={
            item === "home" ? infos[0].link2 : (item === "ingrediente" ? infos[1].link2 : infos[2].link2)
          }
        >
          {
            item === "home" ? infos[0].label3 : (item === "ingrediente" ? infos[1].label3 : infos[2].label3)
          }
        </Link>
      </C.ContLink>
      <C.ButtonLogout onClick={signOutContext}>
        <MdLogout size={30}/>
      </C.ButtonLogout>
    </C.Container>
  );
}