import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Prijava pokušana za: ${email}. (U KT3 ovde povezujemo backend API!)`);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-black text-center text-gray-900 mb-2">Dobrodošli nazad</h2>
        <p className="text-center text-gray-500 mb-8 text-sm">Unesite podatke da biste pristupili profilu</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail adresa</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@gmail.com"
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
              placeholder="••••••••"
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

        <p className="text-center text-sm text-gray-600 mt-6">
          Nemate nalog? <span className="text-pink-500 font-semibold cursor-pointer hover:underline">Registrujte se</span>
        </p>
      </div>
    </div>
  );
}

export default Login;