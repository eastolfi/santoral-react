import { useEffect, useState } from 'react';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PushNotificationService } from '../../services/PushNotificationService';

import {
    getUserSubscription,
    askUserPermission,
    createNotificationSubscription,
} from './push-notifications';

export type NotificationError = {
    name: string;
    message: string;
    code: number;
};

export default function usePushNotifications() {
    //to manage errors
    const [error, setError] = useState(null as NotificationError);
    //to manage async actions
    const [loading, setLoading] = useState(true);
    //to manage the use push notification subscription
    const [userSubscription, setUserSubscription] = useState(
        null as PushSubscription
    );
    //to manage the user consent: Notification.permission is a JavaScript native function that return the current state of the permission
    //We initialize the userConsent with that value
    const [userConsent, setUserConsent] = useState(Notification.permission);
    //to manage the push server subscription
    const [pushServerSubscriptionId, setPushServerSubscriptionId] = useState(null as string);

    const prepareLoading = () => {
        setLoading(true);
        setError(null);
    };
    const loadingDone = (error?: NotificationError) => {
        if (error) {
            setError(error);
        }

        setLoading(false);
    };

    useEffect(() => {
        prepareLoading();

        const getExistingSubscription = async () => {
            const subscription = await getUserSubscription();
            setUserSubscription(subscription);
            loadingDone();
        };
        getExistingSubscription();
    }, []);

    const onAskUserPermission = () => {
        prepareLoading();

        askUserPermission().then((consent: NotificationPermission) => {
            setUserConsent(consent);

            if (consent !== 'granted') {
                loadingDone({
                    name: 'Consent denied',
                    message: 'You denied the consent to receive notifications',
                    code: 0,
                });
            } else {
                loadingDone();
            }
        });
    };

    /**
     * define a click handler that creates a push notification subscription.
     * Once the subscription is created, it uses the setUserSubscription hook
     */
    const onSusbribeToPushNotification = () => {
        prepareLoading();

        createNotificationSubscription()
            .then((subscription: PushSubscription) => {
                setUserSubscription(subscription);
                loadingDone();
            })
            .catch((error) => {
                console.error("Couldn't create the notification subscription", error, 'name:', error.name, 'message:', error.message, 'code:', error.code);
                loadingDone(error);
            });
    };

    /**
     * define a click handler that sends the push susbcribtion to the push server.
     * Once the subscription ics created on the server, it saves the id using the hook setPushServerSubscriptionId
     */
    const onSendSubscriptionToPushServer = () => {
        prepareLoading();

        PushNotificationService.instance.sendSubscription(userSubscription)
        .pipe(catchError(error => {
            loadingDone(error);
            return of('');
        }))
        .subscribe((subscriptionId: string) => {
            subscriptionId && setPushServerSubscriptionId(subscriptionId);

            loadingDone();
        });
    }

    const onSendNotification = async () => {
        prepareLoading();

        PushNotificationService.instance.sendNotification(pushServerSubscriptionId)
        .pipe(catchError(error => {
            loadingDone(error);
            return of();
        }))
        .subscribe(() => {
            loadingDone();
        });
    }

    return {
        pushNotificationError: error,
        pushNotificationLoading: loading,
        userConsent,
        userSubscription,
        pushServerSubscriptionId,
        onAskUserPermission,
        onSusbribeToPushNotification,
        onSendSubscriptionToPushServer,
        onSendNotification,
    };
}
