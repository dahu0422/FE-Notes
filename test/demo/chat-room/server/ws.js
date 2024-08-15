const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

// 监听连接事件
wss.on("connection", (ws) => {
  console.log("Client Connection");

  ws.on("message", (message) => {
    console.log(`Receiced: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client Closed");
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
