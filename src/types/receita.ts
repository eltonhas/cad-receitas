import { Ingrediente } from "./ingrediente";

export type Receita = {
  id: string,
  items: Ingrediente[],
  name: string,
  salePrice: number, //Preço de venda
  unitPrice: number, // Gasto unitário
  gainUnit: number, // Lucro Unitário
  yield: number, // Rendimento
  ingCost: number, // Custo Ingredientes
  addCost: number, // Custo adicional
  allCost: number, // Cuso Total
  gainPorc: number, // Porcentagem de lucro
  allGain: number, // Lucro Total
}