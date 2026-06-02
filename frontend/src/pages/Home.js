import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import makazeImg from '../assets/makaze.jpg'; // Proveri putanju!

function Home() {
  const [saloni, setSaloni] = useState([]); // Sada je niz prazan, puni se iz baze
  const [pretraga, setPretraga] = useState('');
  const [loading, setLoading] = useState(true);

  // Učitavanje salona sa servera
  useEffect(() => {
    axios.get('http://localhost:5000/api/saloni')
      .then(res => {
        setSaloni(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Greška pri učitavanju salona:", err);
        setLoading(false);
      });
  }, []);

  // Pretraga (radi isto, ali nad podacima iz baze)
  const filtriraniSaloni = saloni.filter(salon =>
    salon.naziv.toLowerCase().includes(pretraga.toLowerCase()) ||
    salon.lokacija.toLowerCase().includes(pretraga.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-0">
      {/* Hero sekcija (ostaje ista) */}
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <img src={makazeImg} alt="BeautyMap logo" className="w-full max-w-xs h-auto object-contain mb-2" />
        <h1 className="text-3xl md:text-6xl font-extrabold text-gray-950 mb-4">NAJBOLJI FRIZERSKI SALON U NOVOM SADU</h1>
      </div>

      {/* Pretraga */}
      <div className="max-w-md mx-auto mb-12">
        <input
          type="text"
          placeholder="Pretraži salone..."
          value={pretraga}
          onChange={(e) => setPretraga(e.target.value)}
          className="w-full px-6 py-3 rounded-full border border-gray-100 shadow-md focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Grid sa salonima */}
      {loading ? (
        <p className="text-center">Učitavanje podataka iz baze...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtriraniSaloni.map((salon) => (
            <div key={salon._id} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <img src={salon.slika} alt={salon.naziv} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{salon.naziv}</h3>
                <p className="text-pink-600 mb-3">📍 {salon.lokacija}</p>
                {/* Koristimo _id jer ga MongoDB koristi */}
                <Link to={`/salon/${salon._id}`} className="block text-center w-full bg-gray-950 text-white py-2.5 rounded-xl">
                  Pogledaj salon
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;