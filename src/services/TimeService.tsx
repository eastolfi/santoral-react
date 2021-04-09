import dayjs, { Dayjs } from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD';

export class TimeService {
    public static get today(): Dayjs {
        return dayjs();
    }

    public static get todayStr(): string {
        return TimeService.fromDayjs(dayjs());
    }

    public static toDayjs(date: string): Dayjs {
        return dayjs(date, DATE_FORMAT);
    }

    public static fromDayjs(date: Dayjs): string {
        return date.format(DATE_FORMAT);
    }
}
