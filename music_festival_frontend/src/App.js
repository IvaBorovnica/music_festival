import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NewBand from './components/Band/NewBand';
import Bands from './components/Band/Bands';
import BandInfo from './components/Band/BandInfo';
import Concerts from './components/Concerts/Concerts';
import ConcertInfo from './components/Concerts/ConcertInfo';
import Tickets from './components/Concerts/Tickets';

function App() {


  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
        <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/newBand' element={<NewBand/>}/>
          <Route path='/bands' element={<Bands/>}/>
          <Route path='/band/:id' element={<BandInfo/>}/>
          <Route path='/concerts' element={<Concerts/>}/>
          <Route path='/concert/:id' element={<ConcertInfo/>}/>
          <Route path='/tickets' element={<Tickets/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
