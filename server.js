const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8765;
const MIME = { '.html': 'text/html', '.js': 'application/javascript', '.wasm': 'application/wasm' };

http.createServer((req, res) => {
    const file = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    fs.readFile(file, (err, data) => {
        if (err) return res.writeHead(404).end('Not Found');
        res.setHeader('Content-Type', MIME[path.extname(file)] || 'text/plain');
        res.writeHead(200).end(data);
    });
}).listen(PORT, () => console.log(`\n  http://localhost:${PORT}\n`));
