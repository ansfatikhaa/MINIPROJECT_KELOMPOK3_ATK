import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import DashboardComponent from './components/layout/DashboardComponent';
// import CRUDAlatTulisKerjaComponent from './components/atks/CRUDAlatTulisKerjaComponent';
import HeaderComponent from './components/layout/HeaderComponent';
import FooterComponent from './components/layout/FooterComponent';
import SidebarComponent from './components/layout/SidebarComponent';
import ListAtkComponent from './components/atks/ListAtkComponent';
import ChartComponent from './components/layout/ChartComponent';
import './App.css';
import ListKaryawanComponent from './components/karyawans/ListKaryawanComponent';
import LoginComponent from './components/login/LoginComponent';
import TransaksiPenjualan from './components/penjualans/TransaksiPenjualan';
import ListPenjualanComponent from './components/penjualans/ListPenjualanComponent';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <BrowserRouter>
      <div id='wrapper'>
        {/* SidebarComponent hanya ditampilkan jika pengguna sudah login */}
        <SidebarComponent isLoggedIn={isLoggedIn} />
        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            {/* HeaderComponent hanya ditampilkan jika pengguna sudah login */}
            <HeaderComponent isLoggedIn={isLoggedIn} />
            <Routes>
              {/* Route untuk halaman login */}
              <Route
                path='/'
                element={isLoggedIn ? <Navigate to='/chart' /> : <LoginComponent onLogin={handleLogin} />}
              />
              {/* Route untuk halaman chart (hanya dapat diakses setelah login) */}
              <Route path='/chart' element={isLoggedIn ? <ChartComponent /> : <Navigate to='/' />} />
              {/* Route untuk halaman atks (hanya dapat diakses setelah login) */}
              <Route path='/atks' element={isLoggedIn ? <ListAtkComponent /> : <Navigate to='/' />} />
              {/* Route untuk halaman karyawan (hanya dapat diakses setelah login) */}
              <Route path='/karyawan' element={isLoggedIn ? <ListKaryawanComponent /> : <Navigate to='/' />} />
              <Route path='/transaksi' element={isLoggedIn ? <TransaksiPenjualan /> : <Navigate to='/' />} />
              <Route path='/riwayat-penjualan' element={isLoggedIn ? <ListPenjualanComponent /> : <Navigate to='/' />} />
            </Routes>
          </div>
          <FooterComponent />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
