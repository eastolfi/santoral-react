import { Button } from '@material-ui/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AgendaService } from '../../../services/AgendaService';

interface EventDeleteProps {
    eventId: string;
    onEventDeleted: () => void;
}

export function EventDelete(props: EventDeleteProps) {
    const handleDeleteClick = () => {
        AgendaService.instance.deleteEvent(props.eventId)
        .pipe(catchError((error: Error) => {
            console.log(error);

            return of(false);
        }))
        .subscribe((deleted: boolean) => {
            if (deleted) {
                props.onEventDeleted();
            }
        })
    }
    return (
        <Button onClick={ handleDeleteClick }>Delete</Button>
    );
}

