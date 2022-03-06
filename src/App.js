import Game from './components/game/Game';
import { Routes, Route } from 'react-router-dom';
import Welcome from './components/welcome/Welcome';
import NotSignedIn from './components/not_signed_in/NotSignedIn';
import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const { player } = useSelector((state) => state.game);

  return (
    <main className='app'>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='game' element={player ? <Game /> : <NotSignedIn />} />
      </Routes>
    </main>
  );
}

export default App;
