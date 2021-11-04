import { Ingrediente } from './ingrediente';

export type Page = {
  content: Ingrediente[];
  last: boolean,
  first: boolean,
  numberPage: number,
  totalPages: number,
  empty?: boolean
}