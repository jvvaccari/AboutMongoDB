import prismaClient from "../prisma";
import { ICustomerProps } from "../interfaces/ICustomerProps";

class CreateCustomerService {
  async execute({name,email}: ICustomerProps) {
    if(!name || !email){
      throw new Error("Fill in all the fields.");
    }

    const customer = await prismaClient.customer.create({
      data:{
        name,
        email,
        status: true
      }
    });

    return customer;
  }
}

export { CreateCustomerService };
