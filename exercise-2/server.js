const http = require('http');
const fs = require('fs');

const PORT = 80;

const server = http.createServer((req, res) => {
    fs.readFile('./users.txt', 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
            return;
        }

        const rows = data.trim().split('\n');
        const headers = rows.shift().split(' | ');

        let html = '<table border="1">\n';
        html += '<tr>\n';
        for (const header of headers) {
            html += `<th>${header}</th>\n`;
        }
        html += '</tr>\n';

        for (const row of rows) {
            const cells = row.split(' | ');
            html += '<tr>\n';
            for (const cell of cells) {
                html += `<td>${cell}</td>\n`;
            }
            html += '</tr>\n';
        }

        html += '</table>';

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
