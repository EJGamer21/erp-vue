'use strict';

const directionModel = require('../models/directionModel');
const provinceModel = require('../models/provinceModel');
const cityModel = require('../models/cityModel');
const direction = new directionModel();
const province = new provinceModel();
const city = new cityModel();

module.exports = {
  getAll: async (req, res) => {
    try {
      const directions = await direction.getAll();
      res.json(directions);
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
          const user = await direction.getById(id);
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
  getAllProvinces: async (req, res) => {
      try {
          const provinces = await province.getAll();
          res.json(provinces);
      } catch(error) {
          console.log(error);
          res.status(500).json({
              error: true,
              message: 'Error 500: Internal server error'
          });
      }
  },

  getAllCities: async (req, res) => {
    try {
        const cities = await city.getAll();
        res.json(cities);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: 'Error 500: Internal server error'
        });
    }
}
}