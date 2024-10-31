import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'; // Corrected the import path
import "./App.css";
import AuthForm from './Pages/AuthForm';

const App = () => {
  return (
    <div className='bg-zinc-950'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />   
          <Route path='/auth' element={<AuthForm />} />   
               
        </Routes>
      </Router>
    </div>
  );
}

export default App;
