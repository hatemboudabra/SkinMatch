import { Category } from "./category";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  brand: string;
  stock: number;
  category?: Category; 
}