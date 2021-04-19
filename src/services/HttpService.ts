import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { AjaxRequest, AjaxResponse } from 'rxjs/internal/observable/dom/AjaxObservable';

export class HttpService {
    protected readonly API_ENDPOINT: string;

    constructor(endpoint: string) {
        this.API_ENDPOINT = endpoint;
    }

    public request(urlOrRequest: string | AjaxRequest): Observable<AjaxResponse> {
        if (typeof urlOrRequest === 'string') {
            return ajax(`${this.API_ENDPOINT}/${urlOrRequest}`);
        } else {
            let request = urlOrRequest as AjaxRequest;

            return ajax({
                ...request,
                url: `${this.API_ENDPOINT}/${request.url}`,
                crossDomain: true,
                headers: {
                    ...request.headers,
                    'Content-Type': 'application/json'
                },
            });
        }
    }

    public get(url: string, headers?: Object): Observable<AjaxResponse> {
        return ajax({
            url: `${this.API_ENDPOINT}/${url}`,
            method: 'GET',
            crossDomain: true,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
        });
    }
    public post(url: string, body?: any, headers?: Object): Observable<AjaxResponse> {
        return ajax({
            url: `${this.API_ENDPOINT}/${url}`,
            method: 'POST',
            body,
            crossDomain: true,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
        });
    }

    public put(url: string, body?: any, headers?: Object): Observable<AjaxResponse> {
        return ajax({
            url: `${this.API_ENDPOINT}/${url}`,
            method: 'PUT',
            body,
            crossDomain: true,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
        });
    }
    
    public patch(url: string, body?: any, headers?: Object): Observable<AjaxResponse> {
        return ajax({
            url: `${this.API_ENDPOINT}/${url}`,
            method: 'PATCH',
            body,
            crossDomain: true,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
        });
    }
    
    public delete(url: string, headers?: Object): Observable<AjaxResponse> {
        return ajax({
            url: `${this.API_ENDPOINT}/${url}`,
            method: 'DELETE',
            crossDomain: true,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
        });
    }
}

