import api from "../routes/api";
import { ICardData } from "../interfaces/ICardData"; 

export const listCustomers = async (): Promise<ICardData[]> => {
  try {
    const response = await api.get("/customers"); 
    return response.data;  
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao buscar clientes:", error.message);
    } else {
      console.error("Erro ao buscar clientes:", error);
    }
    throw error; 
  }
};