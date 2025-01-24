import { ICustomerData } from "./ICustomerData";

export interface ICustomerCardProps {
  cards: ICustomerData[];
  onDeleteCustomer: (email: string) => Promise<void>;
  onUpdateCustomer: (updatedCustomer: {
    email: string;
    newName: string;
    newEmail: string;
  }) => Promise<void>;
}