'use strict';

const Database = require('../utils/database');

class UserModel extends Database {
    constructor() {
        super('usuarios');
        this.fields = [
            'usuarios.*',
            ' emails.email',
            ' roles.rol, roles.level',
            ' provincias.nombre as provincia',
            ' ciudades.nombre as ciudad'
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
        return this.get(null, this.fields, this.joins);
    }

    getById(id) {
        return this.get(id, this.fields, this.joins);
    }
}

module.exports = UserModel;