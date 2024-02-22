import Versions from './components/Versions'
import { GameBoard } from './components/gameBoard/GameBoard'
import { Grid,} from '@material-ui/core'
import { MinimaxConsole } from './components/minimaxConsole/MinimaxConsole';
function App() {

  return (
    <>
      <div className="creator">MiNIMAX CHESS AI</div>

      <Grid container spacing={2}>
        {/* Left Column: GameBoard */}
        <Grid item xs={7}>
            <GameBoard></GameBoard>
        </Grid>

        {/* Right Column: Hello message */}
        <Grid item xs={5}>
        <MinimaxConsole></MinimaxConsole>
        </Grid>
      </Grid>

      <Versions></Versions>
    </>
  );
}


export default App
