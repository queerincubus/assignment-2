const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const basePath = path.join(__dirname);

app.use(express.static(basePath));

app.get('/', (req, res) => {
    res.sendFile(path.join(basePath, 'index.html'));
});

app.get('/api', (req, res) => {
    const data = fs.readFileSync(path.join(basePath, 'db.json'));
    res.json(JSON.parse(data));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(basePath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Live URL: hhttps://assignment-2-u9ke.onrender.com/
