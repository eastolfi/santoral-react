import { Router } from 'express';
import { PushSubscription } from 'web-push';
import { PushSubscriptionsService } from '../services/push-subscriptions.service';

export const PUSH_NOTIFICATIONS_ENDPOINT = '/push';

const router = Router();

router.get('/', (req, res) => {
    res.send('Push Notifications Endpoint');
});

router.post('/subscription', (req, res) => {
    const susbscriptionId = PushSubscriptionsService.instance.addSubscription(req.body as PushSubscription);

    res.status(200).json({ id: susbscriptionId });
});

export default router;
