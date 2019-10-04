'use strict';

const userModel = require('../models/userModel');
const roleModel = require('../models/roleModel');
const formidable = require('formidable');
const moment = require('moment');
const config = require('../configs/global_config');
const usersModel = new userModel();
const rolesModel = new roleModel();

module.exports = {
  getAll: async (req, res) => {
    try {
      const users = await usersModel.getAll();
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
      return res.json({users});
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
      const user = await usersModel.getById(id);
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
      return res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: true,
        message: 'Error 500: Internal server error',
      });
    }
  },

  getWhere: async (req, res) => {
    console.log(req.body);
    if (req.params.query !== '') {
      const query = req.params.query;
      const fields = [
        'usuarios.id',
        'usuarios.firstname',
        'usuarios.lastname',
        'usuarios.username',
        'usuarios.sexo',
        'usuarios.fecha_creacion',
        'usuarios.fecha_modificado',
        'provincias.nombre',
        'ciudades.nombre',
        'email',
        'rol'
      ];

      const condition = fields.reduce((accumulator, value, index) => {
        if (index === 0) {
          accumulator = `${value} LIKE '%${query}%'`;
        }
        accumulator = `${accumulator} `  + `OR ${value} LIKE '%${query}%'`;

        return accumulator;
      }, '');

      try {
        let users = await usersModel.getWhere(null, [condition]);
        // const result = users.filter(user => {
        //   return Object.keys(user).forEach(key => {
        //     key === query;
        //   });
        // })

        console.log(users);

        if (users.length === 0) {
          users = null;
        } else {
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
        }
        
        return res.json({
          error: false,
          status: 'success',  
          users
        })
      } catch (error) {
        console.log(error);
      }
    } else {
      return this.getAll();
    }
  },

  create: async (req, res) => {
    const form = new formidable.IncomingForm();

    let newUser = {
      firstname: null,
      lastname: null,
      username: null,
      password: null,
      sexo: null,
      role_id: null,
      image: null,
      fecha_creacion: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    
    form.on('field', (field, value) => {
      if(value == 'null') {
        value = null;
      } else {
        parseInt(value);
      }

      switch (field) {
        case 'firstname':
          newUser[field] = value;
          break;
        case 'lastname':
          newUser[field] = value;
          break;
        case 'username':
          newUser[field] = value;
          break;
        case 'password':
          newUser[field] = value;
          break;
        case 'role_id':
          if(value){
            newUser[field] = parseInt(value);
          }
          break;
        case 'sexo':
          newUser[field] = value;
          break;
        case 'image':
          newUser[field] = value;
          break;
      
        default:
          break;
      }
    });

    /**
     * TODO:
     * insert new email or use an existing one
     * 
     * insert new direction or use an existing one
     */
    form
      .on('fileBegin', (field, file) => {
        file.path = `${config._dirname}/client/static/users/${file.name}`;
        newUser[field] = file.path;
      })
      .on('end', async () => {
        try {
          const exisitingUser = await usersModel.getWhere(null, [`username = '${newUser.username}'`]);

          if (exisitingUser.length === 0) {
            const userId = await usersModel.create(newUser);
            const createdUser = await usersModel.getById(userId);
            res.json({
              error: false,
              status: 'success',
              message: 'Usuario creado exitosamente.',
              createdUser,
              user_id: createdUser.id,
            });
          } else {
            res.json({
              error: true,
              status: 'error',
              message: 'Usuario ya existente.',
            });
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({
            error: true,
            status: 'error',
            message: 'Error 500: Internal server error.',
          });
          return new Error(error);
        }
      })
      .parse(req);
  },

  update: async (req, res) => {
      const id = parseInt(req.params.id);
      try {
        const user = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          sexo: req.body.sexo,
          username: req.body.username,
          password: req.body.password,
          fecha_modificado: moment().format('YYYY-MM-DD HH:mm:ss'),
          role_id: parseInt(req.body.role_id),
          image: req.body.image
        }
        const response = await usersModel.updateUser(id, user);
        console.log('controller');
        console.log(response);
      } catch (error) {
        console.log(error);
        return new Error(error);
      }
  },

  delete: async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const deleted = await usersModel.delete(id);
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
  },

  toggleUserStatus: async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const status = { activo: req.body.activo }
      const userId = await usersModel.updateUser(id, status);
      const updatedUser = await usersModel.getById(userId);
      if (moment(updatedUser[0].fecha_creacion).isValid()) {
        updatedUser[0].fecha_creacion = moment(updatedUser[0].fecha_creacion).format('YYYY-MM-DD HH:mm:ss');
      } else {
        updatedUser[0].fecha_creacion = '';
      }

      if (moment(updatedUser[0].fecha_modificado).isValid()) {
        updatedUser[0].fecha_modificado = moment(updatedUser[0].fecha_modificado).format('YYYY-MM-DD HH:mm:ss');
      } else {
        updatedUser[0].fecha_modificado = '';
      }

      res.json({
        error: false,
        status: 'success',
        message: 'Usuario actualizado exitosamente.',
        user: updatedUser[0],
      })
    } catch (error) {
      console.log(error);
      return new Error(error);
    }
  },

  getAllRoles: async (req, res) => {
    try {
      const roles = await rolesModel.getAll();
      res.json(roles);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: true,
        message: 'Error 500: Internal server error',
      });
    }        
  }
}