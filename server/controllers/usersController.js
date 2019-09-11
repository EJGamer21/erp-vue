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
            res.status(500).json({
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
            res.status(500).json({
                error: true,
                message: 'Error 500: Internal server error',
            });
        }
    },

    create: async (req, res) => {
        const newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            sexo: req.body.sexo,
            username: req.body.username,
            password: req.body.password,
            fecha_creacion: moment().format('YYYY-MM-DD HH:mm:ss'),
            role_id: parseInt(req.body.role_id),
            image: req.body.image
        }

        if (req.body.firstname === ''
            || req.body.lastname === ''
            || req.body.username === ''
            || req.body.password === ''
            || req.body.sexo === ''
        ) {
            res.status(400).json({
                error: true,
                status: 'error',
                message: 'Campos no opcionales son requeridos.',
            });
            return;
        }

        try {
            const exisitingUser = await api.getWhere(null, [`username = '${newUser.username}'`]);

            if (exisitingUser.length === 0) {
                /**
                 * TODO:
                 * insert new email or use an existing one
                 * 
                 * insert new direction or use an existing one
                 */

                const user = await api.createUser(newUser);
                res.json({
                    error: false,
                    status: 'success',
                    message: 'Usuario creado exitosamente.',
                    user,
                    user_id: user.id,
                });
            } else {
                res.json({
                    error: false,
                    status: 'error',
                    message: 'Usuario ya existente.',
                });
            }
        } catch(error) {
            console.log(error);
            res.status(500).json({
                error: true,
                status: 'error',
                message: 'Error 500: Internal server error.',
            });
        }
    },

    update: async (req, res) => {
        console.log(req);
    },

    delete: async (req, res) => {
        const id = parseInt(req.params.id);
        try {
            const deleted = await api.delete(id);
            console.log(deleted);
            if (deleted) {
                res.json({
                    error: false,
                    status: 'success',
                    message: 'Usuario eliminado exitosamente.',
                    user_id: deleted,
                });
            } else {
                res.json({
                    error: true,
                    status: 'error',
                    message: 'No se pudo eliminar el usuario.',
                    user_id: deleted,
                });
            }
        } catch (error) {
            console.log(error);
            res.json({
                error: true,
                status: 'error',
                message: 'Error 500: Internal server error.',
            });
        }
        
    }
}