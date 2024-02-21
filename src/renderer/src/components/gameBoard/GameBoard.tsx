// GameBoard.tsx

import React, { useState, useEffect } from 'react';
import {updateGame, getAllPossibleMoves } from './BoardHandler';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

export const GameBoard: React.FC = () => {
    const [game, setGame] = useState<Chess>(new Chess());

    useEffect(() => {
        const possibleMoves = getAllPossibleMoves(game);
        console.log(possibleMoves);
    }, [game]);

    return (
        <div>
            <Chessboard
                position={game.fen()}
                onPieceDrop={(sourceSquare, targetSquare) => updateGame(setGame, game, sourceSquare, targetSquare)}
                boardWidth={600}
            />
        </div>
    );
};
