const express = require('express');
const app = express();

app.get('/static', (req, res) => {
    res.send("<h1><strong>Hello</strong></h1><p>Octagon NodeJS Test</p>");
});

app.get('/dynamic', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    const c = parseFloat(req.query.c);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        res.send("<h1>Error</h1>");
    } else {
        const result = (a * b * c) / 3;
        res.send(`<h1><strong>Calculated</strong></h1><p>${result}</p>`);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


