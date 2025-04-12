import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

export const ShowDialog = ({ open, onClose, onConfirm, title, warning = '' }) => {
    return (
        <Dialog
            open={open}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {warning
                    &&
                    <DialogContentText id="alert-dialog-slide-description">
                        {warning}
                    </DialogContentText>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} >Cancelar</Button>
                <Button onClick={onConfirm}>Confirmar</Button>
            </DialogActions>
        </Dialog>
    )
}
