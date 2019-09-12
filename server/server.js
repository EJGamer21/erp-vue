'use strict';

// Requirements
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

// App instance
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/', routes);

// App started
const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log('Server listening on port: http://localhost:' + port)
});
