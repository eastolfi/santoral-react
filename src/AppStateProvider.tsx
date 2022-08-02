import { createContext, ReactNode, useEffect, useState } from 'react';

import { ConfirmDialog, ConfirmDialogOptions, defaultConfirmDialogProps } from './components/shared/dialogs/ConfirmDialog';

import { usePushNotifications } from './hooks';

export const AppContext = createContext(null);

interface AppStateProviderProps {
    children: ReactNode[] | ReactNode;
}

export default function AppStateProvider({ children }: AppStateProviderProps) {
    const [message, setMessage] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if (message) alert(message);
    }, [ message ]);

    useEffect(() => {
        if (error) alert(error);
    }, [ error ]);

    // Confirm Dialog props
    const [ confirmDialogOpen, setConfirmDialogOpen ] = useState(false);
    const [ confirmDialogOptions, setConfirmDialogOptions ] = useState<ConfirmDialogOptions>(defaultConfirmDialogProps);

    const showConfirm = (options: ConfirmDialogOptions) => {
        setConfirmDialogOpen(true);
        setConfirmDialogOptions({
            ...confirmDialogOptions,
            ...options,
        });
    }

    const handleClose = (ok: boolean) => {
        if (confirmDialogOptions?.onClose) {
            confirmDialogOptions.onClose(ok);
        }

        setConfirmDialogOpen(false);
    }

    const funcs = {
        showConfirm,
        setMessage,
        setError,
    }

    // Push Notifications
    const { pushNotificationLoading, onAskUserPermission, userConsent } = usePushNotifications();

    if (pushNotificationLoading) {
        console.log('Loading push');
    } else {
        if (userConsent === 'default') {
            onAskUserPermission();
        }
    }

    

    return (
        <AppContext.Provider value={ { ...funcs } }>
            <ConfirmDialog
                open={ confirmDialogOpen }
                title={ confirmDialogOptions.title }
                content={ confirmDialogOptions.content }
                labelConfirm={ confirmDialogOptions.labelConfirm }
                labelCancel={ confirmDialogOptions.labelCancel }
                onClose={ handleClose } />

            { children }
        </AppContext.Provider>
    );
}
