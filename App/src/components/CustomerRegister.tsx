import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { ICustomerData } from "../interfaces/ICustomerData";
import { createCustomer } from "../services/customerService";

interface CustomerRegisterProps {
  onAddCustomer: (newCustomer: ICustomerData) => void;
}

export default function CustomerRegister({
  onAddCustomer,
}: CustomerRegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const newCustomer: ICustomerData = { name, email };
      const createdCustomer = await createCustomer(newCustomer);
      onAddCustomer(createdCustomer);
      setName("");
      setEmail("");
    } catch (error) {
      console.log("Erro ao enviar a solicitação.", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        marginBottom: "3em",
        width: 800,
        maxWidth: "100%",
      }}
    >
      <Box>
        <TextField
          fullWidth
          label="Nome"
          id="name"
          onChange={handleNameChange}
        />
      </Box>
      <Box>
        <TextField
          fullWidth
          label="Email"
          id="email"
          onChange={handleEmailChange}
        />
      </Box>
      <Button
        sx={{ bgcolor: "#008689", color: "#ffffff" }}
        onClick={handleSubmit}
      >
        Registrar
      </Button>
    </Box>
  );
}
