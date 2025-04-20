import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import config from "./config/index.js";
import typeDefs from "./schemas/index.js";
import resolvers from "./resolvers/index.js";
import sequelize, { testDatabaseConnection } from "./models/index.js";
import { setupAssociations } from "./models/associations.js";

async function startServer() {
  // Create Express app
  const app = express();
  const httpServer = http.createServer(app);

  //Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  //Start Apollo Serveer
  await server.start();

  //   Test database conneciton
  await testDatabaseConnection();

  //   Set up model associations
  setupAssociations();

  // Sync database models
  await sequelize.sync();
  console.log("✅ Database models synchronized");

  // Apply middleware
  app.use(cors());
  app.use(express.json());

  // Apply Apollo GraphQL middleware
  app.use("/graphql", expressMiddleware(server));

  // Add health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).send("OK");
  });

  // Start listening
  const PORT = config.server.port;
  await new Promise((resolver) => httpServer.listen({ port: PORT }, resolver));
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

// Start the server
startServer().catch((err) => {
  console.error("❌ Error starting server:", err);
});
