const Database = require('../utils/database')

module.exports = class UserModel extends Database {
    constructor() {
        super('usuarios')
    }
    
    getAll() {
        return (
            this.get()
                .then(response => response)
                .catch(error => error)
        )
    }
}