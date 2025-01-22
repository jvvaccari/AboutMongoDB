import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateCustomerController } from "./controllers/CreateCustomerController";
import { ListCustomersController } from "./controllers/ListCustomersController";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";
import { UpdateCustomerController } from "./controllers/UpdateCustomerController";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/", async (req: FastifyRequest, rep: FastifyReply) => {
    return { message: "Welcome to the API!" };
  });

  fastify.get("/test", async (req: FastifyRequest, rep: FastifyReply) => {
    return { ok: true };
  });

  fastify.post("/customer", async (req: FastifyRequest, rep: FastifyReply) => {
    return new CreateCustomerController().handle(req, rep);
  });

  fastify.get("/customers", async (req: FastifyRequest, rep: FastifyReply) => {
    return new ListCustomersController().handle(req, rep);
  });

  fastify.delete(
    "/customer/:email",
    async (req: FastifyRequest, rep: FastifyReply) => {
      const { email } = req.params as { email: string };

      const customerController = new DeleteCustomerController();
      return customerController.handle({ ...req, body: { email } }, rep);
    }
  );

  fastify.put(
    "/customer/:email",
    async (req: FastifyRequest, rep: FastifyReply) => {
      const { email } = req.params as { email: string };
      const { name, newEmail } = req.body as { name: string; newEmail: string };

      const customerController = new UpdateCustomerController();
      return customerController.handle(
        { ...req, body: { name, newEmail, email } },
        rep
      );
    }
  );
}
