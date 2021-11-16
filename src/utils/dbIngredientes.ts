
import {firestore} from '../connection/firebaseConnection';
import {collection, doc, getDoc, 
        setDoc, query, updateDoc, getDocs,
        deleteDoc, orderBy,
      } from 'firebase/firestore';

import { Ingrediente } from '../types/ingrediente';

const INGREDIENTES = collection(firestore, "ingredientes");

export async function setIngrediente(data: Ingrediente) {

  await setDoc(doc(INGREDIENTES, data.id), {
    id: data.id,
    name: data.name,
    price: data.price,
    qtd: data.qtd,
    unit: data.unit,
  })
  .then(() => {
    alert("Produto cadastrado com sucesso")
  })
  .catch(e => {
    console.log(e)
    alert("Produto não cadastrado, tente mais tarde")
    return 1;
  });

  return 0;
}

export async function getIngredientes() {

  const queryIng = query(INGREDIENTES, orderBy("name"));
  const snapshot = await getDocs(queryIng);
  
  let list: Ingrediente[] = [];
  snapshot.forEach( ingrediente => {
    let data = {
      id: ingrediente.id,
      name: ingrediente.data().name,
      qtd: ingrediente.data().qtd,
      price: ingrediente.data().price,
      unit: ingrediente.data().unit
    }
    
    list.push(data);
  });

  return list;
}

export async function getOneIngrediente(id: string) {

  const docRef = doc(INGREDIENTES, id);

  const snapshot = await getDoc(docRef);
  let data: Ingrediente;
  if (snapshot.exists()) {
    data = {
      id: snapshot.id,
      name: snapshot.data().name,
      qtd: snapshot.data().qtd,
      price: snapshot.data().price,
      unit: snapshot.data().unit
    }
  } else {
    return 1;
  }
  return data;
}

export async function deleteIngrediente(id: string) {

  const docRef = doc(INGREDIENTES, id);

  await deleteDoc(docRef)
  .catch(e => {
    console.log(e);
    return 1;
  });

  return 0;
}

export async function updateIngrediente(data: Ingrediente) {
  const docRef = doc(INGREDIENTES, data.id);
  await updateDoc(docRef, data)
  .catch(e => {
    console.log(e);
    return 1;
  });

  return 0;
}