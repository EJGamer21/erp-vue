'use strict';

// Requirements
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

// App instance
const app = express();

const middlewares = [
    bodyParser.json(),
    bodyParser.urlencoded({extended: false}),
    cors()
];

app.use(middlewares);

app.use('/', routes);

// App started
const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log('Server listening on port: http://localhost:' + port)
});
