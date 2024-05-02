const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'index.html');

    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
            return;
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
