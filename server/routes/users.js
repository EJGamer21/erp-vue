modules.exports = function(app){
    app.get('/users', (req, res) => {
        let sql = `SELECT * FROM usuarios;`;
        db.query(sql, (error, result) => {
            if (error) throw error;
            users = (result[0]);
            res.send('User: ' + `<a href='/users/${users.id}'>${users.firstname} ${users.lastname}</a>`);
        });
    });
}