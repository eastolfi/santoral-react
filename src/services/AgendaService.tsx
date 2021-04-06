import { Dayjs } from 'dayjs'
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { filter, map, mergeMap, toArray } from 'rxjs/operators';

import { createEvent, CalendarEvent } from '../models/event';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export class AgendaService {
    public static getEvents(date: Dayjs): Observable<CalendarEvent[]> {
        return ajax({
            url: `${API_ENDPOINT}/events`,
            method: 'GET',
            crossDomain: true
        }).pipe(
            map((data: AjaxResponse) => data.response),
            mergeMap((items: any[]) => items),
            map(createEvent),
            filter((event: CalendarEvent) => event.date.isSame(date, 'day')),
            toArray()
        );
    }
}
