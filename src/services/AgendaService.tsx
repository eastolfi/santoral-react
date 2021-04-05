import dayjs, { Dayjs } from 'dayjs'

export class AgendaService {
    public static get today(): Dayjs {
        return dayjs();
    }

    public static getMonth(): Dayjs {
        return AgendaService.today.endOf('month');
    }
}
