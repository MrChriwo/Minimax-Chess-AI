import { Button, Grid } from "@material-ui/core";
import { useState } from "react";
import "./MinimaxConsole.scss";

export const MinimaxConsole = () => {
  const [consoleText, setConsoleText] = useState("");


  const log = (text: string) => {
    setConsoleText((prev) => prev + text + "\n");
  };

  const clear = () => {
    setConsoleText("");
  }


  return (
    <>
            <h2>Minimax Console</h2>
    <div className="console-wrapper">
        <div className="minimax-console">
        <pre>{consoleText}</pre>
        </div>
    </div>
            <Grid container spacing={2} justifyContent="center">
            <Grid item xs={3}>
            <Button variant="contained" onClick={() => log("World")}>Click me</Button>
            </Grid>
            <Grid item xs={3}>
            <Button variant="contained" onClick={clear}>Clear</Button>
            </Grid>
            </Grid>
    </>

  );
};
