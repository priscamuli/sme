import { api } from "../api/axios";

export const createSale = async (
  saleData: any
) => {
  const response = await api.post(
    "/sales",
    saleData
  );

  return response.data;
};