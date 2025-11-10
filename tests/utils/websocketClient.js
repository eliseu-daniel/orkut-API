const WebSocket = require('ws');

class WSClient {
    constructor(userId) {
        this.userId = userId;
        this.messages = [];
        this.ws = new WebSocket(`ws://localhost:3000?userId=${userId}`);
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.ws.on('open', () => resolve());
            this.ws.on('error', reject);
            this.ws.on('message', (data) => {
                this.messages.push(JSON.parse(data));
            });
        });
    }

    getMessages() {
        return this.messages;
    }

    close() {
        this.ws.close();
    }
}

module.exports = WSClient;