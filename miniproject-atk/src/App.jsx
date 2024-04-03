import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardComponent from './components/atks/DashboardComponent'
import CRUDAlatTulisKerjaComponent from './components/atks/CRUDAlatTulisKerjaComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<DashboardComponent/>}></Route>
        <Route path='/dashboard' element={<DashboardComponent/>}></Route>
        <Route path='/crud_alat' element={<CRUDAlatTulisKerjaComponent/>}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
