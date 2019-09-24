'use strict';

const express = require('express');
const router = express.Router();

const DirectionController = require('../controllers/directionsController');

router.get('/', DirectionController.getAll);
router.get('/:id', DirectionController.getById);

module.exports = router;
