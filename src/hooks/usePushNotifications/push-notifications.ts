/**
 * asks user consent to receive push notifications and returns the response of the user, one of granted, default, denied
 */
export async function askUserPermission(): Promise<NotificationPermission> {
    return await Notification.requestPermission();
}

/**
 *
 * using the registered service worker creates a push notification subscription and returns it
 *
 */
export async function createNotificationSubscription(): Promise<PushSubscription> {
    //wait for service worker installation to be ready
    const serviceWorker = await navigator.serviceWorker.ready;
    // subscribe and return the subscription
    return await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
    });
}

/**
 * returns the subscription if present or nothing
 */
export function getUserSubscription(): Promise<PushSubscription> {
    //wait for service worker installation to be ready, and then
    return navigator.serviceWorker.ready.then(
        (serviceWorker: ServiceWorkerRegistration) => {
            return serviceWorker.pushManager.getSubscription();
        }
    );
}

// async function postSubscription(subscription) {
//     const response = await fetch(
//         `https://push-notification-demo-server.herokuapp.com/subscription`,
//         {
//             credentials: 'omit',
//             headers: {
//                 'content-type': 'application/json;charset=UTF-8',
//                 'sec-fetch-mode': 'cors',
//             },
//             body: JSON.stringify(subscription),
//             method: 'POST',
//             mode: 'cors',
//         }
//     );
//     return await response.json();
// }
