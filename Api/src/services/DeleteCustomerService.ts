import prismaClient from "../prisma";

class DeleteCustomerService {
  async execute(email: string) {
    const customer = await prismaClient.customer.findFirst({
      where: {
        email: email,
      },
    });

    if (!customer) {
      throw new Error("Customer not found.");
    }

    const deletedCustomer = await prismaClient.customer.delete({
      where: {
        id: customer.id,
      },
    });

    return deletedCustomer;
  }
}

export { DeleteCustomerService };
