import { Dayjs } from 'dayjs';

import { TimeService } from '../services/TimeService';

export interface AgendaEvent {
    _id: string;
    title: string;
    content: string;
    date: Dayjs;
}

export function mapToEvent(data: {
    _id?: string,
    title: string,
    content: string,
    date: string,
}) {
    return {
        _id: data._id,
        title: data.title,
        content: data.content,
        date: TimeService.toDayjs(data.date)
    } as AgendaEvent;
}
