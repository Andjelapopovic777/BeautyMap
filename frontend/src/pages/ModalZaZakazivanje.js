import React, { useState } from 'react';

function ModalZaZakazivanje({ isOpen, onClose, imeSalona = "Beauty Corner" }) {
  const [odabranaUsluga, setOdabranaUsluga] = useState('');
  const [odabraniDatum, setOdabraniDatum] = useState('');
  const [odabranoVreme, setOdabranoVreme] = useState('');

  // Ako modal nije otvoren, ne prikazuj ništa
  if (!isOpen) return null;

  const usluge = [
    { id: 1, naziv: 'Žensko šišanje', cena: '1.500 RSD', trajanje: '45 min' },
    { id: 2, naziv: 'Svečana frizura', cena: '3.000 RSD', trajanje: '60 min' },
    { id: 3, naziv: 'Manikir + gel lak', cena: '1.800 RSD', trajanje: '45 min' }
  ];

  const slobodniTermini = ['09:00', '10:00', '11:30', '13:00', '14:30', '16:00', '17:30'];

  const handlePotvrdi = (e) => {
    e.preventDefault();
    if (!odabranaUsluga || !odabraniDatum || !odabranoVreme) {
      alert('Molimo vas da selektujete sve podatke.');
      return;
    }
    const selektovana = usluge.find(u => u.id === parseInt(odabranaUsluga));
    alert(`🎉 Uspešno zakazano!\n\nSalon: ${imeSalona}\nUsluga: ${selektovana.naziv}\nDatum: ${odabraniDatum}\nVreme: ${odabranoVreme}`);
    onClose(); // Zatvori modal nakon uspešnog zakazivanja
  };

  return (
    // Pozadina koja zatamnjuje ekran
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      
      {/* Kontejner modala */}
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-full max-w-md relative animate-fade-in">
        
        {/* Dugme za zatvaranje (X) u gornjem desnom uglu */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-pink-200 text-xl font-bold z-10"
        >
          ✕
        </button>

        {/* Zaglavlje */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6 text-white text-center">
          <h3 className="text-xl font-bold">Zakažite svoj termin</h3>
          <p className="text-xs text-pink-100 mt-1">Salon: <span className="font-semibold">{imeSalona}</span></p>
        </div>

        {/* Forma */}
        <form onSubmit={handlePotvrdi} className="p-6 space-y-5">
          
          {/* 1. Odabir usluge */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">1. Izaberite uslugu</label>
            <select 
              value={odabranaUsluga}
              onChange={(e) => setOdabranaUsluga(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 font-medium"
            >
              <option value="">-- Izaberite uslugu --</option>
              {usluge.map(u => (
                <option key={u.id} value={u.id}>{u.naziv} - {u.cena}</option>
              ))}
            </select>
          </div>

          {/* 2. Odabir datuma */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">2. Izaberite datum</label>
            <input 
              type="date" 
              value={odabraniDatum}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setOdabraniDatum(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500 font-medium"
            />
          </div>

          {/* 3. Odabir satnice */}
          {odabraniDatum && (
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">3. Slobodni termini</label>
              <div className="grid grid-cols-4 gap-2">
                {slobodniTermini.map((vreme, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setOdabranoVreme(vreme)}
                    className={`py-2 rounded-lg font-bold text-xs text-center border transition ${
                      odabranoVreme === vreme
                        ? 'bg-pink-600 border-pink-600 text-white'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-pink-500'
                    }`}
                  >
                    {vreme}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dugmad na dnu */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl text-sm transition"
            >
              Otkaži
            </button>
            <button
              type="submit"
              className="w-2/3 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-md"
            >
              Potvrdi 
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ModalZaZakazivanje;