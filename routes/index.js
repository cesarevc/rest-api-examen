import routerx from 'express-promise-router';
import personRouter from './person';

const router = routerx();

router.use('/person', personRouter);


export default router;
