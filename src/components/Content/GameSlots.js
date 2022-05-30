import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      minWidth: theme.spacing(8),
      minHeight: theme.spacing(8),
      maxWidth: theme.spacing(16),
      maxHeight: theme.spacing(16)
    },
    justifyContent: "center"
  },
  slotText: {
    fontSize: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function Slots({ slots = [0, 0, 0] }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {slots.map((slot, i) => (
        <Paper elevation={1} key={i} component="div">
          <div className={classes.slotText}>{slot}</div>
        </Paper>
      ))}
    </div>
  );
}
