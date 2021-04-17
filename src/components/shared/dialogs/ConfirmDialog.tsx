import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

export interface ConfirmDialogProps {
    open: boolean;
    title: string;
    content: string;
    labelConfirm: string;
    labelCancel: string;
    onClose: (ok: boolean) => void;
}

export interface ConfirmDialogOptions {
    title?: string;
    content?: string;
    labelConfirm?: string;
    labelCancel?: string;
    onClose: (ok: boolean) => void;
}

export const defaultConfirmDialogProps: ConfirmDialogOptions = {
    title: 'Confirmation',
    content: 'Are you sure?',
    labelCancel: 'Cancel',
    labelConfirm: 'Confirm',
    onClose: null
}

// stateless - uncontrolled
export function ConfirmDialog(props: ConfirmDialogProps) {
    const handleCloseConfirm = () => {
        props.onClose(true);
    };

    const handleCloseCancel = () => {
        props.onClose(false);
    };

    return (
        <Dialog
            open={ props.open }
            aria-labelledby="confirmation-dialog"
            maxWidth="xs"
            fullWidth={ true }
            onClose={ handleCloseCancel }
        >
            <DialogTitle id="simple-dialog-title">{ props.title }</DialogTitle>

            <Box ml={3}>
                <Typography variant="body1">
                    <span>{ props.content }</span>
                </Typography>
            </Box>
            
            <DialogActions>
                <Button onClick={ handleCloseCancel } color="secondary">
                    { props.labelCancel }
                </Button>
                <Button onClick={ handleCloseConfirm } color="primary" autoFocus>
                    { props.labelConfirm }
                </Button>
            </DialogActions>
        </Dialog>
    );
}
