// Requirements
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');

// App instance

app.use(bodyParser.json());

app.use('/', routes);

// App started
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log('Server listening on port: http://localhost:' + port)
});