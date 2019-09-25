'use strict';

const Database = require('../utils/database');

class ProvinceModel extends Database {
    constructor() {
        super('provincias');
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

module.exports = ProvinceModel;