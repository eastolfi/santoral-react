const express = require('express');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');

require('custom-env').env();

const app = express();

// const corsOptions = {
//     origin: 'http://localhost:3001'
//     // https://santoral-api.herokuapp.com/
// };
app.use(cors(/*corsOptions*/));

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

app.get('/events', (req, res) => {
    res.send([ { title: 'Cumple 1', content: 'Cumpleaños', date: '2021-04-06' } ]);
});

app.get('/', (req, res) => {
    res.send('API Endpoint available')
});

const port = process.env.API_PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
