import { forwardRef } from 'react';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function({open, message, severity, onClose}) {
    return (
        <Snackbar
            TransitionComponent={TransitionDown}
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
        >
            <Alert 
                onClose={onClose} 
                severity={severity}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}