import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustomersService } from "../services/ListCustomersService";

class ListCustomersController{
    async handle(
        req: FastifyRequest,
        rep: FastifyReply
    ){  
        const listCustomersService = new ListCustomersService;
        const customers = await listCustomersService.execute();

        rep.send(customers);
    }

}

export { ListCustomersController };
