import typeDefs from "./typeDefs";
import { prisma } from "./context";
import express from "express";
import resolvers from "./resolversMap";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import { graphqlUploadExpress } from "graphql-upload";
import { Server } from "socket.io";
import http from "http";
var cors = require("cors");

//const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");

const app = express();
app.use(cors());

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => ({
    req,
    prisma,
  }),
  uploads: false,
  //plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

app.use("/images", express.static(path.join(__dirname, "../images")));
app.use(graphqlUploadExpress());

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 4000 }, () =>
  console.log(`
🚀 Server ready at: http://localhost:4000/graphql`)
);

httpServer.listen(5000, () => {
  console.log("serveur start on port 4000");
});

io.on("connection", (socket) => {
  socket.on("add", (data) => {
    console.log("add", data);
    io.emit("ok", data);
  });
});
