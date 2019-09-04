const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const ApiService = require('./server/services/api');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'database'
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('<a href="/users">Users</a>');
});

app.get('/users', (req, res) => {
    let sql = `SELECT * FROM usuarios;`;

    db.connect();

    db.query(sql, (error, result) => {
        if (error) throw error;
        res.send(result);
    });

    db.end();

    // const usersApi = new ApiService('usuarios');
    // const users = usersApi.get();
    // console.log(req);
    // console.log(res);
    // console.log(users);
    // res.send(
    //     [users]
    // );
});

app.get('/users/:id', (req, res) => {
    const usersApi = new ApiService('usuarios');
    const users = usersApi.get();
    console.log(users.get(req.id))
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log('Server listening on port: http://localhost:' + port);