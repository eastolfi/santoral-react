import { Dayjs } from 'dayjs'
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { filter, map, mergeMap, toArray } from 'rxjs/operators';

import { TimeService } from './TimeService';
import { createEvent, AgendaEvent } from '../models/event';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export class AgendaService {
    public static getEvents(date: Dayjs): Observable<AgendaEvent[]> {
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
}
