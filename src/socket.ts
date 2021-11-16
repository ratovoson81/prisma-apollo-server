import { Server } from "socket.io";
//import httpServer from "./server";

/*let io = new Server(httpServer);

io.on("connection", (socket: any) => {
  let token = socket.handshake.query.token;
  io.emit("arrivalUser", token);

  socket.on("add", (data: any) => {
    console.log("add", data);
    io.emit("ok", data);
  });

  socket.on("conn", (data: any) => {
    token = data;
  });

  socket.on("disconnect", () => {
    console.log("disconnect", token);
    // set offline via token
    io.emit("check", token);
  });
});*/
