import api from "./api";
import { ICardData } from "../interfaces/ICardData";

export const createCustomer = async (data: ICardData): Promise<unknown> => {
    try{
        const rep = await api.post("customer",data);
        return rep.data;
    } catch(error: unknown){
        if (error instanceof Error) {
            console.error("Erro ao criar cliente:", error.message);
          } else {
            console.error("Erro ao criar cliente:", error);
          }
          throw error;
    }
}

export const listCustomer = async (): Promise<ICardData[]> => {
    try {
        const rep = await api.get("/customers");
        return rep.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Erro ao listar clientes:", error.message);
        } else {
            console.error("Erro ao listar clientes:", error);
        }
        throw error;
    }
};

