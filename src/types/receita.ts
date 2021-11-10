import { Ingrediente } from "./ingrediente";

export type Receita = {
  items: Ingrediente[],
  salePrice: number, //Preço de venda
  unitPrice: number, // Preço unitário
  gainUnit: number, // Lucro Unitário
  yield: number, // Rendimento
  ingCost: number, // Custo Ingredientes
  addCost: number, // Custo adicional
  allCost: number, // Cuso Total
  gainPorc: number, // Porcentagem de lucro
  allGain: number, // Lucro Total
  dateAtt: Date, // Data de atualização
}