import { usePushNotifications } from '../../../hooks';
import { NotificationError } from '../../../hooks/usePushNotifications';

const Loading = ({ loading }: { loading: boolean }) =>
    loading ? (
        <div className="app-loader">
            Please wait, we are loading something...
        </div>
    ) : null;
const Error = ({ error }: { error: NotificationError }) =>
    error ? (
        <section className="app-error">
            <h2>{error.name}</h2>
            <p>Error message : {error.message}</p>
            <p>Error code : {error.code}</p>
        </section>
    ) : null;

const pushNotificationSupported = ('serviceWorker' in navigator && 'PushManager' in window);

export function SettingsAdminContainer() {
    const {
        userConsent,
        userSubscription,
        pushServerSubscriptionId,
        pushNotificationError,
        pushNotificationLoading,
        onAskUserPermission,
        onSusbribeToPushNotification,
        onSendSubscriptionToPushServer,
        onSendNotification,
    } = usePushNotifications();

    const isConsentGranted = userConsent === 'granted';

    return (
        <div>
            <h2>Push Notifications</h2>

            <Loading loading={pushNotificationLoading} />

            <p>
                Push notification are {!pushNotificationSupported && 'NOT'}{' '}
                supported by your device.
            </p>

            <p>
                User consent to recevie push notificaitons is{' '}
                <strong>{userConsent}</strong>.
            </p>

            <Error error={pushNotificationError} />

            <button
                disabled={!pushNotificationSupported || isConsentGranted}
                onClick={() => onAskUserPermission()}
            >
                {isConsentGranted ? 'Consent granted' : ' Ask user permission'}
            </button>

            <button
                disabled={
                    !pushNotificationSupported ||
                    !isConsentGranted ||
                    !!userSubscription
                }
                onClick={ onSusbribeToPushNotification }
            >
                {userSubscription
                    ? 'Push subscription created'
                    : 'Create Notification subscription'}
            </button>

            <button disabled={!userSubscription || !!pushServerSubscriptionId} onClick={ onSendSubscriptionToPushServer }>
                {pushServerSubscriptionId ? "Subscrption sent to the server" : "Send subscription to push server"}
            </button>

            {pushServerSubscriptionId && (
                <div>
                <p>The server accepted the push subscrption!</p>
                <button onClick={ onSendNotification }>Send a notification</button>
                </div>
            )}

            <section>
                <h4>Your notification subscription details</h4>
                <pre>
                <code>{JSON.stringify(userSubscription, null, " ")}</code>
                </pre>
            </section>

            <hr />
        </div>
    );
}
