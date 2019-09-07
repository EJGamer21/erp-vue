// const usersModel = require('../models/usersModel')
// const api = new usersModel()

module.exports = {
    // getAll: async (req, res) => {
    //     try {
    //         const users = await api.getAll()
    //         res.status(200).send(users)
    //     } catch (error) {
    //         res.status(500).send({
    //             error: true,
    //             message: 'Error 500: Internal server error',
    //             error: error
    //         })
    //     }
    // },

    get: (req, res) => {
        res.send('It\'s working!')
    }
}