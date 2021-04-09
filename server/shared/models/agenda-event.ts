import { TimeService } from '../services/time.service';

export interface AgendaEventDto {
    _id: string;
    title: string;
    content: string;
    date: Date;
}

export function createAgendaEventDto(data: { title: string, content: string, date: string }): Omit<AgendaEventDto, '_id'> {
    return {
        title: data.title,
        content: data.content,
        date: TimeService.toDbDate(data.date)
    }
}
