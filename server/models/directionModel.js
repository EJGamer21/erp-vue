'use strict';

const Database = require('../utils/database');

class DirectionModel extends Database {
    constructor() {
        super('direcciones');
        this.fields = [
            'direcciones.*',
            'provincias.nombre as provincias',
            'ciudades.nombre as ciudades',
        ];
        this.joins = [
            {
                table: 'provincias',
                condition: 'direcciones.provincia_id = provincias.provincia_id',
                type: 'INNER'
            },
            {
                table: 'ciudades',
                condition: 'direcciones.ciudad_id = ciudades.ciudad_id',
                type: 'INNER'
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
}

module.exports = DirectionModel;