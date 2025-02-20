import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("✅ 新用户连接");

    ws.on("message", (data) => {
        console.log("📩 服务器收到消息:", data);

        // 🚀 广播给所有连接的客户端
        wss.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(data);
            }
        });
    });

    ws.on("close", () => {
        console.log("❌ 用户断开连接");
    });
});
