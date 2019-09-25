'use strict';

const Database = require('../utils/database');

class UserModel extends Database {
    constructor() {
        super('usuarios');
        this.fields = [
            'usuarios.*',
            'emails.email',
            'roles.rol, roles.level',
            'provincias.nombre as provincia',
            'ciudades.nombre as ciudad'
        ];
        this.joins = [
            {
                table: 'emails',
                condition: 'usuarios.email_id = emails.id',
                type: 'LEFT',
            },
            {
                table: 'roles',
                condition: 'usuarios.role_id = roles.id',
                type: 'INNER'
            },
            {
                table: 'usuarios_direcciones',
                condition: 'usuarios.id = usuarios_direcciones.usuario_id',
                type: 'LEFT'
            },
            {
                table: 'direcciones',
                condition: 'usuarios_direcciones.direccion_id = direcciones.id',
                type: 'LEFT'
            },
            {
                table: 'provincias',
                condition: 'direcciones.provincia_id = provincias.provincia_id',
                type: 'LEFT'
            },
            {
                table: 'ciudades',
                condition: 'direcciones.ciudad_id = ciudades.ciudad_id',
                type: 'LEFT'
            }
        ];
    }
    
    getAll() {
        return this.get(null);
    }

    getById(id) {
        return this.get(id);
    }

    getWhere(id = null, conditions = []) {
        return this.get(id, conditions);
    }

    async createUser(data) {
        try {
            const userId = await this.create(data);
            const user = await this.getById(userId);
            return user[0];
        } catch (error) {
            console.log(error);
            return new Error(error);
        }
    }

    async deleteUser(id) {
        return this.delete(id);
    }
    
    updateUser(id, data) {
        return this.update(id, data);
    }
}

module.exports = UserModel;