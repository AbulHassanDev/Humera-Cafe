import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'; // Corrected the import path
import Menu from './Pages/Menu';
import Reservation from './Pages/Reservation'
import Reviews from './Pages/Reviews';
import Contact from './Pages/Contact';

const App = () => {
  return (
    <div className='bg-zinc-900'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/reservation' element={<Reservation />} />
          <Route path='/reviews' element={<Reviews />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
