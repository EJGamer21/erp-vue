'use strict';

const { pool, connection } = require('./connection');
// const pool = require('./pool');

class Database {

    constructor(tablename) {
        this.tablename = tablename;
    }

    get(id = null, conditions = []) {
        this.field = this.fields.join(', ');
        this.conditions = conditions.join(' AND ');

        this.join = this.joins.reduce( (accumulator, value) => {
            accumulator += `${value.type} JOIN ${value.table} ON ${value.condition} `;
            return accumulator;
        }, '');

        if (this.conditions) {
            return this._getWhere();
        } else {
            if (!id) {
                return this._getAll();
            } else if (id) {
                return this._getById(id);
            } else {
                return false;
            }
        }
    }

    create(data) {
        if (!data) return false;
        let sql = `INSERT INTO ${this.tablename} SET ?`;

        return new Promise( (resolve, reject) => {
            connection.beginTransaction((error) => {
                if (error) reject(new Error(error));

                connection.query(sql, [data], (error, result) => {
                    if (error) {
                        return connection.rollback(() => {
                            reject(new Error(error));
                        });
                    }
                    
                    connection.commit((error) => {
                        if (error) {
                            return connection.rollback(() => {
                                reject(new Error(error));
                            });
                        }
    
                        if (result.affectedRows > 0) return resolve(result.insertId);
                    });
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
            accumulator = `${accumulator}` + `${value} = ?`;
            return accumulator;
        }, '');
        
        let sql = `UPDATE ${this.tablename} SET ${fields} WHERE id = ${id};`;

        return new Promise( (resolve, reject) => {
            connection.beginTransaction((error) => {
                if (error) return reject(new Error(error));

                connection.query(sql, values, (error, result) => {
                    if (error) {
                        return connection.rollback(() => {
                            reject(new Error(error));
                        });
                    }

                    connection.commit((error) => {
                        if (error) {
                            return connection.rollback(() => {
                                reject(new Error(error));
                            });
                        }
                        if (result.affectedRows > 0) return resolve(id);
                    });
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
        let sql = '';
        
        if (this.join === '') {
            if (this.field === '') {
                sql = `SELECT * FROM ${this.tablename};`;
            } else {
                sql = `SELECT ${this.tablename}.id, ${this.field}`
                + ` FROM ${this.tablename}`;
            }
        } else {
            if (this.field === '') {
                sql = `SELECT * FROM ${this.tablename} ${this.join}`;
            } else {
                sql = `SELECT ${this.tablename}.id, ${this.field}`
                + ` FROM ${this.tablename}`
                + ` ${this.join}`;
            }
        }

        return new Promise( (resolve, reject) => {
            pool.query(sql, (error, result) => {
                if (error) return reject(new Error(error));
                return resolve(result);
            });
        });
    }

    _getById(id) {
        if (!id) return false;
        let sql = '';
        
        if (this.join === '') {
            if (this.field === '') {
                sql = `SELECT * FROM ${this.tablename}` 
                + ` WHERE id = ${id};`;
            } 
            
            else {
                sql = `SELECT ${this.tablename}.id, ${this.field}`
                + ` FROM ${this.tablename}`
                + ` WHERE id = ${id};`;
            }
        } 
        
        else {
            if (this.field === '') {
                sql = `SELECT * FROM ${this.tablename}` 
                    + ` ${this.join}`
                    + ` WHERE ${this.tablename}.id = ${id};`;
            } 
            
            else {
                sql = `SELECT ${this.tablename}.id, ${this.field}`
                    + ` FROM ${this.tablename}`
                    + ` ${this.join}`
                    + ` WHERE ${this.tablename}.id = ${id};`;
            }
        }

        return new Promise( (resolve, reject) => {
            pool.query(sql, (error, result) => {
                if (error) return reject(new Error(error));
                return resolve(result);
            });
        })
    }

    _getWhere() {
        if (this.conditions === '') return false;
        let sql = '';
        
        if (this.join === '') {
            if (this.field === '') {
                sql = `SELECT * FROM ${this.tablename} WHERE ${this.conditions};`;
            } 
            
            else {
                sql = `SELECT ${this.tablename}.id, ${this.field}`
                    + ` FROM ${this.tablename}`
                    + ` WHERE ${this.conditions};`;
            }
        }

        else {
            if (this.field === '') {
                sql = `SELECT * FROM ${this.tablename}` 
                    + ` ${this.join}`
                    + ` WHERE ${this.conditions};`;
            } 
            
            else {
                sql = `SELECT ${this.tablename}.id, ${this.field}`
                    + ` FROM ${this.tablename}`
                    + ` ${this.join}`
                    + ` WHERE ${this.conditions};`;
            }
        }

        return new Promise( (resolve, reject) => {
            pool.query(sql, (error, result) => {
                if (error) return reject(new Error(error));
                return resolve(result);
            });
        });
    }

    _delete(id) {
        if (this.idToDelete !== id) return false;
        let sql = `DELETE FROM ${this.tablename} WHERE id = ? LIMIT 1;`;
        
        return new Promise( (resolve, reject) => {
            connection.beginTransaction((error) => {
                if (error) return reject(new Error(error));

                connection.query(sql, [id], (error, result) => {
                    if (error) {
                        return connection.rollback(() => {
                            reject(new Error(error));
                        });
                    }

                    connection.commit((error) => {
                        if (error) {
                            return connection.rollback(() => {
                                reject(new Error(error));
                            });
                        }
                        if (result.affectedRows === 1) return resolve(true);
                        else return reject(false);
                    });
                });
            });
        });
    }
}

module.exports = Database;