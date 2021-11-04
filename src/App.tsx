
import AuthProvider from './context/auth';
import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </AuthProvider>
  );
};
