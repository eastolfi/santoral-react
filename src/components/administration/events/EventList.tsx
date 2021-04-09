import { AgendaEvent } from '../../../models/event';

import { EventListItem } from './EventListItem';

interface EventListProps {
    events: AgendaEvent[];
}

export function EventList(props: EventListProps) {
    return (
        <div>
            {props.events.map((event: AgendaEvent, i: number) => {
                return <EventListItem key={`event_item_${i}`} event={ event } />
            })}
        </div>
    );
}

