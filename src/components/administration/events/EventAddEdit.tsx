import { ChangeEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
        <Form inline>
            <Form.Group controlId="title">
                <Form.Label srOnly>Title</Form.Label>
                <Form.Control
                    value={ title }
                    onChange={ handleEventTitleChange }
                    className="mb-2 mr-sm-2"
                    placeholder="Event title"
                />
            </Form.Group>
            
            <Form.Group controlId="description">
                <Form.Label srOnly>Description</Form.Label>
                <Form.Control
                    value={ description }
                    onChange={ handleEventDescriptionChange }
                    className="mb-2 mr-sm-2"
                    placeholder="Event description"
                />
            </Form.Group>
            
            <Form.Group controlId="date">
                <Form.Label srOnly>Date</Form.Label>
                <Form.Control
                    value={ date }
                    onChange={ handleEventDateChange }
                    className="mb-2 mr-sm-2"
                    placeholder="Event date"
                />
            </Form.Group>

            <Button type="button" className="mb-2" onClick={ handleAddEventClick }>
                { props.isEdition ? 'Save Event' : 'Add Event' }
            </Button>
        </Form>
    )
}

