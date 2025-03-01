const io = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to the backend");

  socket.emit("getAvailableRooms");
});

socket.on("availableRooms", (rooms) => {
  console.log("Received available rooms:", rooms);
});

socket.on("roomCreated", (newRoom) => {
  console.log("New room created:", newRoom);
});

socket.on("disconnect", () => {
  console.log("Disconnected from the backend");
});