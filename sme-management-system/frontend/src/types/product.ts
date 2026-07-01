export interface Product {
  id: string;
  name: string;
  sku: string;
  buyingPrice: number;
  sellingPrice: number;
  quantity: number;
  reorderLevel: number;
}