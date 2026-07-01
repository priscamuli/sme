import { api } from "../api/axios";

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const createProduct = async (product: any) => {
  const response = await api.post("/products", product);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};