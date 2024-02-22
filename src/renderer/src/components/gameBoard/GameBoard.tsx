// GameBoard.tsx

import React, { useState, useEffect } from 'react';
import {updateGame, getAllPossibleMoves } from './BoardHandler';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { Grid } from '@material-ui/core';

export const GameBoard: React.FC = () => {
    const [game, setGame] = useState<Chess>(new Chess());

    useEffect(() => {
        const possibleMoves = getAllPossibleMoves(game);
        console.log(possibleMoves);
    }, [game]);

    return (
        <Grid>
            <Chessboard
                position={game.fen()}
                onPieceDrop={(sourceSquare, targetSquare) => updateGame(setGame, game, sourceSquare, targetSquare)}
                boardWidth={600}
            />
        </Grid>
    );
};
