'use strict'

const routerx = require('express-promise-router');

const personController = require('../controllers/personController');


var router = routerx();

/**
 * 'add' create a person
 * 'update' edit a specific person
 * 'list' get all registered persons in the database
 * 'query' retrieves a specific person found by id
 * 'delete' remove from database a specific person 
 */

router.post('/add', personController.add);
router.put('/update', personController.update);
router.get('/list', personController.list);
router.get('/query/:id', personController.query);
// router.delete('/remove/:id', personController.remove);


module.exports = router;
