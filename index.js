const express = require("express");
const socket = require("socket.io");
const http = require("http");
const filter = require("bad-words");
const app = express();
const server = http.createServer(app);
const io = socket(server);
const path = require("path");
const { displayMessage } = require("./utils/message");
const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  socket.on("displays", (val, callback) => {
    if (new filter().isProfane(val)) {
      return callback("That word is shitty");
    }
    io.emit("everyy", displayMessage(val));
    callback();
  });

  socket.broadcast.emit("everyy", displayMessage("a user has joined"));

  socket.on("location", (position, callback) => {
    const val_send = `https://google.com/maps?q=${position.lat},${position.long}`;
    io.emit("location_message", displayMessage(val_send));
    if (!position) {
      callback("network error, cant get location at this time");
    }
    callback();
  });
});
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
