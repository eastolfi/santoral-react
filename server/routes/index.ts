import { Router } from 'express';

import EventRoutes, { EVENTS_ENDPOINT } from './events';

const router = Router();

router.get('/', (_req, res) => {
    res.send('API Endpoint available')
});

router.use(EVENTS_ENDPOINT, EventRoutes);

export default router;
