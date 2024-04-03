import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardComponent from './components/layout/DashboardComponent';
import CRUDAlatTulisKerjaComponent from './components/atks/CRUDAlatTulisKerjaComponent';
import HeaderComponent from './components/layout/HeaderComponent';
import FooterComponent from './components/layout/FooterComponent';
import SidebarComponent from './components/layout/SidebarComponent';
import ListAtkComponent from './components/atks/ListAtkComponent';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div id='wrapper'>
        <SidebarComponent />
        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <HeaderComponent />
            <Routes>
               <Route path='/atks' element={ <ListAtkComponent />}></Route>
            </Routes>
          </div>
          <FooterComponent />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
