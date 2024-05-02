const express = require('express');
const app = express();

app.get('/static', (req, res) => {
    res.send("<h1><strong>Hello</strong></h1><p>Octagon NodeJS Test</p>");
});

app.get('/dynamic', (req, res) => {
    const variables = ['a', 'b', 'c'];

    for (let variable of variables) {
        if (req.query[variable] == null || isNaN(parseFloat(req.query[variable]))) {
            return res.send("<h1>Error</h1>");
        }
    }

    const result = (parseFloat(req.query.a) * parseFloat(req.query.b) * parseFloat(req.query.c)) / 3;
    res.send(`<h1><strong>Calculated</strong></h1><p>${result}</p>`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});