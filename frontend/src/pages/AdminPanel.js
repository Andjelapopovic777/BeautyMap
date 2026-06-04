import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [aktivniTab, setAktivniTab] = useState('zahtevi');
  const [zahtevi, setZahtevi] = useState([]);
  const [aktivniSaloni, setAktivniSaloni] = useState([]);
  const [recenzije, setRecenzije] = useState([]); // 1. Dodato stanje za recenzije

  useEffect(() => {
    fetchData();
  }, []);

const fetchData = async () => {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const resZahtevi = await axios.get(
      "http://localhost:5000/api/saloni/pending",
      config
    );

    setZahtevi(resZahtevi.data.data || []);
  } catch (err) {
    console.error("Greška pri učitavanju zahteva:", err);
  }

  try {
    const resSaloni = await axios.get(
      "http://localhost:5000/api/saloni/approved",
      config
    );

    setAktivniSaloni(resSaloni.data.data || []);
  } catch (err) {
    console.error("Greška pri učitavanju salona:", err);
  }

  try {
    const resRecenzije = await axios.get(
      "http://localhost:5000/api/recenzije",
      config
    );

    setRecenzije(resRecenzije.data.data || []);
  } catch (err) {
    console.log("Ruta za recenzije još nije implementirana.");
  }
};

const handlePrihvatiSalon = async (id, imeSalona) => {
    try {
      const token = localStorage.getItem('token');
      // Šaljemo PUT zahtev sa statusom u telu (body)
      await axios.put(`http://localhost:5000/api/saloni/${id}/review`, 
        { status: 'approved' }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Salon "${imeSalona}" je uspešno odobren.`);
      fetchData(); // Osveži listu
    } catch (err) {
      console.error(err);
      alert("Došlo je do greške pri odobravanju.");
    }
  };

  // 3. Dodata funkcija za brisanje recenzije
  const handleObrisiRecenziju = async (id) => {
    if (window.confirm("Da li sigurno želite da obrišete ovu recenziju?")) {
      try {
        await axios.delete(`http://localhost:5000/api/recenzije/${id}`);
        fetchData(); // Osveži listu nakon brisanja
      } catch (err) {
        alert("Greška pri brisanju recenzije.");
      }
    }
  };

  const handleObrisiSalon = async (id, imeSalona) => {

  const potvrda = window.confirm(
    `Da li sigurno želiš da obrišeš salon "${imeSalona}"?`
  );

  if (!potvrda) return;

  try {

    const token = localStorage.getItem('token');

    await axios.delete(
      `http://localhost:5000/api/saloni/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Salon uspešno obrisan.");

    fetchData();

  } catch (err) {
    console.error(err);
    alert("Greška pri brisanju salona.");
  }
};

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-[#f9fafb] min-h-screen">
      <div className="border-b border-gray-200 pb-5 mb-8">
        <h1 className="text-3xl font-black text-gray-900">Administratorski Panel</h1>
      </div>

      <div className="bg-white p-4 rounded-2xl mb-8 shadow-sm flex gap-3">
        <button onClick={() => setAktivniTab('zahtevi')} className={`px-4 py-2 rounded-xl ${aktivniTab === 'zahtevi' ? 'bg-amber-500 text-white' : 'bg-gray-100'}`}>Zahtevi ({zahtevi.length})</button>
        <button onClick={() => setAktivniTab('saloni')} className={`px-4 py-2 rounded-xl ${aktivniTab === 'saloni' ? 'bg-pink-500 text-white' : 'bg-gray-100'}`}>Saloni ({aktivniSaloni.length})</button>
        <button onClick={() => setAktivniTab('recenzije')} className={`px-4 py-2 rounded-xl ${aktivniTab === 'recenzije' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>Recenzije ({recenzije.length})</button>
      </div>

      {/* PRIKAZ TABOVA */}
      {aktivniTab === 'zahtevi' && (
        <div className="bg-white p-6 rounded-2xl">
          {zahtevi.map(z => (
            <div key={z._id} className="flex justify-between border-b p-4">
              <span>{z.name}</span>
              <button onClick={() => handlePrihvatiSalon(z._id, z.name)} className="bg-green-500 text-white px-3 py-1 rounded">Odobri</button>
            </div>
          ))}
        </div>
      )}

      {/* TAB AKTIVNI SALONI */}
      {aktivniTab === 'saloni' && (
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6">
            Odobreni saloni
          </h2>

          {aktivniSaloni.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Nema odobrenih salona.
            </p>
          ) : (
            <div className="grid gap-5">
              {aktivniSaloni.map((salon) => (
                <div
                  key={salon._id}
                  className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {salon.name}
                      </h3>

                      <p className="text-gray-600 mt-2">
                        📍 {salon.address}
                      </p>

                      <p className="text-gray-600">
                        📞 {salon.phone}
                      </p>

                      <p className="mt-2">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          Odobren
                        </span>
                      </p>

                      <div className="mt-4 text-sm text-gray-500">
                        <p>
                          Ponedeljak–Petak: {salon.workingHours?.monFri}
                        </p>

                        <p>
                          Subota: {salon.workingHours?.sat}
                        </p>

                        <p>
                          Nedelja: {salon.workingHours?.sun}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Aktivan
                      </span>
                      <button
                        onClick={() => handleObrisiSalon(salon._id, salon.name)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition"
                      >
                        Obriši
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. NOVI TAB ZA RECENZIJE */}
      {aktivniTab === 'recenzije' && (
        <div className="bg-white p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4">Moderacija recenzija</h2>
          {recenzije.map(r => (
            <div key={r._id} className="flex justify-between border-b p-4 items-center">
              <div>
                <p className="font-bold">{r.korisnik} o {r.salon}</p>
                <p className="text-sm text-gray-600">"{r.tekst}"</p>
              </div>
              <button 
                onClick={() => handleObrisiRecenziju(r._id)} 
                className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
              >
                Obriši
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;