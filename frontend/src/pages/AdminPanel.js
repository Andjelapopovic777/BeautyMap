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
    try {
      // Uzimamo token iz localStorage
      const token = localStorage.getItem('token'); 
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // Sada šaljemo config uz svaki zahtev
      const resZahtevi = await axios.get('http://localhost:5000/api/saloni/pending', config);
      const resSaloni = await axios.get('http://localhost:5000/api/saloni/approved', config);
      const resRecenzije = await axios.get('http://localhost:5000/api/recenzije', config);
      
      setZahtevi(resZahtevi.data.data);
      setAktivniSaloni(resSaloni.data.data);
      setRecenzije(resRecenzije.data.data);
    } catch (err) {
      console.error("Greška pri dohvatanju podataka:", err);
    }
  }

  const handlePrihvatiSalon = async (id, imeSalona) => {
    try {
      await axios.put(`http://localhost:5000/api/saloni/${id}/approve`);
      alert(`Salon "${imeSalona}" je uspešno odobren.`);
      fetchData();
    } catch (err) {
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