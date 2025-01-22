import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteCustomerService } from "../services/DeleteCustomerService";

class DeleteCustomerController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    try {
      const { email } = req.body as { email: string };

      if (!email) {
        return rep.status(400).send({ error: "Email is required." });
      }

      const customerService = new DeleteCustomerService();
      const customer = customerService.execute(email);

      return rep.status(200).send(customer);
    } catch (error: any) {
      return rep.status(404).send({ error: error.message });
    }
  }
}

export { DeleteCustomerController };
