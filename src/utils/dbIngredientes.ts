
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
    qtdEmb: data.qtdEmb,
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
      qtdEmb: ingrediente.data().qtdEmb,
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

  if (snapshot.exists()) {
    let data: Ingrediente = {
      id: snapshot.id,
      name: snapshot.data().name,
      qtdEmb: snapshot.data().qtdEmb,
      price: snapshot.data().price,
      unit: snapshot.data().unit
    }

    return data;
  } else {
    return 1;
  }

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