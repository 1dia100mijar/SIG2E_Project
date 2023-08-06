import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Status, Submit } from './common';

type Props = {
    submit: Submit
    header?: string
    children?: JSX.Element | JSX.Element[]
    status: Status
}

function CustomDialog( {submit, header, children, status}: Props ) {

  const submitAndClose = () => {
    submit.action()
    status.close()
  }

  return (
    <div>
      <Dialog open={status.open} onClose={status.close} >
        <DialogTitle>{header}</DialogTitle>
        
        <DialogContent>
         {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={status.close}>Cancelar</Button>
          <Button onClick={submitAndClose}>{submit.name}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomDialog