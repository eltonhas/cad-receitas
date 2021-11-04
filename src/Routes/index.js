import { Switch } from 'react-router';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Ingredientes from '../pages/Ingredientes';
import Receitas from '../pages/Receitas';

export default function Routes() {
  return(
    <Switch>
      <Route path="/" exact component={SignIn}/>
      <Route path="/home" exact component={Home} isPrivate/>
      <Route path="/ingredientes" exact component={Ingredientes} isPrivate/>
      <Route path="/ingredientes/:id" exact component={Ingredientes} isPrivate/>
      <Route path="/receitas" exact component={Receitas} isPrivate/>
    </Switch>
  );
}