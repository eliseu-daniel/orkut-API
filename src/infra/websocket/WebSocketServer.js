const WebSocket = require('ws');
const url = require('url');

class RealtimeServer {
    constructor(server) {
        this.wss = new WebSocket.Server({ server });
        this.clients = new Map();

        this.wss.on('connection', (ws, req) => {
            const parameters = url.parse(req.url, true);
            const pathParts = parameters.pathname.split('/');
            const userId = pathParts[pathParts.length - 1];

            if (userId) {
                this.clients.set(userId, ws);

                ws.send(JSON.stringify({ type: 'connected', message: 'Conectado ao servidor em tempo real' }));

                ws.on('close', () => {
                    this.clients.delete(userId);
                    console.log(`Usuário desconectado: ${userId}`);
                });
            } else {
                console.warn('Conexão WebSocket sem ID de usuário.');
            }
        });
    }

    sendToUser(userId, message) {
        const ws = this.clients.get(userId);
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));

        } else {
            console.warn(`Usuário ${userId} não está conectado.`);
        }
    }
}

module.exports = RealtimeServer;