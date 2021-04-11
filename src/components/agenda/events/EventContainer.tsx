import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { DayjsPropType } from '../../../prop-types/DayjsPropType';
import { AgendaService } from '../../../services/AgendaService';
import { AgendaEvent } from '../../../models/event';

type EventContainerProps = {
    date: Dayjs
};

export function EventContainer(props: EventContainerProps) {
    const [ events, setEvents ] = useState(null as AgendaEvent[]);

    useEffect(() => {
        AgendaService.instance.getEventsForDate(props.date).subscribe(setEvents);
    }, [props.date]);

    if (!events?.length) {
        return <div>No events for today</div>
    }

    return (
        <div>
            {events.map((event: AgendaEvent, i: number) => {
                return <div key={`event_${i}`}>{ event.title }</div>
            })}
        </div>
    )
}

EventContainer.propTypes = {
    date: DayjsPropType
};
