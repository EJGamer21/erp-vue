const express = require('express');
const bodyParser = require('body-parser');
const usersModel = require('./models/users');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('<a href="/users">Users</a>');
});

app.get('/users', (req, res) => {
    let sql = `SELECT * FROM usuarios;`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        users = (result[0]);
        res.send('User: ' + `<pre>${users}</a>`);
    });
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log('Server listening on port: http://localhost:' + port);