import { Router } from 'express';

import EventRoutes, { EVENTS_ENDPOINT } from './events';
import PushNotificationsRoutes, { PUSH_NOTIFICATIONS_ENDPOINT } from './push-notifications';

const router = Router();

router.get('/', (_req, res) => {
    res.send('API Endpoint available')
});

router.use(EVENTS_ENDPOINT, EventRoutes);
router.use(PUSH_NOTIFICATIONS_ENDPOINT, PushNotificationsRoutes);

export default router;
