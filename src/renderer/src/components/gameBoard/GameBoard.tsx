
import React from 'react';
import { useMinimax } from '@renderer/services/context/MinimaxProvider';
import { Chessboard } from 'react-chessboard';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';

export const GameBoard: React.FC = () => {
    const { gameState } = useMinimax();
    const {updateGame, resetGame} = useMinimax().context;

    return (
        <>
        <Grid>
            <Chessboard
                position={gameState.fen()}
                onPieceDrop={(sourceSquare, targetSquare) => updateGame(sourceSquare, targetSquare)}
                boardWidth={600}
            />
        </Grid>
        <div>
        <Button variant="contained" onClick={resetGame}>Reset game</Button>
        </div>
        </>
    );
};
