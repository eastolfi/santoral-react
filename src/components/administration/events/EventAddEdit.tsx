import { ChangeEvent, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AgendaEvent, mapToEvent } from '../../../models/event';
import { AgendaService } from '../../../services/AgendaService';
import { TimeService } from '../../../services/TimeService';

interface EventAddEditProps {
    isEdition: boolean;
    event?: AgendaEvent;
    onEventAdded: () => void;
}

export function EventAddEdit(props: EventAddEditProps) {
    // Event Title
    const [ title, setTitle ] = useState(props.event?.title || '');
    const handleEventTitleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setTitle(target.value);
    };

    // Event Description
    const [ description, setDescription ] = useState(props.event?.content || '');
    const handleEventDescriptionChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setDescription(target.value);
    };

    // Event Date
    const [ date, setDate ] = useState(props.event?.date ? TimeService.fromDayjs(props.event.date) : TimeService.todayStr);
    const handleEventDateChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setDate(target.value);
    };

    // Create event
    const handleAddEventClick = () => {
        const newEvent = mapToEvent({
            title, content: description, date
        });

        if (props.isEdition) {
            newEvent._id = props.event._id;

            AgendaService.instance.updateEvent(newEvent)
            .pipe(catchError((error: Error) => {
                console.log(error);

                return of(false);
            }))
            .subscribe((updated: boolean) => {
                if (updated) {
                    props.onEventAdded();
                }
            });
        } else {
            AgendaService.instance.createEvent(newEvent)
            .pipe(catchError((error: Error) => {
                console.log(error);

                return of(null);
            }))
            .subscribe((eventId: string) => {
                if (eventId) {
                    setTitle('');
                    setDescription('');

                    props.onEventAdded();
                }
            });
        }
    }

    return (
        <Box component="form" display="flex">
            
            <Box mb={2} mr={2}>
                <TextField
                    id="event-title"
                    label="Title"
                    placeholder="Event title"
                    className="mb-2 mr-sm-2"
                    variant="outlined"
                    value={ title }
                    onChange={ handleEventTitleChange } />
            </Box>

            <Box mb={2} mr={2}>
                <TextField
                    id="event-description"
                    label="Description"
                    placeholder="Event description"
                    variant="outlined"
                    value={ description }
                    onChange={ handleEventDescriptionChange } />
            </Box>
            <Box mb={2} mr={2}>
                <TextField
                    id="event-date"
                    label="Date"
                    placeholder="Event date"
                    variant="outlined"
                    value={ date }
                    onChange={ handleEventDateChange } />
            </Box>

            <Box mb={2}>
                <Button variant="outlined" color="secondary" onClick={ handleAddEventClick }>
                    { props.isEdition ? 'Save Event' : 'Add Event' }
                </Button>
            </Box>
        </Box>
    )
}

