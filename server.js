const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT,'192.168.21.248', () => {
    console.log('Server is running on port: '+PORT);
});