import { Usuario } from './usuario';

export type ContextType = {
  loading?: boolean,
  loadingAuth?: boolean,
  signed: boolean,
  user?: Usuario,
  signIn: (email: string, password: string) => void,
  signOutContext: () => void
}