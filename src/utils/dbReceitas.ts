
import { firestore } from '../connection/firebaseConnection';
import {collection, doc, getDoc, 
        setDoc, query, updateDoc, getDocs,
        deleteDoc, orderBy,
      } from 'firebase/firestore';

import { Receita } from '../types/receita';

const RECEITAS = collection(firestore, "receitas");

export async function setReceita(data: Receita) {

  await setDoc(doc(RECEITAS, data.id), {
    id: data.id,
    items: data.items,
    name: data.name,
    salePrice: data.salePrice,
    unitPrice: data.unitPrice,
    gainUnit: data.gainUnit,
    yield: data.yield,
    ingCost: data.ingCost,
    addCost: data.addCost,
    allCost: data.allCost,
    gainPorc: data.gainPorc,
    allGain: data.allGain
  })
  .then(() => {
    alert("Receita cadastrada com sucesso")
  })
  .catch(e => {
    console.log(e)
    alert("Receita não cadastrada, tente mais tarde")
    return 1;
  });

  return 0;
}

export async function getReceitas() {
  const queryIng = query(RECEITAS, orderBy("name"));
  const snapshot = await getDocs(queryIng);
  
  let list: Receita[] = [];
  snapshot.forEach( receita => {
    let data = {
      id: receita.id,
      items: receita.data().items,
      name: receita.data().name,
      salePrice: receita.data().salePrice,
      unitPrice: receita.data().unitPrice,
      gainUnit: receita.data().gainUnit,
      yield: receita.data().yield,
      ingCost: receita.data().ingCost,
      allGain: receita.data().allGain,
      addCost: receita.data().addCost,
      allCost: receita.data().allCost,
      gainPorc: receita.data().gainPorc,
    }
    
    list.push(data);
  });

  return list;
}

export async function getOneReceita(id: string) {

  const docRef = doc(RECEITAS, id);

  const snapshot = await getDoc(docRef);
  let data: Receita;
  if (snapshot.exists()) {
    data = {
      id: snapshot.id,
      items: snapshot.data().items,
      name: snapshot.data().name,
      salePrice: snapshot.data().salePrice,
      unitPrice: snapshot.data().unitPrice,
      gainUnit: snapshot.data().gainUnit,
      yield: snapshot.data().yield,
      ingCost: snapshot.data().ingCost,
      allGain: snapshot.data().allGain,
      addCost: snapshot.data().addCost,
      allCost: snapshot.data().allCost,
      gainPorc: snapshot.data().gainPorc,
    }
  } else {
    return 1;
  }
  return data;
}

export async function updateReceita(data: Receita) {
  const docRef = doc(RECEITAS, data.id);
  await updateDoc(docRef, data)
  .catch(e => {
    console.log(e);
    return 1;
  });

  return 0;
}