const usersModel = require('../models/usersModel');
const moment = require('moment');
const api = new usersModel();

module.exports = {
    getAll: async (req, res) => {
        try {
            const users = await api.getAll();
            res.json(users);
        } catch (error) {
            res.status(500).send({
                error: true,
                message: 'Error 500: Internal server error',
            });
        }
    },

    getById: async (req, res) => {
        const id = parseInt(req.params.id);
        try {
            const user = await api.getById(id);
            user[0].fecha_creacion = moment(user[0].fecha_creacion).format('YYYY-MM-DD HH:mm:ss');
            user[0].fecha_modificado = moment(user[0].fecha_modificado).format('YYYY-MM-DD HH:mm:ss');
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                error: true,
                message: 'Error 500: Internal server error',
            });
        }
    },

    create: async (req, res) => {
        try {
            console.log(req);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                error: true,
                message: 'Error 500: Internal server error',
            });
        }     
    },

    update: async (req, res) => {
        console.log(req);
    }
}