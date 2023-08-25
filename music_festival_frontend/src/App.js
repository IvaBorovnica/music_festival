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
import { useEffect, useState } from 'react';
import Setlist from './components/Concerts/Setlist';
import SetlistUser from './components/Band/SetlistUser';

function App() {
  const [ role, setRole ] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(() => {
    if(localStorage.getItem('token') != null) {
      setIsLoggedIn(true);
      setRole(localStorage.getItem('role'))
    }
    else setIsLoggedIn(false);
  }, localStorage.getItem('token'), localStorage.getItem('role'))

  return (
    <div className="App">
      <Router>
        <Navbar role = {role} isLoggedIn={isLoggedIn}/>
        <Routes>
        {/* <Route path='/' element={<Login/>}/> */}
        <Route path='/' element={<Login setRole={ setRole } setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>}/>
          <Route path='/login' element={<Login setRole={ setRole } setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/newBand' element={<NewBand role={ role }/>}/>
          <Route path='/bands' element={<Bands role={ role }/>}/>
          <Route path='/band/:id' element={<BandInfo role={ role }/>}/>
          <Route path='/concerts' element={<Concerts role={ role }/>}/>
          <Route path='/concert/:id' element={<ConcertInfo role={ role }/>}/>
          <Route path='/tickets' element={<Tickets role={ role }/>}/>
          <Route path='/concerts/:id' element={<SetlistUser role = {role}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
