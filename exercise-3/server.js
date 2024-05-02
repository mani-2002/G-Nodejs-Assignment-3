const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    let filePath = '';

    if (req.url === '/home') {
        filePath = 'home.html';
    } else if (req.url === '/about') {
        filePath = 'about.html';
    } else if (req.url === '/contact') {
        filePath = 'contact.html';
    } else {
        filePath = '404.html';
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
            return;
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

const PORT = 80;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
