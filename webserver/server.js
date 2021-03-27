const express = require('express');
const cors = require('cors');
const app = express();
const port = 9000;

app.get('/', (req, res) => {
    res.send('Hello world!');
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})