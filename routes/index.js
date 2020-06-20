'use strict'

const routerx = require('express-promise-router');
const personRouter = require('./person');

var router = routerx();

router.use('/person', personRouter);

module.exports = router;