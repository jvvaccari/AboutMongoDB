import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateCustomerService } from "../services/UpdateCustomerService";
import { ICustomerProps } from "../interfaces/ICustomerProps";

class UpdateCustomerController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const { email } = req.params as { email: string };
    const { newName, newEmail } = req.body as ICustomerProps;

    if (!newName && !newEmail) {
      return rep
        .status(400)
        .send({ message: "Either newName or newEmail must be provided." });
    }

    const updateCustomerService = new UpdateCustomerService();

    try {
      const updatedCustomer = await updateCustomerService.execute({
        email,
        newEmail,
        newName,
      });

      return rep.send(updatedCustomer);
    } catch (error: any) {
      return rep.status(500).send({ message: error.message });
    }
  }
}

export { UpdateCustomerController };
