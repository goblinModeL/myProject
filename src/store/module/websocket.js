import { defineStore } from "pinia";

export const useWebSocketStore = defineStore("websocket", {
    state: () => ({
        socket: null,
        url: "ws://172.20.0.4:8080", // WebSocket 服务器地址
        isConnected: false, // 连接状态
        reconnectAttempts: 0, // 断线重连次数
        maxReconnectAttempts: 5, // 最大重连次数
        heartbeatInterval: null, // 心跳定时器
        heartbeatMsg: "ping", // 心跳消息
        subscribers: [], // 订阅者回调
        messages: [],
        toUser:"",
    }),
 // getters: {
 //     isConnected: (state) => state.isConnected,
 // },
    actions: {
        // ✅ 连接 WebSocket
        connect(formId,toId) {
            if (this.socket) return; // 避免重复连接
            this.socket = new WebSocket(this.url+'?formId='+formId+"&toId="+toId);

            this.socket.onopen = () => {
                console.log("✅ WebSocket 连接成功:", this.url);
                this.isConnected = true;
                this.reconnectAttempts = 0;
                // this.startHeartbeat(); // 开启心跳检测
            };

            this.socket.onmessage = async (event) => {
                console.log("📩 收到消息:", event.data);
                console.log(typeof event.data)
                console.log(typeof event.data==="string");
                if (event.data instanceof Blob) {
                    // 解析 Blob 数据
                    const text = await event.data.text();
                    const message = JSON.parse(text);
                        this.messages.push(message);
                    console.log("📩 客户端收到消息Bolb:", text);
                } else {
                    console.log("📩 客户端收到消息:", event.data);
                }
                // if(typeof event.data === "string") {
                // }
                // else{
                //     const text = await event.data.text();
                //     const message = JSON.parse(text);
                //     this.messages.push(message);
                // }






                this.subscribers.forEach(callback => callback(event.data));

            };

            this.socket.onclose = () => {
                console.log("❌ WebSocket 连接关闭");
                this.isConnected = false;
                this.socket = null;
                // this.stopHeartbeat(); // 停止心跳
                // this.reconnect(); // 尝试重连
            };

            this.socket.onerror = (error) => {
                console.error("⚠️ WebSocket 错误:", error);
                this.isConnected = false;
            };
        },
        setTargetUser(toUser) {
            this.toUser = toUser;  // 只更新接收人，不重新建立 WebSocket 连接
            this.socket.send(JSON.stringify({ type: "setToUser", toUser: this.toUser }));
        },
        // ✅ 发送消息
        sendMessage(username,content) {
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                const message = { username,content, timestamp: new Date() ,};
                this.socket.send(JSON.stringify(message));
            } else {
                console.warn("🚨 WebSocket 未连接，无法发送消息");
            }
        },

        // ✅ 关闭 WebSocket
        close() {
            if (this.socket) {
                    this.socket.close();
                this.socket = null;
            }
        },

        // ✅ 断线自动重连
        reconnect() {
            if (this.reconnectAttempts < this.maxReconnectAttempts) {
                setTimeout(() => {
                    console.log(`🔄 尝试重新连接... (${this.reconnectAttempts + 1})`);
                    this.reconnectAttempts++;
                    this.connect();
                }, 2000); // 2 秒后尝试重连
            } else {
                console.warn("🚨 达到最大重连次数，停止重连");
            }
        },

        // ✅ 订阅 WebSocket 消息
        subscribe(callback) {
            if (!this.subscribers.includes(callback)) {
                this.subscribers.push(callback);
            }
        },

        // ✅ 取消订阅 WebSocket 消息
        unsubscribe(callback) {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        },

        // ✅ 启动 WebSocket 心跳检测
        startHeartbeat() {
            this.stopHeartbeat();
            this.heartbeatInterval = setInterval(() => {
                if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                    this.socket.send(this.heartbeatMsg);
                    console.log("💓 发送心跳包");
                }
            }, 5000); // 每 5 秒发送一次心跳
        },

        // ✅ 停止 WebSocket 心跳检测
        stopHeartbeat() {
            if (this.heartbeatInterval) {
                clearInterval(this.heartbeatInterval);
                this.heartbeatInterval = null;
            }
        },
    },
});
