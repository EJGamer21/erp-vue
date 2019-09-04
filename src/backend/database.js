const mysql = require('mysql');

class Database {

    constructor(tablename) {
        this.db = mysql.createConnection({
            host: 'localhost',
            user: 'enger',
            password: 'Dr@g0nfly',
            database: 'fractal'
        });

        this.tablename = tablename;
    }

    get(id = null, fields = [], conditions = []) {
        this.fields = fields.join();
        this.conditions = conditions.join(' AND ');

        if (this.conditions) return this._getWhere();
        else {
            if (!id) return this._getAll();
            else if (id) return this._getById(id);
            else return false;
        }
    }

    create(data) {
        if (!data) return false;
        let sql = `INSERT INTO ${this.tablename} SET ?`;

        this.db.beginTransaction((error) => {
            if (error) throw error;

            this.db.query(sql, [data], (error, result) => {
                if (error) {
                    return this.db.rollback(() => {
                        throw error;
                    });
                }
                
                this.db.commit((error) => {
                    if (error) {
                        return this.db.rollback(() => {
                            throw error;
                        });
                    }

                    if (result.affectedRows > 0) return result.insertId;
                });
            });
        });        
    }

    update(id, data = {}) {
        if (!data) return false;
        if ((typeof id) !== 'number') return false;

        let values  = Object.values(data);
        let fields = Object.keys(data).reduce((accumulator, value, index) => {
            if (index !== 0) {
                accumulator = `${accumulator}, `;
            }
            accumulator = `${accumulator}` + ` ${value} = ?`;
            return accumulator;
        }, '');
        
        let sql = `UPDATE ${this.tablename} SET ${fields} WHERE id = ${id};`;

        this.db.beginTransaction((error) => {
            if (error) throw error;

            this.db.query(sql, values, (error, result) => {
                if (error) {
                    return this.db.rollback(() => {
                        throw error;
                    });
                }

                this.db.commit((error) => {
                    if (error) {
                        return this.db.rollback(() => {
                            throw error;
                        });
                    }
                    if (result.affectedRows > 0) return result.insertId;
                });
            });
        });
    }

    delete(id = null) {
        if (id && id > 0) {
            this.idToDelete = id
            return this._delete(id);
        } else {
            return false;
        }
    }

    _getAll() {
        let sql = `SELECT * FROM ${this.tablename};`;

        this.db.query(sql, (error, rows) => {
            if (error) throw error;
            return console.log(rows);
        });
    }

    _getById(id) {
        if (!id) return false;
        let sql = '';

        if (this.fields === '') {
            sql = `SELECT * FROM ${this.tablename}` 
                + `WHERE id = ${id};`;
        } else {
            sql = `SELECT ${this.tablename}.id, ${this.fields}`
                + ` FROM ${this.tablename}`
                + ` WHERE id = ${id};`;
        }
        this.db.query(sql, (error, rows) => {
            if (error) throw error;

            return console.log(rows);
        });
    }

    _getWhere() {
        if (this.conditions === '') return false;
        let sql = '';
        
        if (this.fields === '') {
            sql = `SELECT * FROM ${this.tablename} WHERE ${this.conditions};`;
        } else {
            sql = `SELECT ${this.tablename}.id, ${this.fields}`
                + ` FROM ${this.tablename}`
                + ` WHERE ${this.conditions};`;
        }

        this.db.query(sql, (error, rows) => {
            if (error) throw error;

            return (rows);
        });
    }

    _delete(id) {
        if (this.idToDelete !== id) return false;
        let sql = `DELETE FROM ${this.tablename} WHERE id = ${id} LIMIT 1;`;
        
        this.db.beginTransaction((error) => {
            if (error) throw error;
            
            this.db.query(sql, (error, result) => {
                if (error) {
                    return this.db.rollback(() => {
                        throw error;
                    });
                }

                this.db.commit((error) => {
                    if (error) {
                        return this.db.rollback(() => {
                            throw error;
                        });
                    }

                    console.log('Deleted: ' + id);
                    if (result.affectedRows === 1) return true;
                    else return false;
                });
            });
        });
    }
}
