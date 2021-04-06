import { Dayjs } from 'dayjs'

export class AgendaService {
    public static getEvents(date: Dayjs): string[] {
        return [date.format('[event for: ]DD/MM/YYYY')];
    }
}
