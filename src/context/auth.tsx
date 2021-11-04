
import {ReactNode, createContext, useState, useEffect, } from 'react';
import { auth, firestore} from '../connection/firebaseConnection';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { ContextType } from "../types/contextType";
import { Usuario } from '../types/usuario';

const DEFAULT_VALUE = {   
   signed: false,
   signIn: () => {},
   signOutContext: () => {},
}

type Props = {
   children: ReactNode
}

export const AuthContext = createContext<ContextType>(DEFAULT_VALUE);

   function AuthProvider({children}: Props) {
      const [user, setUser] = useState<Usuario>();
      const [loadingAuth, setLoadingAuth] = useState(false);
      const [loading, setLoading] = useState(true);

      //Verificando se tem algum login no localstorage
      useEffect(()=>{
         function loadStorage() {
            const storageUser = localStorage.getItem('SistemaRec');

            if (storageUser) {
               setUser(JSON.parse(storageUser));
               setLoading(false);
            }
            setLoading(false);
         }
         loadStorage();
      }, []);

      async function signIn(email: string, password: string) {
         setLoadingAuth(true);
         await signInWithEmailAndPassword(auth, email, password)
         .then( async (value) => {
            let uid = value.user.uid;
            //Pegar as informações do usuario no firestore, caso a autenticação for ok.
            const docRef = doc(firestore, 'users', uid);
            const userProfile = await getDoc(docRef);
            if (userProfile.exists()) {
               let data: Usuario = {
                  uid: uid,
                  name: userProfile.data().nome,
                  email: userProfile.data().email,
               }
               storageUser(data);
               setUser(data);
            }
         })
         .catch( err => {
            alert("Login Falhou");
            console.log(err);
         });
         setLoadingAuth(false);
      }

      async function signOutContext() {
         await signOut(auth);
         localStorage.removeItem('SistemaRec');
         setUser(undefined);
      }
   
      async function storageUser(data: Usuario) {
         localStorage.setItem("SistemaRec", JSON.stringify(data));
      }

      return(
         <AuthContext.Provider value={{
            signed: !!user,
            loading,
            loadingAuth,
            user,
            signIn,
            signOutContext,
         }}>
            {children}
         </AuthContext.Provider>
      );
   }

export default AuthProvider;