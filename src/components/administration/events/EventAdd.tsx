import { ChangeEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { AgendaEvent, createEvent } from '../../../models/event';
import { AgendaService } from '../../../services/AgendaService';
import { TimeService } from '../../../services/TimeService';

interface EventAddProps {
    onEventAdd: (newEvent: AgendaEvent) => void;
}

export function EventAdd(props: EventAddProps) {
    // Event Title
    const [ title, setTitle ] = useState('');
    const handleEventTitleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setTitle(target.value);
    };
    const EventTitleFormGroup = (
        <Form.Group controlId="title">
            <Form.Label srOnly>Title</Form.Label>
            <Form.Control
                value={ title }
                onChange={ handleEventTitleChange }
                className="mb-2 mr-sm-2"
                placeholder="Event title"
            />
        </Form.Group>
    )

    // Event Description
    const [ description, setDescription ] = useState('');
    const handleEventDescriptionChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setDescription(target.value);
    };
    const EventDescriptionFormGroup = (
        <Form.Group controlId="description">
            <Form.Label srOnly>Description</Form.Label>
            <Form.Control
                value={ description }
                onChange={ handleEventDescriptionChange }
                className="mb-2 mr-sm-2"
                placeholder="Event description"
            />
        </Form.Group>
    )

    // Event Date
    const [ date, setDate ] = useState(TimeService.todayStr);
    const handleEventDateChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setDate(target.value);
    };
    const EventDateFormGroup = (
        <Form.Group controlId="date">
            <Form.Label srOnly>Date</Form.Label>
            <Form.Control
                value={ date }
                onChange={ handleEventDateChange }
                className="mb-2 mr-sm-2"
                placeholder="Event date"
            />
        </Form.Group>
    )

    // Create event
    const handleAddEventClick = () => {
        const newEvent = createEvent({
            title, content: description, date
        });
        console.dir(newEvent);

        AgendaService.createEvent(newEvent).subscribe(() => {
            setTitle('');
            setDescription('');

            props.onEventAdd(newEvent);
        });
    }

    return (
        <Form inline>
            { EventTitleFormGroup }
            { EventDescriptionFormGroup }
            { EventDateFormGroup }

            <Button type="button" className="mb-2" onClick={ handleAddEventClick }>
                Add Event
            </Button>
        </Form>
    )
}

