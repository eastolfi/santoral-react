import { useEffect, useState } from 'react';
import { AgendaEvent } from '../../../models/event';
import { AgendaService } from '../../../services/AgendaService';
import { EventAdd } from './EventAdd';
import { EventList } from './EventList';

export function EventAdminContainer() {
    const [ events, setEvents ] = useState([] as AgendaEvent[]);
    const loadEvents = () => {
        AgendaService.getEvents().subscribe(setEvents);
    }

    // Load events at first render
    useEffect(loadEvents, []);

    // Reload events when adding a new one -> change to add the new one
    const handleEventAdd = (newEvent: AgendaEvent) => {
        setEvents((prev: AgendaEvent[]) => {
            return [newEvent, ...prev];
        })
    }

    return (
        <div>
            <EventAdd onEventAdd={ handleEventAdd } />
            <EventList events={ events } />
        </div>
    )
}

