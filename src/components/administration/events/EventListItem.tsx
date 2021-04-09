import { AgendaEvent } from '../../../models/event';

interface EventListItemProps {
    event: AgendaEvent;
}

export function EventListItem(props: EventListItemProps) {
    return (
        <div>
            { props.event.title }
        </div>
    );
}

