import prismaClient from "../prisma";
import { ICustomerProps } from "../interfaces/ICustomerProps";

class UpdateCustomerService {
  async execute({ email, newEmail, newName }: ICustomerProps) {
    try {
      if (newEmail) {
        const existingCustomerWithNewEmail =
          await prismaClient.customer.findFirst({
            where: { email: newEmail },
          });

        if (existingCustomerWithNewEmail) {
          throw new Error("This email is already in use.");
        }
      }

      const customer = await prismaClient.customer.findFirst({
        where: { email },
      });

      if (!customer) {
        throw new Error("Customer not found.");
      }

      const updateData: { name?: string; email?: string } = {};

      if (newName) {
        updateData.name = newName;
      }

      if (newEmail) {
        updateData.email = newEmail;
      }

      if (Object.keys(updateData).length === 0) {
        throw new Error("No changes detected.");
      }

      const updatedCustomer = await prismaClient.customer.update({
        where: { email },
        data: updateData,
      });

      return updatedCustomer;
    } catch (error: any) {
      throw new Error(
        error.message || "An error occurred while updating the customer."
      );
    }
  }
}

export { UpdateCustomerService };
