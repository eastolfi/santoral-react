import { useState } from 'react';
import Button from 'react-bootstrap/Button';


import { AgendaEvent } from '../../../models/event';
import { EventAddEdit } from './EventAddEdit';

interface EventEditProps {
    event: AgendaEvent;
    onUpdateEvent: (/*eventId: string, index: number*/) => void;
}

export function EventEdit(props: EventEditProps) {
    const [ edition, setEdition ] = useState(false);

    const handleEventEdited = () => {
        props.onUpdateEvent();
    }

    const handleEditClick = () => {
        setEdition(true);
    };

    if (edition) {
        return (
            <EventAddEdit isEdition={ true } event={ props.event } onEventAdded={ handleEventEdited } />
        );
    } else {
        return (
            <div>
                <span>{ props.event.title }</span>

                <Button onClick={ handleEditClick }>Edit</Button>
            </div>
        );
    }
}

