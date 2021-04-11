import { Dayjs } from 'dayjs'
import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { filter, map, mergeMap, toArray } from 'rxjs/operators';

import { TimeService } from './TimeService';
import { mapToEvent, AgendaEvent } from '../models/event';
import { HttpService } from './HttpService';

const _token = Symbol('AgendaService');
let instance: AgendaService = null;
export class AgendaService extends HttpService {
    constructor(token: Symbol) {
        if (token !== _token) {
            throw new Error('Bad use of singleton, please use the instance.');
        }

        super(`${process.env.REACT_APP_API_ENDPOINT}/events`);
    }

    public static get instance(): AgendaService {
        if (instance === null) {
            instance = new AgendaService(_token);
        }

        return instance;
    }

    public getEvents(): Observable<AgendaEvent[]> {
        return this.get(`search/all`)
            .pipe(
                map((data: AjaxResponse) => data.response),
                mergeMap((items: any[]) => items),
                map(mapToEvent),
                toArray()
            );
    }

    public getEventsForDate(date: Dayjs): Observable<AgendaEvent[]> {
        return this.get(`search/${TimeService.fromDayjs(date)}`)
            .pipe(
                map((data: AjaxResponse) => data.response),
                mergeMap((items: any[]) => items),
                map(mapToEvent),
                filter((event: AgendaEvent) => event.date.isSame(date, 'day')),
                toArray()
            );
    }

    public createEvent(event: AgendaEvent): Observable<string> {
        return this.post(`add`, { event })
            .pipe(
                map((data: AjaxResponse) => data.response.id as string)
            );
    }

    public updateEvent(event: AgendaEvent): Observable<boolean> {
        return this.put(`update/${event._id}`, { event })
            .pipe(
                map((data: AjaxResponse) => data.response.updated as boolean)
            );
    }

    public deleteEvent(eventId: string): Observable<boolean> {
        return this.delete(`remove/${eventId}`)
            .pipe(
                map((data: AjaxResponse) => data.response.deleted as boolean)
            );
    }
}
