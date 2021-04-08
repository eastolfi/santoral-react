import { Dayjs } from 'dayjs';

import { TimeService } from '../services/TimeService';

export interface AgendaEvent {
    title: string;
    content: string;
    date: Dayjs;
}

export function createEvent(data: {
    title: string,
    content: string,
    date: string,
}) {
    return {
        title: data.title,
        content: data.content,
        date: TimeService.toDayjs(data.date)
    } as AgendaEvent;
}
