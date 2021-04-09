import { Dayjs } from 'dayjs'
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { filter, map, mergeMap, toArray } from 'rxjs/operators';

import { TimeService } from './TimeService';
import { createEvent, AgendaEvent } from '../models/event';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export class AgendaService {
    public static getEvents(): Observable<AgendaEvent[]> {
        return ajax({
            url: `${API_ENDPOINT}/events/search/all`,
            method: 'GET',
            crossDomain: true
        }).pipe(
            map((data: AjaxResponse) => data.response),
            mergeMap((items: any[]) => items),
            map(createEvent),
            toArray()
        );
    }

    public static getEventsForDate(date: Dayjs): Observable<AgendaEvent[]> {
        return ajax({
            url: `${API_ENDPOINT}/events/search/${TimeService.fromDayjs(date)}`,
            method: 'GET',
            crossDomain: true
        }).pipe(
            map((data: AjaxResponse) => data.response),
            mergeMap((items: any[]) => items),
            map(createEvent),
            filter((event: AgendaEvent) => event.date.isSame(date, 'day')),
            toArray()
        );
    }
        
    public static createEvent(event: AgendaEvent): Observable<void> {
        return ajax({
            url: `${API_ENDPOINT}/events/add`,
            method: 'POST',
            body: { event },
            crossDomain: true
        }).pipe(map((data: AjaxResponse) => { return }));
    }
}
