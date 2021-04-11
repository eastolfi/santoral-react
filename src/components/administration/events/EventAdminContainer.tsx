import { useEffect, useState } from 'react';
import { AgendaEvent } from '../../../models/event';
import { AgendaService } from '../../../services/AgendaService';
import { EventAddEdit } from './EventAddEdit';
import { EventList } from './EventList';

export function EventAdminContainer() {
    const getEvents = () => {
        AgendaService.instance.getEvents().subscribe(setEvents);
    };

    const [ events, setEvents ] = useState([] as AgendaEvent[]);

    // Load events at first render
    useEffect(getEvents, []);

    // Reload events when adding a new one -> change to add the new one
    const handleEventAdd = (/*newEvent: AgendaEvent*/): void => {
        getEvents();
    }

    // Reload events when adding a new one -> change to add the new one
    const handleEventEdit = (): void => {
        getEvents();
    }

    const handleEventDelete = (/*eventId: string, index: number*/): void => {
        getEvents();
    }

    return (
        <div>
            <EventAddEdit isEdition={ false } onEventAdded={ handleEventAdd } />
            
            <EventList
                events={ events }
                onDeleteEvent={ handleEventDelete }
                onUpdateEvent={ handleEventEdit } />
        </div>
    )
}

