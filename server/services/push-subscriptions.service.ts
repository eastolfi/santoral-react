import { createHash } from 'crypto';
// Do not use named imports: https://github.com/web-push-libs/web-push/issues/683
import * as webPush from 'web-push';
import { PushSubscription } from 'web-push';

export interface PushNotificationPayload {
    title: string,
    text: string,
    image: string,
    tag: string,
    url: string,
}

const _token = Symbol('PushSubscriptionsService');
let instance: PushSubscriptionsService = null;
export class PushSubscriptionsService {
    private subscriptions: { [id: string]: PushSubscription } = {};

    constructor(token: Symbol) {
        if (token !== _token) {
            throw new Error('Bad use of singleton, please use the instance.');
        }

        webPush.setVapidDetails(
            `mailto:${process.env.VAPID_CONTACT}`,
            process.env.VAPID_PUBLIC_KEY,
            process.env.VAPID_PRIVATE_KEY
        );
    }

    public static get instance(): PushSubscriptionsService {
        if (instance === null) {
            instance = new PushSubscriptionsService(_token);
        }

        return instance;
    }

    /**
     * Add a new subscription to the pool
     * 
     * @param subscriptionRequest Push subscription request
     * @returns Subscription ID generated from the request
     */
    public addSubscription(subscriptionRequest: PushSubscription): string {
        const subscriptionId = this.createHashForSubscription(JSON.stringify(subscriptionRequest));
        this.subscriptions[subscriptionId] = subscriptionRequest;

        return subscriptionId;
    }

    /**
     * Send a new Push Notification to the passed ID
     * 
     * @param subscriptionId Push subscription ID
     * @param payload Content of the notification
     */
    public sendNotification(subscriptionId: string, payload: PushNotificationPayload): void {
        console.log(`Sending notification to ${subscriptionId}`)
        this.sendPushNotification(subscriptionId, payload);
    }

    /**
     * Send a Push Notification to all subscriptions in the pool
     * 
     * @param payload Content of the notification
     */
    public sendNotificationForAll(payload: PushNotificationPayload): void {
        console.log(`Sending notification to ${Object.keys(this.subscriptions).length} subscriptions`)

        Object.keys(this.subscriptions).forEach((subscription: string) => {
            this.sendNotification(subscription, payload);
        });
    }

    private createHashForSubscription(input: string): string {
        const md5sum = createHash('md5');
        md5sum.update(Buffer.from(input));
        return md5sum.digest('hex');
    }

    private sendPushNotification(subscriptionId: string, payload: PushNotificationPayload): void {
        const userSubscription = this.subscriptions[subscriptionId];
        webPush.sendNotification(
            userSubscription,
            JSON.stringify(payload)
        )
    }
}
