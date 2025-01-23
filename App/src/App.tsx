import ClientRegister from "./components/CustomerRegister";
import CustomerCard from "./components/CustomerCard";
import { Container } from "@mui/material";
import { ICustomerData } from "./interfaces/ICustomerData";
import { useState, useEffect } from "react";
import {
  listCustomers,
  updateCustomer,
  deleteCustomer,
} from "./services/customerService";

function App() {
  const [customer, setCustomer] = useState<ICustomerData[]>([]);

  const fetchCustomer = async () => {
    try {
      const data = await listCustomers();
      setCustomer(data);
    } catch (error) {
      console.log("Erro ao listar clientes.", error);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const addCustomer = (newCustomer: ICustomerData) => {
    setCustomer((prevCustomer) => [...prevCustomer, newCustomer]);
  };

  const handleDeleteCustomer = async (email: string) => {
    try {
      await deleteCustomer(email);
      setCustomer((prevCustomer) =>
        prevCustomer.filter((customer) => customer.email !== email)
      );
    } catch (error) {
      console.log("Erro ao excluir cliente:", error);
    }
  };

  const handleUpdateCustomer = async (updatedCustomer: {
    email: string;
    newName: string;
    newEmail: string;
  }) => {
    if (updatedCustomer.newName && updatedCustomer.newEmail) {
      try {
        const updatedCustomerData = await updateCustomer(updatedCustomer);
        setCustomer((prevCustomer) =>
          prevCustomer.map((customer) =>
            customer.email === updatedCustomer.email
              ? { ...customer, ...updatedCustomerData }
              : customer
          )
        );
      } catch (error) {
        console.log("Erro ao atualizar cliente:", error);
      }
    } else {
      console.log("Erro: 'newName' ou 'newEmail' estão indefinidos.");
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "offwhite",
      }}
    >
      <div className="app">
        <ClientRegister onAddCustomer={addCustomer} />
        <CustomerCard
          cards={customer}
          onDeleteCustomer={handleDeleteCustomer}
          onUpdateCustomer={handleUpdateCustomer}
        />
      </div>
    </Container>
  );
}

export default App;
