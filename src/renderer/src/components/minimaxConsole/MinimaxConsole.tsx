import { Button, Grid } from "@material-ui/core";
import { useState, useRef, useEffect } from "react";
import "./MinimaxConsole.scss";
import { useMinimax } from "@renderer/services/context/MinimaxProvider";

export const MinimaxConsole = () => {
  const {minimaxLog, clearLogs } = useMinimax().context;
  const consoleRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [minimaxLog]);

  return (
    <>
    <h2>Minimax Console</h2>
    <div className="console-wrapper">
        <div className="minimax-console" ref={consoleRef}>
        <pre>{minimaxLog}</pre>
        </div>
    </div>
            <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
            <Button variant="contained" onClick={clearLogs}>Clear console</Button>
            </Grid>
            </Grid>
    </>

  );
};
