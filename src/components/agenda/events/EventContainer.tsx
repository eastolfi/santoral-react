import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { DayjsPropType } from '../../../prop-types/DayjsPropType';
import { AgendaService } from '../../../services/AgendaService';
import { CalendarEvent } from '../../../models/event';

type EventContainerProps = {
    date: Dayjs
};

export function EventContainer(props: EventContainerProps) {
    const [ events, setEvents ] = useState(null as CalendarEvent[]);

    useEffect(() => {
        AgendaService.getEvents(props.date).subscribe(setEvents);
    }, [props.date]);

    if (!events?.length) {
        return <div>No events for today</div>
    }

    return (
        <div>
            {events.map((event: CalendarEvent, i: number) => {
                return <div key={`event_${i}`}>{ event.title }</div>
            })}
        </div>
    )
}

EventContainer.propTypes = {
    date: DayjsPropType
};
