import { HashRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './engine/GameState';
import StartScreen from './pages/StartScreen';
import MainGame from './pages/MainGame';
import './index.css';

function App() {
  return (
    <GameProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/play" element={<MainGame />} />
        </Routes>
      </HashRouter>
    </GameProvider>
  );
}

export default App;
