import { Dayjs } from 'dayjs'
import { createEvent, CalendarEvent } from '../models/event';

const _EVENTS = [
    { title: 'Cumple 1', content: 'Cumpleaños', date: '2021-04-06' }
]

export class AgendaService {
    public static getEvents(date: Dayjs): CalendarEvent[] {
        return _EVENTS.map(createEvent).filter(e => e.date.isSame(date, 'day'));
    }
}
