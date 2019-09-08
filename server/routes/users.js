'use strict';

const express = require('express');
const router = express.Router();

const UserController = require('../controllers/usersController');

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.post('/', UserController.create);
router.put('/:id', UserController.update);

module.exports = router;
