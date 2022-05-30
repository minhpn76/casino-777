import React from "react";
import { observer } from "mobx-react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import Login from "./Login";

function Auth({ login }) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const userName = e.target.name.value;
    login(userName);
  };

  return (
    <div>
      <Button color="inherit" onClick={handleDialogOpen}>
        Login
      </Button>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter your name to login</DialogContentText>

          <Login onSubmit={handleLogin} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default observer(Auth);
