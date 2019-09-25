'use strict';

const express = require('express');
const router = express.Router();

const userRoute = require('./users');
const directionRoute = require('./directions');
const provinceRoute = require('./provinces');
const cityRoute = require('./cities');
const roleRoute = require('./roles');
// const clientRoute = require('./clients');

router.use('/users', userRoute);
router.use('/directions', directionRoute);
router.use('/provinces', provinceRoute);
router.use('/cities', cityRoute);
router.use('/roles', roleRoute);
// router.use('/clients', clientRoute);

module.exports = router;