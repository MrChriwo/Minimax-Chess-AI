import Versions from './components/Versions'
import { GameBoard } from './components/gameBoard/GameBoard'
function App() {

  return (
    <>
      <div className="creator">Powered by electron-vite</div>
      <div className='chess'>
        <GameBoard></GameBoard>
      </div>

      <Versions></Versions>
    </>
  )
}

export default App
