import typeDefs from "./typeDefs";
import { context, prisma } from "./context";
import express from "express";
import resolvers from "./resolversMap";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import { graphqlUploadExpress } from "graphql-upload";
import { Server } from "socket.io";
import http from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "graphql-tools";
import { execute, subscribe } from "graphql";
import { setConnected, setDisconnect } from "./decodedToken";
var cors = require("cors");

const app = express();
app.use(cors());

const httpServer = http.createServer(app);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
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

const corsOptions = {
  origin: "*",
  credentials: true,
  exposedHeaders: ["Authorization"],
};
const server = new ApolloServer({
  schema,
  context: (req) => ({
    req,
    prisma,
  }),
  uploads: false,
  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          },
        };
      },
    },
  ] as any,
});

const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
    //async onConnect(connectionParams: any /*, webSocket, context*/) {},
    //onDisconnect: async (webSocket: any, context: any) => {},
  },
  { server: httpServer, path: server.graphqlPath }
);

app.use("/images", express.static(path.join(__dirname, "../images")));
app.use(graphqlUploadExpress());
server.start();

server.applyMiddleware({ app, cors: corsOptions });

httpServer.listen(4000, () => {
  console.log("🚀 Server ready at: http://localhost:4000/graphql");
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  let token = socket.handshake.query.token as any;
  console.log(token);
  io.emit("update-status-user", await setConnected(token));

  socket.on("send-message", (data) => {
    io.emit("arrival-message", data);
  });

  socket.on("login", async (data) => {
    token = data;
    io.emit("update-status-user", await setConnected(data));
  });

  socket.on("logout", async (data) => {
    io.emit("update-status-user", await setDisconnect(data));
  });

  socket.on("disconnect", async () => {
    // set offline via token
    io.emit("update-status-user", await setDisconnect(token));
  });
});
