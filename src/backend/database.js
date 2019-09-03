import { createConnection } from 'mysql';

export class Database {

    constructor(tablename) {
        this.db = createConnection({
            host: 'localhost',
            user: 'username',
            password: 'password',
            database: 'database'
        });

        this.tablename = tablename;
    }

    get() {
        let sql = `SELECT * FROM ${this.tablename}`;
        this.db.query(sql, (err, rows) => {
            if(err) throw err;

            console.log('Data:\n');
            console.log(rows);
        });
    }
}

