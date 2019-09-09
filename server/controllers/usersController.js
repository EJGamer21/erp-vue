'use strict';

const usersModel = require('../models/usersModel');
const moment = require('moment');
const api = new usersModel();

module.exports = {
    getAll: async (req, res) => {
        try {
            const users = await api.getAll();
            users.forEach(user => {
                if (moment(user.fecha_creacion).isValid()) {
                    user.fecha_creacion = moment(user.fecha_creacion).format('YYYY-MM-DD HH:mm:ss');
                } else {
                    user.fecha_creacion = '';
                }

                if (moment(user.fecha_modificado).isValid()) {
                    user.fecha_modificado = moment(user.fecha_modificado).format('YYYY-MM-DD HH:mm:ss');
                } else {
                    user.fecha_modificado = '';
                }
                
            });
            res.json(users);
        } catch (error) {
            console.log(error);
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
            if (moment(user[0].fecha_creacion).isValid()) {
                user[0].fecha_creacion = moment(user[0].fecha_creacion).format('YYYY-MM-DD HH:mm:ss');
            } else {
                user[0].fecha_creacion = '';
            }

            if (moment(user[0].fecha_modificado).isValid()) {
                user[0].fecha_modificado = moment(user[0].fecha_modificado).format('YYYY-MM-DD HH:mm:ss');
            } else {
                user[0].fecha_modificado = '';
            }
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