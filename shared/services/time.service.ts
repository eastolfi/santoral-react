import dayjs, { Dayjs } from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_FORMAT_DB = 'YYYY-MM-DD[Z]';

export class TimeService {
    public static get today(): Dayjs {
        return dayjs();
    }

    public static toDayjs(date: string): Dayjs {
        return dayjs(date, DATE_FORMAT);
    }

    public static fromDayjs(date: Dayjs): string {
        return date.format(DATE_FORMAT);
    }

    public static toDbDate(date: string): Date {
        return new Date(TimeService.toDayjs(date).format(DATE_FORMAT_DB));
    }
}
