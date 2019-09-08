'use strict';

const express = require('express');
const router = express.Router();

const userRoute = require('./users');
// const clientRoute = require('./clients');

router.use('/users', userRoute);
// router.use('/clients', clientRoute);

module.exports = router;