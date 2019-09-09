// import { createConnection } from 'mysql';
const pool = require('./pool');

module.exports = class Database {

    constructor(tablename) {
        this.tablename = tablename;
    }

    get(id = null, fields = [], joins = [], conditions = []) {
        this.joins = '';
        this.conditions = conditions.join(' AND ');
        
        if (fields !== null) {
            this.fields = fields.join();
        }

        joins.forEach(join => {
            this.joins += ` ${join.type} JOIN ${join.table} ON ${join.condition}`;
        });

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
            pool.beginTransaction((error) => {
                if (error) reject(error)
    
                pool.query(sql, [data], (error, result) => {
                    if (error) {
                        return pool.rollback(() => {
                            reject(error)
                        });
                    }
                    
                    pool.commit((error) => {
                        if (error) {
                            return pool.rollback(() => {
                                reject(error)
                            })
                        }
    
                        if (result.affectedRows > 0) resolve(result.insertId)
                    })
                })
            })
        })
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

        return new Promise( (resolve, reject) => {
            pool.beginTransaction((error) => {
                if (error) return reject(error)

                pool.query(sql, values, (error, result) => {
                    if (error) {
                        return pool.rollback(() => {
                            reject(error)
                        });
                    }

                    pool.commit((error) => {
                        if (error) {
                            return pool.rollback(() => {
                                reject(error)
                            });
                        }
                        if (result.affectedRows > 0) resolve(result.insertId)
                    })
                })
            })
        })
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

        if (this.joins === '') {
            if (this.fields === '') {
                sql = `SELECT * FROM ${this.tablename};`;
            } else {
                sql = `SELECT ${this.tablename}.id, ${this.fields}`
                    + ` FROM ${this.tablename}`;
            }
        } else {
            if (this.fields === '') {
                sql = `SELECT * FROM ${this.tablename} ${this.joins}`;
            } else {
                sql = `SELECT ${this.tablename}.id, ${this.fields}`
                    + ` FROM ${this.tablename}`
                    + ` ${this.joins}`;
            }
        }
        
        return new Promise( (resolve, reject) => {
            pool.query(sql, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
        });
    }

    _getById(id) {
        if (!id) return false;
        let sql = '';

        if (this.joins === '') {
            if (this.fields === '') {
                sql = `SELECT * FROM ${this.tablename}` 
                    + ` WHERE id = ${id};`;
            } else {
                sql = `SELECT ${this.tablename}.id, ${this.fields}`
                    + ` FROM ${this.tablename}`
                    + ` WHERE id = ${id};`;
            }
        } else {
            if (this.fields === '') {
                sql = `SELECT * FROM ${this.tablename}` 
                    + ` ${this.joins}`
                    + ` WHERE ${this.tablename}.id = ${id};`;
            } else {
                sql = `SELECT ${this.tablename}.id, ${this.fields}`
                    + ` FROM ${this.tablename}`
                    + ` ${this.joins}`
                    + ` WHERE ${this.tablename}.id = ${id};`;
            }
        }

        return new Promise( (resolve, reject) => {
            pool.query(sql, (error, result) => {
                if (error) return reject(new Error(error));
                resolve(result);
            });
        })
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

        return new Promise( (resolve, reject) => {
            pool.query(sql, (error, result) => {
                if (error) return reject(error)
                resolve(result)
            });
        })
    }

    _delete(id) {
        if (this.idToDelete !== id) return false;
        let sql = `DELETE FROM ${this.tablename} WHERE id = ${id} LIMIT 1;`;

        pool.beginTransaction((error) => {
            if (error) throw error;
            
            pool.query(sql, (error, result) => {
                if (error) {
                    return pool.rollback(() => {
                        throw error;
                    });
                }

                pool.commit((error) => {
                    if (error) {
                        return pool.rollback(() => {
                            throw error;
                        });
                    }

                    if (result.affectedRows === 1) return resolve(true)
                    else return reject(false);
                });
            });
        });
    }
}