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

            if (!userId) {
                console.warn('Conexão WebSocket sem ID de usuário.');
                ws.close();
                return;
            }

            if (!this.clients.has(userId)) {
                this.clients.set(userId, []);
            }

            this.clients.get(userId).push(ws);

            console.log(`Usuário conectado: ${userId}, total de conexões: ${this.clients.get(userId).length}`);

            ws.send(JSON.stringify({
                type: 'connected',
                message: 'Conectado ao servidor em tempo real',
                userId
            }));

            ws.on('close', () => {
                const list = this.clients.get(userId) || [];

                const updatedList = list.filter(clientSocket => clientSocket !== ws);

                if (updatedList.length === 0) {
                    this.clients.delete(userId);
                    console.log(`Usuário ${userId} desconectou completamente.`);
                } else {
                    this.clients.set(userId, updatedList);
                    console.log(
                        `Usuário ${userId} removeu uma conexão. Restam ${updatedList.length}.`
                    );
                }
            });

            ws.on('error', (err) => {
                console.error('Erro no WebSocket:', err);
            });
        });
    }

    sendToUser(userId, message) {
        const sockets = this.clients.get(userId);

        if (!sockets || sockets.length === 0) {
            console.warn(`Usuário ${userId} não está conectado.`);
            return;
        }

        sockets.forEach(ws => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(message));
            }
        });
    }
}

module.exports = RealtimeServer;
