'use strict';

const express = require('express');
const router = express.Router();

const DirectionsController = require('../controllers/directionsController');

router.get('/', DirectionsController.getAllCities);

module.exports = router;