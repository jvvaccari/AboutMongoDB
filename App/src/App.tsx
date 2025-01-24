import CustomerRegister from "./components/CustomerRegister";
import CustomerCard from "./components/CustomerCard";
import { Container } from "@mui/material";
import { ICustomerData } from "./interfaces/ICustomerData";
import { useState, useEffect } from "react";

function App() {
  const [customerList, setCustomerList] = useState<ICustomerData[]>([]);

  const fetchCustomer = async () => {
    try {
      const list = await listCustomers();
      setCustomerList(list);
    } catch (error) {
      console.log("Erro ao listar clientes.", error);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const addCustomer = (newCustomer: ICustomerData) => {
    setCustomerList((prevCustomer) => [...prevCustomer, newCustomer]);
  };

  const handleDeleteCustomer = async (email: string) => {
    try {
      await deleteCustomer(email);
      setCustomerList((prevCustomer) =>
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
        setCustomerList((prevCustomer) =>
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
        <CustomerRegister onAddCustomer={addCustomer} />
        <CustomerCard
          cards={customerList}
          onDeleteCustomer={handleDeleteCustomer}
          onUpdateCustomer={handleUpdateCustomer}
        />
      </div>
    </Container>
  );
}

export default App;
