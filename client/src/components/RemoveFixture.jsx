// React imports
import {useState} from 'react';

// MUI imports
import {Button, IconButton, Dialog, DialogActions, 
      DialogContent, DialogContentText, DialogTitle} from '@mui/material/';
import {Delete as DeleteIcon} from '@mui/icons-material/';


export default function RemoveFixture({onConfirm}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {"Deleting confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" autoFocus>Cancel</Button>
          <Button onClick={() => {handleClose(); onConfirm()}} variant="contained" color="error" >Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}