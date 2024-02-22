import { Chess } from "chess.js";


export const validateMove = (game: Chess, sourceSquare: string, targetSquare: string): boolean => {
    const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
    });

    return move !== null;
};

export const getAllPossibleMoves = (game: Chess): string[] => {

    return game.moves({verbose: true}).map((move) => {
        move.color === 'b' ? move : null;
        return  move.san;
    }
    );
}   