import routerx from 'express-promise-router';
import personController from '../controllers/PersonController';


const router = routerx();
/**
 * 'add' create a person
 * 'update' edit a specific person
 * 'list' get all registered persons in the database
 * 'query' retrieves a specific person found by id
 * 'delete' remove from database a specific person 
 */

router.post('/add', personController.add);
router.put('/update', auth.verifyUser, personController.update);
router.get('/list', auth.verifyUser, personController.list);
router.get('/query/:id', auth.verifyUser, personController.query);
router.delete('/remove/:id', auth.verifyUser, personController.remove);
