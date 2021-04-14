import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import { orange, red } from '@material-ui/core/colors';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AgendaService } from '../../../services/AgendaService';

interface EventDeleteProps {
    eventId: string;
    onEventDeleted: () => void;
}

// const warningTheme = createMuiTheme({
//     palette: {
//         primary: red,
//         secondary: orange
//     }
// });

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
        <Box mb={2}>
            {/* <ThemeProvider theme={ warningTheme }> */}
                <Button variant="outlined" color="primary" onClick={ handleDeleteClick }>
                    Delete
                </Button>
            {/* </ThemeProvider> */}
        </Box>
    );
}

