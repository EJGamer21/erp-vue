'use strict';

const express = require('express');
const router = express.Router();

const UserController = require('../controllers/usersController');

router.get('/', UserController.getAll);
router.get('/:query', UserController.getWhere);
router.get('/:id', UserController.getById);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.patch('/:id', UserController.toggleUserStatus);
router.delete('/:id', UserController.delete);

module.exports = router;
