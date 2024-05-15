const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// endpoint oi
app.get('/oi', (req, res) => {
    res.send('Oi!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});