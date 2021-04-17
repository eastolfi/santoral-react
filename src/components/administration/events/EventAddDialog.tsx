import { ChangeEvent, useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import { TimeService } from '../../../services/TimeService';
import { AgendaEvent } from '../../../models/event';

interface ItemAddDialogProps {
    open: boolean;
    onClose: (value?: Omit<AgendaEvent, '_id'>) => void;
}

export function ItemAddDialog(props: ItemAddDialogProps) {
    const handleCloseConfirm = () => {
        props.onClose({
            title,
            content: description,
            date
        });
    };

    const handleCloseCancel = () => {
        props.onClose();
    };

    // Event Title
    const [ title, setTitle ] = useState('');
    const handleEventTitleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setTitle(target.value);
    };

    // Event Description
    const [ description, setDescription ] = useState('');
    const handleEventDescriptionChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setDescription(target.value);
    };

    // Event Date
    const [ date, setDate ] = useState(TimeService.today);
    const handleEventDateChange = (newDate: MaterialUiPickersDate) => {
        setDate(newDate);
    };

    return (
        <Dialog
            open={ props.open }
            aria-labelledby="simple-dialog-title"
            maxWidth="sm"
            fullWidth={ true }
            onClose={ handleCloseCancel }
        >
            <DialogTitle id="simple-dialog-title">Add new event</DialogTitle>

            <Box px={3}>
                <form action="">
                    <Box mb={2} mr={2}>
                        <TextField
                            id="event-title"
                            label="Title"
                            placeholder="Event title"
                            className="mb-2 mr-sm-2"
                            variant="standard"
                            fullWidth
                            value={ title }
                            onChange={ handleEventTitleChange } />
                    </Box>

                    <Box mb={2} mr={2}>
                        <TextField
                            id="event-description"
                            label="Description"
                            placeholder="Event description"
                            variant="standard"
                            fullWidth
                            value={ description }
                            onChange={ handleEventDescriptionChange } />
                    </Box>
                    <Box mb={2} mr={2}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format={ TimeService.displayFormat }
                            fullWidth
                            value={ date }
                            onChange={ handleEventDateChange }
                            KeyboardButtonProps={{ 'aria-label': 'change date' }} />
                    </Box>
                </form>
            </Box>
            
            <DialogActions>
                <Button onClick={ handleCloseCancel } color="secondary">
                    Cancel
                </Button>
                <Button onClick={ handleCloseConfirm } color="primary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
