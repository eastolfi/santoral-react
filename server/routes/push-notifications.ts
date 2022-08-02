import { Router } from 'express';
import { createHash } from 'crypto';
import { sendNotification, setVapidDetails, PushSubscription } from 'web-push';

export const PUSH_NOTIFICATIONS_ENDPOINT = '/push';

// console.log(process.env)
setVapidDetails(
    `mailto:${process.env.VAPID_CONTACT}`,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

const router = Router();

router.get('/', (req, res) => {
    res.send('Push Notifications Endpoint');
});

const subscriptions: { [id: string]: PushSubscription } = {};
router.post('/subscription', (req, res) => {
    const subscriptionRequest: PushSubscription = req.body;
    const susbscriptionId = createHexHash(JSON.stringify(subscriptionRequest));
    subscriptions[susbscriptionId] = subscriptionRequest;

    res.status(201).json({ id: susbscriptionId });
});

router.get('/subscription/:id', (req, res) => {
    const subscriptionId = req.params.id;
    const pushSubscription = subscriptions[subscriptionId];

    sendNotification(
        pushSubscription,
        JSON.stringify({
            title: 'New Product Available ',
            text: 'HEY! Take a look at this brand new t-shirt!',
            image: '/images/jason-leung-HM6TMmevbZQ-unsplash.jpg',
            tag: 'new-product',
            url: '/new-product-jason-leung-HM6TMmevbZQ-unsplash.html',
        })
    )

    res.status(202).json({});
});

export default router;

function createHexHash(input: string): string {
    const md5sum = createHash('md5');
    md5sum.update(Buffer.from(input));
    return md5sum.digest('hex');
}
