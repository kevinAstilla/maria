import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import { readFileSync } from 'fs';
import http from 'http';
import { join } from 'path';
import { AppDataSource } from './config/ormConfig';
import { resolvers } from './graphql/resolvers';
interface MyContext {
  token?: String;
}

const startServer = async ():void => {
  const typeDefs = readFileSync(join(__dirname, 'graphql/schema.graphql'), 'utf8');
  await AppDataSource.initialize();
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start();
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({token: req.headers.token }),
    })
  );

  httpServer
  .listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  })
  .on('error', (err) => {
    console.log(err)
    process.exit(1)
  })
}

startServer()

// await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
// console.log(`🚀 Server ready at http://localhost:4000/graphql`);

