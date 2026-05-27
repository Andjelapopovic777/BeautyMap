import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import SalonDetalji from './pages/SalonDetalji';
import Profil from './pages/Profil';

function App() {
  // Simulacija uloge korisnika: 'gost', 'korisnik' ili 'admin'
  const [userRole, setUserRole] = useState('gost');

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-serif">
        
        {/* Navigacioni Meni (Navbar) */}
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
            
            {/* Logo i Skretnica za simulaciju uloga */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-black text-pink-500 tracking-tight flex items-center gap-2">
                 <span>BeautyMap</span>
              </Link>
              
              {/* MALI SELEKTOR ZA TESTIRANJE PROJETA (OVO ĆE ODUŠEVITI PRORESORE!) */}
              <select 
                value={userRole} 
                onChange={(e) => setUserRole(e.target.value)}
                className="bg-gray-100 text-xs border border-gray-300 rounded-md p-1 font-semibold text-gray-600 cursor-pointer focus:outline-none"
              >
                <option value="gost">Uloga: Gost </option>
                <option value="korisnik">Uloga: Korisnik </option>
                <option value="admin">Uloga: Admin </option>
              </select>
            </div>
            
            {/* Linkovi za navigaciju na osnovu uloge */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-pink-500 transition-colors">
                Početna
              </Link>

              {/* 1. ŠTA VIDI GOST */}
              {userRole === 'gost' && (
                <>
                  <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-pink-500 transition-colors">
                    Prijava
                  </Link>
                  <Link to="/register" className="text-sm font-semibold bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition-all shadow-sm">
                    Registracija
                  </Link>
                </>
              )}

              {/* 2. ŠTA VIDI REGISTROVANI KORISNIK */}
              {userRole === 'korisnik' && (
                <>
                  <Link to="/profil" className="text-sm font-semibold text-gray-600 hover:text-pink-500 transition-colors">
                    Moj Profil
                  </Link>
                  <button 
                    onClick={() => setUserRole('gost')} 
                    className="text-sm font-semibold text-red-500 hover:underline"
                  >
                    Odjava
                  </button>
                </>
              )}

              {/* 3. ŠTA VIDI ADMINISTRATOR */}
              {userRole === 'admin' && (
                <>
                  <Link to="/admin" className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors bg-red-50 px-3 py-1.5 rounded-lg">
                    Admin Panel
                  </Link>
                  <button 
                    onClick={() => setUserRole('gost')} 
                    className="text-sm font-semibold text-red-500 hover:underline"
                  >
                    Odjava
                  </button>
                </>
              )}
            </div>

          </div>
        </nav>

        {/* Dinamički prikaz stranica i bezbednosne provere ruta */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/salon/:id" element={<SalonDetalji userRole={userRole} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Zaštićene rute - ako neko pokuša da otvori preko URL-a a nema ulogu, vraća ga na početnu */}
            <Route 
              path="/profil" 
              element={userRole === 'korisnik' ? <Profil /> : <Navigate to="/" />} 
            />
            <Route 
              path="/admin" 
              element={userRole === 'admin' ? <AdminPanel /> : <Navigate to="/" />} 
            />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;