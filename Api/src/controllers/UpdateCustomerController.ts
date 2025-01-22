import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateCustomerService } from "../services/UpdateCustomerService";

class UpdateCustomerController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const { email } = req.params as { email: string };
    const { name, newEmail } = req.body as { name: string; newEmail: string };

    if(!name || !newEmail){
        rep.status(404).send({message: "Both name and newEmail are required."});
    }

    const updateCustomerService = new UpdateCustomerService();

    try {
      const updatedCustomer = await updateCustomerService.execute({
        name,
        email,
        newEmail,
      });
      return rep.send(updatedCustomer);
    } catch (error: any) {
      return rep.status(404).send({ message: error.message });
    }
    
  }
}

export { UpdateCustomerController };
