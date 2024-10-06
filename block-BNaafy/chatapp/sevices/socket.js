const { Server } = require("socket.io");

const setupSocket = (server) => {
  const io = new Server(server);
  const messages = []; // Array to store messages

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Send all previous messages to the new client
    socket.emit("previous-messages", messages);

    // Listen for chat messages
    socket.on("chat-message", (msg) => {
      messages.push(msg);
      // Emit the message to all clients
      io.emit("chat-message", msg);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};

module.exports = setupSocket;
