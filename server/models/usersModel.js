const Database = require('../utils/database')

class UserModel extends Database {
    constructor() {
        super('usuarios');
    }
    
    getAll() {
        return this.get();
    }

    getById(id) {
        return this.get(id);
    }
}

module.exports = UserModel;