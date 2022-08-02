import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

import { HttpService } from './HttpService';

const _token = Symbol('PushNotificationService');
let instance: PushNotificationService = null;
export class PushNotificationService extends HttpService {
    constructor(token: Symbol) {
        if (token !== _token) {
            throw new Error('Bad use of singleton, please use the instance.');
        }

        super(`${process.env.REACT_APP_API_ENDPOINT}/push`);
    }

    public static get instance(): PushNotificationService {
        if (instance === null) {
            instance = new PushNotificationService(_token);
        }

        return instance;
    }

    public sendSubscription(userSubscription: PushSubscription): Observable<string> {
        return this.post(`subscription`, userSubscription)
        .pipe(
            map((data: AjaxResponse) => data.response.id as string)
        );
    }

    public sendNotification(pushServerSubscriptionId: string): Observable<void> {
        return this.get(`subscription/${pushServerSubscriptionId}`)
            .pipe(
                map((data: AjaxResponse) => data.response),
            );
    }
}
