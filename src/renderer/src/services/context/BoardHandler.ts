import { Chess } from "chess.js";


export const validateMove = (game: Chess, sourceSquare: string, targetSquare: string): boolean => {
    const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
    });

    return move !== null;
};

export const updateGame = (setGame: React.Dispatch<React.SetStateAction<Chess>>, game: Chess, sourceSquare: string, targetSquare: string) => {
    const isValidMove = validateMove(game, sourceSquare, targetSquare);

    if (isValidMove) {
        setGame(new Chess(game.fen()));
    } else {
        console.log('Invalid move!');
    }
};

export const getAllPossibleMoves = (game: Chess): string[] => {
    return game.moves();
};