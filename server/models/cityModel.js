'use strict';

const Database = require('../utils/database');

class CityModel extends Database {
    constructor() {
        super('ciudades');
        this.fields = [];
        this.joins = [];
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

module.exports = CityModel;