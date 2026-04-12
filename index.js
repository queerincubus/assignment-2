const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const basePath = path.join(__dirname, 'assignment-2');

const server = http.createServer((req, res) => {

    if (req.url === '/api') {
        const filePath = path.join(basePath, 'db.json');

        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Failed to load data' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });

        return;
    }

    let filePath = path.join(basePath, req.url === '/' ? 'index.html' : req.url);

    const ext = path.extname(filePath);
    let contentType = 'text/html';

    if (ext === '.css') contentType = 'text/css';
    else if (ext === '.js') contentType = 'application/javascript';
    else if (ext === '.json') contentType = 'application/json';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            fs.readFile(path.join(basePath, 'index.html'), (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Server Error');
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            });
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Live URL: https://assignment-2-u9ke.onrender.com
