import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { observer } from "mobx-react";

import { appStore } from "../../store/AppStore";
import GameHistoryTable from "./GameHistoryTable";
import GameDialog from "./GameDialog";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: theme.spacing(10),
    paddingTop: theme.spacing(10),
    flexDirection: "column"
  },
  gameBegin: {
    marginTop: theme.spacing(3),
    flexGrow: 1
  }
}));

function Content() {
  const classes = useStyles();

  const { username, login } = appStore;

  const [gameOpen, setGameOpen] = React.useState(false);

  const startGame = async () => {
    if (!username) {
      await login("Guest");
    }

    setGameOpen(true);
  };

  return (
    <Container component="main" maxWidth="sm" className={classes.content}>
      <GameHistoryTable />

      <Button
        className={classes.gameBegin}
        variant="contained"
        color="primary"
        onClick={startGame}
      >
        Start game as {username || "a guest"}
      </Button>

      <GameDialog open={gameOpen} setOpen={setGameOpen} />
    </Container>
  );
}

export default observer(Content);
