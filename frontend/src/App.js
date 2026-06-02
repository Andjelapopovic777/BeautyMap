import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import SalonDetalji from './pages/SalonDetalji';
import Profil from './pages/Profil';

function App() {
  // Uzimamo ulogu direktno iz localStorage-a (ako postoji)
  const userRole = localStorage.getItem('role'); 
  const isLoggedIn = !!localStorage.getItem('token'); // Provera da li postoji token

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/'; // Vraća na početnu i osvežava stranicu da se apdejtuje meni
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-serif">
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
            
            <Link to="/" className="text-2xl font-black text-pink-500 tracking-tight">
              BeautyMap
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-pink-500">Početna</Link>

              {!isLoggedIn ? (
                // Šta vidi Gost
                <>
                  <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-pink-500">Prijava</Link>
                  <Link to="/register" className="text-sm font-semibold bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600">Registracija</Link>
                </>
              ) : (
                // Šta vide ulogovani (Admin vs Korisnik)
                <>
                  {userRole === 'admin' ? (
                    <>
                      <Link to="/admin" className="text-sm font-semibold text-red-500 bg-red-50 px-3 py-1.5 rounded-lg">Admin Panel</Link>
                      <button onClick={handleLogout} className="text-sm font-semibold text-red-500 hover:underline">Odjava</button>
                    </>
                  ) : (
                    <>
                      <Link to="/profil" className="text-sm font-semibold text-gray-600 hover:text-pink-500">Moj Profil</Link>
                      <button onClick={handleLogout} className="text-sm font-semibold text-red-500 hover:underline">Odjava</button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/salon/:id" element={<SalonDetalji />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profil" element={isLoggedIn ? <Profil /> : <Navigate to="/login" />} />
            <Route path="/admin" element={userRole === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;