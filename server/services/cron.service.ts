import { schedule } from 'node-cron';
import dayjs from 'dayjs';

import { PushSubscriptionsService } from './push-subscriptions.service';
import { EventService } from './event.service';
import { AgendaEventDto } from '../shared/models/agenda-event';

const DEFAULT_CRON = '8 * * * *';

export class CronService {
    public static addDailyNotification(): void {
        schedule(process.env.DAILY_NOTIFICATION_SCHEDULE || DEFAULT_CRON, () => {
            console.log('Sending notifications')

            const service = new EventService();
            service.findEventsForDate(dayjs().format('YYYY-MM-DD'))
            .then((events: AgendaEventDto[]) => {
                PushSubscriptionsService.instance.sendNotificationForAll({
                    title: `Today's events`,
                    text: events.map(event => event.title).join('\n'),
                    tag: 'Event',
                    image: 'https://santoral-react-git-notifications-eastolfi.vercel.app/favicon.ico',
                    url: 'https://santoral-react-git-notifications-eastolfi.vercel.app/'
                })
            });
        })
    }
}
