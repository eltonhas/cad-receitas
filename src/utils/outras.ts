import { Ingrediente } from './../types/ingrediente';
import { Page } from '../types/page';


export function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

export function pagination(list: Ingrediente[]) {

  let data: Page[] = [];
  let numberPage = 1;

  let content: Ingrediente[] = [];

  const totalItens = list.length

  if (totalItens === 0) {
    const page: Page = {
      content,
      first: true,
      last: true,
      numberPage,
      totalPages: 1,
      empty: true
    }
    data = [...data, page];
    return data;
  }

  const division = (totalItens)/8;
  let totalPages = parseFloat(division.toFixed(0));

  if (division - totalPages !== 0) {
    totalPages += 1;
  }


  const lastItem = list[list.length-1];

  list.forEach( item => {
    if (item === lastItem) {
      console.log("Entrei aqui");
      let page: Page;
      if (content.length !== 8) {
        console.log("Entrei aqui1");
        content = [...content, item];
        page = {
          content,
          first: false,
          last: true,
          numberPage,
          totalPages
        }

        data = [...data, page];
        console.log(data);
        return data;
      }

      page = {
        content,
        first: false,
        last: false,
        numberPage,
        totalPages
      }
      data = [...data, page];

      content = [];
      numberPage += 1;
      content = [...content, item];

      let lastPage = {
        content,
        first: false,
        last: true,
        numberPage,
        totalPages
      }
      data = [...data, lastPage];

    } else if (content.length === 8) {
      let page: Page;
      // Não é a primeira pagina
      if (numberPage !== 1) {
        page = {
          content,
          first: false,
          last: false,
          numberPage,
          totalPages
        }
        data = [...data, page];
        console.log("4");
      // É a primeira pagina
      } else {
        page = {
          content,
          first: true,
          last: false,
          numberPage,
          totalPages
        }
        data = [...data, page];
        console.log("2");
      }
      content = [];
      content = [...content, item];
      numberPage += 1;
    } else if (content.length < 8) {
      content = [...content, item];
      console.log(content);
    }
  });

  return data;
}