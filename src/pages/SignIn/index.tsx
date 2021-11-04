
import { useState, useContext } from 'react';
import logo from '../../assets/logof.png';
import * as C from './styles';

import {AuthContext} from '../../context/auth';

export default function SignInPage() {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleLogin() {
    signIn(user, password);
  }

  return (
    <C.Container>
      <C.Content>
        <C.Image src={logo}/>
        <C.Area>
          <C.Text>Usuário:</C.Text>
          <C.Input type="text" value={user} onChange={e=> setUser(e.target.value)}/>
          <C.Text>Senha:</C.Text>
          <C.Input type="password" value={password} onChange={e=> setPassword(e.target.value)}/>
          <C.Button onClick={handleLogin}>{loadingAuth ? "CARREGANDO..." : "ENTRAR"}</C.Button>
        </C.Area>
      </C.Content>
    </C.Container>
  );
}