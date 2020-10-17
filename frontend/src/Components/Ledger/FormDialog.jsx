import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
    marginBottom: "10px",
  }
});

function FormDialog({open, handleClose, details, editT, classes, editDetails}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter details to update.
          </DialogContentText>
          {details &&
            <>
              <TextField
                className={classes.textField}
                fullWidth
                label="Type"
                disabled 
                value={details.type}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
              />
              <TextField
                className={classes.textField}
                fullWidth
                label="Category"
                disabled 
                value={details.category}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
              />
              <TextField
                className={classes.textField}
                fullWidth
                label="Amount"
                type="Number"
                value={details.amount}
                onChange={(e) => editDetails({...details, amount: Number(e.target.value)})}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={editT} color="primary">
            Update
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormDialog);