import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { ICustomerData } from "../interfaces/ICustomerData";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { ICustomerCardProps } from "../interfaces/ICustomerCardProps";

function CustomerCard({
  cards,
  onDeleteCustomer,
  onUpdateCustomer,
}: ICustomerCardProps) {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [editedCustomer, setEditedCustomer] = useState<ICustomerData | null>(
    null
  );
  const [currentEmail, setCurrentEmail] = useState<string>("");

  const handleDelete = async (email: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await onDeleteCustomer(email);
  };

  const handleUpdate = async (email: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const customerToEdit = cards.find((card) => card.email === email);
    if (customerToEdit) {
      setCurrentEmail(email);
      setEditedCustomer({ ...customerToEdit });
      setOpen(true);
    }
  };

  const handleSave = async () => {
    if (editedCustomer) {
      const updatedCustomer = {
        email: currentEmail,
        newName: editedCustomer.name,
        newEmail: editedCustomer.email,
      };
      await onUpdateCustomer(updatedCustomer);
      setOpen(false);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    if (event.target instanceof HTMLInputElement) {
      setEditedCustomer((prevCustomer) => ({
        ...prevCustomer!,
        [field]: event.target.value,
      }));
    }
  };

  return (
    <>
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
              <Box
                sx={{
                  display: "flex",
                  gap: "0.4em",
                  position: "absolute",
                  top: 6,
                  right: 6,
                }}
              >
                <EditIcon
                  onClick={(e) => handleUpdate(card.email, e)}
                  sx={{
                    transition: "transform 0.3s ease",
                    ":hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
                <DeleteIcon
                  sx={{
                    color: "red",
                    transition: "transform 0.3s ease",
                    ":hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                  onClick={(e) => handleDelete(card.email, e)}
                />
              </Box>

              <CardContent sx={{ height: "100%", marginTop: "1em" }}>
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

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Editar Cliente</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            value={editedCustomer?.name || ""}
            onChange={(e) => handleChange(e, "name")}
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={editedCustomer?.email || ""}
            onChange={(e) => handleChange(e, "email")}
            margin="normal"
          />
        </DialogContent>
        <DialogActions sx={{ margin: "1em" }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{ bgcolor: "#008689", color: "#ffffff" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            sx={{ bgcolor: "#008689", color: "#ffffff" }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CustomerCard;
