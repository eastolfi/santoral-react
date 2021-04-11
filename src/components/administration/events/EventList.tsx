import { AgendaEvent } from '../../../models/event';

import { EventDelete } from './EventDelete';
import { EventEdit } from './EventEdit';

interface EventListProps {
    events: AgendaEvent[];
    onDeleteEvent: (/*eventId: string, index: number*/) => void;
    onUpdateEvent: (/*eventId: string, index: number*/) => void;
}

export function EventList(props: EventListProps) {
    return (
        <div>
            {props.events.map((event: AgendaEvent, i: number) => {
                return <div key={`event_item_${i}`} className="d-flex">
                    <EventEdit event={ event } onUpdateEvent={ props.onUpdateEvent } />

                    <EventDelete
                        eventId={ event._id }
                        onEventDeleted={ props.onDeleteEvent } />
                </div>
            })}
        </div>
    );
}

