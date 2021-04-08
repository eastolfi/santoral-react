import { Router } from 'express';

import EventRoutes from './events';

const router = Router();

router.get('/', (_req, res) => {
    res.send('API Endpoint available')
});

router.use('/events', EventRoutes);

export default router;
