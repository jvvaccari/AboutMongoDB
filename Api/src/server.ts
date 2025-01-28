import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";
import * as dotenv from 'dotenv';
import fastifyFormbody from "@fastify/formbody";
dotenv.config();

console.log(process.env.DATABASE_URL); 


const app = Fastify({ logger: true });

const start = async () => {
  await app.register(cors);
  await app.register(routes);
  await app.register(fastifyFormbody); 
  try {
    await app.listen({ port: 5721 });
    console.log("Server is running on http://localhost:5721");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
