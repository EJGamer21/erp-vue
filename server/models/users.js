const Db = require('../services/database');
const api = new Db('usuarios');

module.exports = class UserModel {
    
    get(id = null, fields = [], conditions = []) {
        this.fields = fields.join();
        this.conditions = conditions.join(' AND ');

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

    _getAll() {
        let sql = `SELECT * FROM usuarios;`;

        pool.query(sql, (error, result) => {
            if (error) throw error;
            return result;
        });
    }

    _getById(id) {
        if (!id) return false;
        let sql = '';

        if (this.fields === '') {
            sql = `SELECT * FROM usuarios` 
                + ` WHERE id = ${id};`;
        } else {
            sql = `SELECT usuarios.id, ${this.fields}`
                + ` FROM usuarios`
                + ` WHERE id = ${id};`;
        }

        pool.query(sql, (error, result) => {
            if (error) throw error;

            return result;
        });
    }

    _getWhere() {
        if (this.conditions === '') return false;
        let sql = '';
        
        if (this.fields === '') {
            sql = `SELECT * FROM usuarios WHERE ${this.conditions};`;
        } else {
            sql = `SELECT usuarios.id, ${this.fields}`
                + ` FROM usuarios`
                + ` WHERE ${this.conditions};`;
        }
        
        pool.query(sql, (error, result) => {
            if (error) throw error;

            return (result);
        });
    }
}