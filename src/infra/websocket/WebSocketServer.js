const { WebSocketServer } = require('ws');

class RealtimeServer {
    constructor(server) {
        this.wss = new WebSocketServer({ server });
        this.clients = new Map(); // userId → ws

        this.wss.on('connection', (ws, req) => {
            const userId = this.extractUserId(req);
            if (userId) {
                this.clients.set(userId, ws);
                console.log(`User ${userId} conectado via WebSocket`);

                ws.on('close', () => {
                    this.clients.delete(userId);
                    console.log(`User ${userId} desconectado`);
                });
            }

            ws.send(JSON.stringify({ type: 'connected', message: 'Conectado ao servidor em tempo real' }));
        });
    }

    extractUserId(req) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        return url.searchParams.get('userId');
    }

    sendToUser(userId, data) {
        const ws = this.clients.get(userId);
        if (ws && ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify(data));
        }
    }
}

module.exports = RealtimeServer;