import api from "../routes/api";
import { ICustomerData } from "../interfaces/ICustomerData";

export const listCustomers = async (): Promise<ICustomerData[]> => {
  try {
    const rep = await api.get("/customers"); 
    return rep.data;  
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao buscar clientes:", error.message);
    } else {
      console.error("Erro ao buscar clientes:", error);
    }
    throw error; 
  }
};

export const createCustomer = async (newClient: ICustomerData): Promise<ICustomerData> => {
  try{
    const rep = await api.post("/customer", newClient);
    console.log("Cliente criado com sucesso:", rep.data);
    return rep.data;
  } catch(error){
    if (error instanceof Error) {
      console.error("Erro ao criar cliente:", error.message);
    } else {
      console.error("Erro ao criar cliente:", error);
    }
    throw error;
  }
}

export const deleteCustomer = async (email: string): Promise<void> => {
  try{
    const encodedEmail = encodeURIComponent(email);
    const rep = await api.delete(`/customer/${encodedEmail}`);
    console.log("Cliente deletado com sucesso:", rep.data);
  }catch(error){
    if (error instanceof Error) {
      console.error("Erro ao deletar cliente:", error.message);
    } else {
      console.error("Erro ao deletar cliente:", error);
    }
    throw error;
  }
}

export const updateCustomer = async (
  updatedCustomer: {email: string ,newEmail: string, newName: string }
): Promise<ICustomerData> => {
  try {
    console.log(updatedCustomer);
    const rep = await api.put(`/customer/${updatedCustomer.email}`, updatedCustomer);
    console.log("Cliente atualizado com sucesso:", rep.data);
    return rep.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao atualizar cliente:", error.message);
    } else {
      console.error("Erro ao atualizar cliente:", error);
    }
    throw error;
  }
};
