import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { Chess } from "chess.js";
import { validateMove } from "@renderer/services/context/BoardHandler";
import { Minimax } from "../AI/Minimax";
import { clear } from "console";

interface MinimaxContextType {
    game: Chess;
    updateGame: (sourceSquare: string, targetSquare: string) => boolean;
    minimaxLog: string | undefined;
    clearLogs: () => void;
    resetGame: () => void;
  }

interface MinimaxProviderProps {
    children: ReactNode;
}

interface MinimaxEventEmitter {
    subscribe: (eventName: string, callback: (event: any) => void) => void;
    emit: (eventName: string, payload?: any) => void;
  }
  

const MinimaxContext = createContext<MinimaxContextType | undefined>(undefined);
const MinimaxEventEmitterContext = createContext<MinimaxEventEmitter | undefined>(undefined);
  
const useMinimaxEventEmitter = () => {
    const context = useContext(MinimaxEventEmitterContext);
    if (!context) {
      throw new Error("useMinimaxEventEmitter must be used within a MinimaxProvider");
    }
    return context;
  };

  export const MinimaxProvider: React.FC<MinimaxProviderProps> = ({ children }) => {
    const [game, setGame] = useState<Chess>(new Chess());
    const [isUserTurn, setIsUserTurn] = useState<boolean>(true);
    const [minimaxLog, setMinimaxLog] = useState<string>("");


    const handleMinimaxLog = (msg: string) => {
      setMinimaxLog((prevLog) => {
        return `${prevLog}\n${msg}`;
      });
    }

    const clearLogs = () => {
      setMinimaxLog("");
    }

    const minimaxEventEmitter: MinimaxEventEmitter = {
      subscribe: (eventName, callback) => {
        window.addEventListener(eventName, callback);
      },
      emit: (eventName, payload) => {
        window.dispatchEvent(new CustomEvent(eventName, { detail: payload }));
    },
    };

    const updateGame = (sourceSquare: string, targetSquare: string): boolean => {
      const isValidMove = validateMove(game, sourceSquare, targetSquare);
    
      if (isValidMove) {
        setGame((prevGame) => new Chess(prevGame.fen()));
        setIsUserTurn((prevIsUserTurn) => !prevIsUserTurn);
      } else {
        console.log('Invalid move!');
      }
    
      return isValidMove;
    };
    
    const makeAIMove = () => {
      const { move } = Minimax(3, game, -Infinity, Infinity, false, handleMinimaxLog);
    
        setGame((prevGame) => {
          const newGame = new Chess(prevGame.fen());
          newGame.move(move);
          return newGame;
        });
        setIsUserTurn((prevIsUserTurn) => !prevIsUserTurn);
      } 
    
      const resetGame = () => {
        setGame( new Chess());
        setIsUserTurn(true);
        clearLogs(); 
      }

    useEffect(() => {
      minimaxEventEmitter.emit("gameUpdated", game);
      if (!isUserTurn) {
        setTimeout(() => {}, 2000);
        makeAIMove();
      }
  }, [game]);
  
    return (
      <MinimaxContext.Provider value={{ game, updateGame, minimaxLog, clearLogs, resetGame }}>
        <MinimaxEventEmitterContext.Provider value={minimaxEventEmitter}>
          {children}
        </MinimaxEventEmitterContext.Provider>
      </MinimaxContext.Provider>
    );
  };


  export const useMinimax = () => {
    const context = useContext(MinimaxContext);
    if (!context) throw new Error("Missing profile context");
    const { game } = context;
    const [gameState, setGameState] = useState<Chess>(game);



    const minimaxEventEmitter = useMinimaxEventEmitter();

    useEffect(() => {
        minimaxEventEmitter.subscribe("gameUpdated", (event: CustomEvent<Chess>) => {
            setGameState(event.detail );
        });

    }, [minimaxEventEmitter]);

    return { context, gameState, setGameState };
};
