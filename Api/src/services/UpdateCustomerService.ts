import prismaClient from "../prisma";
import { ICustomerProps } from "../interfaces/ICustomerProps";

class UpdateCustomerService {
  async execute({ name, email, newEmail }: ICustomerProps) {
    try {
      const existingCustomerWithNewEmail =
        await prismaClient.customer.findFirst({
          where: { email: newEmail },
        });

      if (existingCustomerWithNewEmail) {
        throw new Error("This email is already in use.");
      }

      const customer = await prismaClient.customer.findFirst({
        where: { email: email },
      });

      if (!customer) {
        throw new Error("Customer not found.");
      }

      const updateCustomer = await prismaClient.customer.update({
        where: { email: email },
        data: {
          name: name,
          email: newEmail,
        },
      });

      return updateCustomer;
    } catch (error: any) {
      throw new Error(
        error.message || "An error occurred while updating the customer."
      );
    }
  }
}

export { UpdateCustomerService };
