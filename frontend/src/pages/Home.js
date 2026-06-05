import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import makazeImg from '../assets/makaze.jpg';

function Home() {
  const [saloni, setSaloni] = useState([]);
  const [pretraga, setPretraga] = useState('');
  const [loading, setLoading] = useState(true);
  

  
  
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/saloni')
      .then((res) => {
        setSaloni(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Greška pri učitavanju salona:', err);
        setLoading(false);
      });
  }, []);

  const filtriraniSaloni = saloni.filter(
    (salon) =>
      salon.name?.toLowerCase().includes(pretraga.toLowerCase()) ||
      salon.address?.toLowerCase().includes(pretraga.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
     
      <div className="flex flex-col items-center text-center mb-12">
        <img
          src={makazeImg}
          alt="BeautyMap"
          className="w-full max-w-xs object-contain mb-4"
        />

        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-3">
          NAJBOLJI FRIZERSKI SALONI U NOVOM SADU
        </h1>

        <p className="text-pink-500 text-lg max-w-2xl">
          Sve na jednom mesto. Vaš BeautyMap.
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Pretraži salone ili lokaciju..."
          value={pretraga}
          onChange={(e) => setPretraga(e.target.value)}
          className="w-full px-6 py-4 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {loading ? (
        <div className="text-center text-lg font-medium">
          Učitavanje salona...
        </div>
      ) : (
        <>
          <div className="mb-6 text-gray-500 font-medium">
            Pronađeno salona: {filtriraniSaloni.length}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtriraniSaloni.map((salon) => (
              <div
                key={salon._id}
                className="group bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="h-32 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {salon.name}
                    </h3>

                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      {salon.status}
                    </span>
                  </div>

                  <div className="space-y-3 text-gray-600">
                    <p>
                      📍 <span className="font-medium">{salon.address}</span>
                    </p>

                    <p>
                      📞 <span className="font-medium">{salon.phone}</span>
                    </p>
                  </div>

                  <div className="mt-5 bg-gray-50 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Radno vreme
                    </h4>

                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Pon–Pet: {salon.workingHours?.monFri}</p>
                      <p>Subota: {salon.workingHours?.sat}</p>
                      <p>Nedelja: {salon.workingHours?.sun}</p>
                    </div>
                  </div>

                  <Link
                    to={`/salon/${salon._id}`}
                    className="mt-6 block w-full text-center bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-2xl transition"
                  >
                    Pogledaj salon
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filtriraniSaloni.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                Nema pronađenih salona
              </h3>

              <p className="text-gray-500">
                Pokušaj sa drugim pojmom za pretragu.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;