import { useState } from 'react'

function Versions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions)

  return (
    <ul className="versions">
      <li className="ChessAI">ChessAI v{1.0}</li>
      <li className="developer">state dev</li>
      <li className="GitHub">GitHub MrChriwo</li>
    </ul>
  )
}

export default Versions
