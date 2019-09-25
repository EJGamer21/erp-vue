'use strict';

const Database = require('../utils/database');

class RoleModel extends Database {
    constructor() {
        super('roles');
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

module.exports = RoleModel;