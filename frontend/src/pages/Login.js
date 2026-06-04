import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      console.log("Uspeh:", res.data);
      
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);

        localStorage.setItem(
          'user',
          JSON.stringify({
            id: res.data._id,
            name: res.data.name,
            email: res.data.email,
            role: res.data.role
          })
        );

      alert('Uspešna prijava!');

      // Pametno preusmeravanje na osnovu uloge
      if (res.data.role === 'admin') {
        window.location.href = '/';
      } else {
        window.location.href = '/';
      }
      
    } catch (err) {
      console.error("Greška:", err);
      setError(err.response?.data?.message || 'Greška pri prijavi. Proverite podatke.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-black text-center text-gray-900 mb-2">Dobrodošli nazad</h2>
        
        {error && <p className="text-red-500 text-sm text-center mb-4 font-bold">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail adresa</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Lozinka</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-600 shadow-md hover:shadow-lg transition-all"
          >
            Prijavi se
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;