// Requirements
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

// App instance
const app = express();

app.use(bodyParser.json());

app.use('/', routes);

// App started
const port = process.env.PORT || 8081
app.listen(port, () => {
    console.log('Server listening on port: http://localhost:' + port)
});