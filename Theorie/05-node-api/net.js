import net from "node:net";

const server = net.createServer((socket) => {
  console.log("Connection received");
  socket.pipe(process.stdout);
});

// server.on('listening', () => {
//   console.log('Server started!!!!');
// });

server.on("error", (err) => {
  console.log("Error", err);
});

// server.on("connection", (socket) => {
//   console.log("Connection received");
//   socket.pipe(process.stdout);

//   // socket.on('data', (buffer) => {
//   //   socket.write(buffer.toString().toUpperCase())
//   // })
// });

server.listen(8080, () => {
  console.log("Server started!!!!");
});
