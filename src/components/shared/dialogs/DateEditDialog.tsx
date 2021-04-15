import { useState } from 'react';
import { Dayjs } from 'dayjs';

import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import { TimeService } from '../../../services/TimeService';

interface DateEditProps {
    open: boolean;
    date: Dayjs;
    title?: string;
    label?: string;
    onClose: (value?: Dayjs) => void;
}

export function DateEditDialog(props: DateEditProps) {
    const handleCloseConfirm = () => {
        props.onClose(value);
    };

    const handleCloseCancel = () => {
        props.onClose();
    };

    const [ value, setValue ] = useState(null as Dayjs);
    const handleDateChange = (date: MaterialUiPickersDate) => {
        setValue(date);
    };

    return (
        <Dialog onClose={ handleCloseCancel } aria-labelledby="simple-dialog-title" open={ props.open }>
            <DialogTitle id="simple-dialog-title">{ props.title || 'Edit date' }</DialogTitle>

            <KeyboardDatePicker
                disableToolbar
                variant="dialog"
                format={ TimeService.displayFormat }
                margin="normal"
                id="date-picker-dialog"
                label={ props.label || 'Date' }
                value={ value || props.date }
                onChange={ handleDateChange }
                KeyboardButtonProps={{ 'aria-label': 'change date' }} />
            
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
