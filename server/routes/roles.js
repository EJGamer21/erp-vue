'use strict';

const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllRoles);

module.exports = router;