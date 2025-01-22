import { useState, useEffect } from "react";
import ClientCard from "./components/ClientCard";
import { ICardData } from "./interfaces/ICardData";
import { listCustomers } from "./services/customerService";

function App() {
  const [cards, setCards] = useState<ICardData[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await listCustomers();
        setCards(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="app">
      <ClientCard cards={cards} />{" "}
    </div>
  );
}

export default App;
