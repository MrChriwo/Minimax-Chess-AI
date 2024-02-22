import { Chess } from "chess.js";
import { getAllPossibleMoves } from "../context/BoardHandler";

const pieceValues = {
  p: 1,  // pawn
  n: 3,  // knight
  b: 3,  // bishop
  r: 5,  // rook
  q: 9,  // queen
  k: 10  // king
};

const evaluateBoard = (game: Chess) => {
  const board = game.board();
  let score = 0;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece) {
        const pieceType = piece.type.toLowerCase();
        const pieceColor = piece.color === 'w' ? 'white' : 'black';
        const pieceValue = pieceValues[pieceType];

        if (pieceColor === 'black') {
          score -= pieceValue;
        } else {
          score += pieceValue;
        }
      }
    }
  }

  return score;
};

interface MinimaxResult {
    move: string;
    score: number;
  }
  
  export const Minimax = (
    depth: number,
    game: Chess,
    alpha: number = -Infinity,
    beta: number = Infinity,
    isMaximising: boolean = false,
    logMessage?: (msg: string) => void
  ): MinimaxResult => {

    if (depth === 0) {
      const score = evaluateBoard(game);
      return { move: "", score };
    }
  
    const moves = getAllPossibleMoves(game);
    logMessage && logMessage(`Depth: ${depth}, Possible Moves: ${moves.length}`);
  
    let bestMove: string | null = null;
    let bestScore: number = isMaximising ? -Infinity : Infinity;
  
    if (isMaximising) {
      let maxEval: number = -Infinity;
      for (const move of moves) {
        logMessage && logMessage(`Depth: ${depth}, Move: ${move}`);

        const clonedGame = new Chess(game.fen());
        clonedGame.move(move);
        const evaluation = Minimax(depth - 1, clonedGame, alpha, beta, false, logMessage);
        logMessage && logMessage(`Depth: ${depth}, Move: ${move}, Evaluation: ${evaluation.score}`);
        if (typeof evaluation === 'object') {
          if (evaluation.score > maxEval) {
            logMessage && logMessage(`Depth: ${depth}, Move: ${move}, New Max: ${evaluation.score}`);
            maxEval = evaluation.score;
            bestScore = maxEval;
            bestMove = move;
          }
          alpha = Math.max(alpha, maxEval);
          if (beta <= alpha) {
            logMessage && logMessage(`Depth: ${depth}, Move: ${move}, Pruning`);
            break;
          }
        }
      }
      if (bestMove && bestScore) {
        logMessage && logMessage(`Depth: ${depth}, Best Move: ${bestMove}, Best Max: ${maxEval}`);
      }

      return { move: bestMove || "", score: maxEval };

    } else {
      let minEval: number = Infinity;
      for (const move of moves) {
        logMessage && logMessage(`Depth: ${depth}, Move: ${move}`);
        const clonedGame = new Chess(game.fen());
        clonedGame.move(move);
        const evaluation = Minimax(depth - 1, clonedGame, alpha, beta, true, logMessage);
        logMessage && logMessage(`Depth: ${depth}, Move: ${move}, Evaluation: ${evaluation.score}`);
        if (typeof evaluation === 'object') {
          if (evaluation.score < minEval) {
            logMessage && logMessage(`Depth: ${depth}, Move: ${move}, New Min: ${evaluation.score}`);
            minEval = evaluation.score;
            bestMove = move;
          }
          beta = Math.min(beta, minEval);
          if (beta <= alpha) {
            logMessage && logMessage(`Depth: ${depth}, Move: ${move}, Pruning`);
            break;
          }
        }
      }
      if (bestMove && bestScore) {
        logMessage && logMessage(`Depth: ${depth}, Best Move: ${bestMove}, Best Min: ${minEval}`);
      }
      return { move: bestMove || "", score: minEval };
    }
  };
  