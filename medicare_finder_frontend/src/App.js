import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import RegisterPharmacy from './pages/Pharmacy/RegisterPharmacy';
import Pharmacies from './pages/Pharmacy/Pharmacies';
import PharmacyProfile from './pages/Pharmacy/PharmacyProfile';
import Login from './pages/Login/Login';
import Medicine from './pages/Medicine/Medicine';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/pharmacy' element={<RegisterPharmacy/>} />
        <Route path='/pharmacies' element={<Pharmacies/>} />
        <Route path='/pharmacy/:id' element={<PharmacyProfile/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/medicines' element={<Medicine/>} />
        
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
