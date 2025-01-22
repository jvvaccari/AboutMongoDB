import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import { ICardData } from "../interfaces/ICardData";

function ClientCard({ cards }: { cards: ICardData[] }) {
  const [selectedCard, setSelectedCard] = React.useState<number | null>(null);

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 3fr))",
          gap: 2,
        }}
      >
        {cards.map((card, index) => (
          <Card key={card.email} sx={{ height: "100%" }}>
            {" "}
            <CardActionArea
              onClick={() => setSelectedCard(index)}
              data-active={selectedCard === index ? "" : undefined}
              sx={{
                height: "100%",
                "&[data-active]": {
                  backgroundColor: "action.selected",
                  "&:hover": {
                    backgroundColor: "action.selectedHover",
                  },
                },
              }}
            >
              <CardContent sx={{ height: "100%" }}>
                <Typography variant="h5" component="div">
                  {card.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.status ? "Ativo" : "Inativo"}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default ClientCard;
