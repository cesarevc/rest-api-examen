'use strict'

const routerx = require('express-promise-router');

const personController = require('../controllers/personController');


var router = routerx();

/**
 * 'add' create a person
 * 'update' edit a specific person
 * 'list' get all registered persons in the database
 * 'query' retrieves a specific person found by id
 * 'remove' logical delete a specific person
 * 'delete' remove from database a specific person 
 */

router.post('/add', personController.add);
router.put('/update/:id', personController.update);
router.get('/list', personController.list);
router.get('/query/:id', personController.query);
router.put('/remove/:id', personController.remove)
router.delete('/delete/:id', personController.delete);


module.exports = router;
