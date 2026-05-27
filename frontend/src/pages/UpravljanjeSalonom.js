import React, { useState } from 'react';

function UpravljanjeSalonom() {
  // Podaci o salonu koji se mogu menjati (CRUD - Update/Delete/Create za usluge)
  const [salon, setSalon] = useState({
    naziv: 'Beauty Corner',
    lokacija: 'Novo Naselje, Novi Sad',
    radnoVreme: 'Pon - Pet: 09:00 - 20:00 | Sub: 09:00 - 17:00 | Ned: 10:00 - 15:00',
    usluge: [
      { id: 1, naziv: 'Žensko šišanje', cena: '1.500' },
      { id: 2, naziv: 'Svečana frizura', cena: '3.000' },
      { id: 3, naziv: 'Manikir + gel lak', cena: '1.800' }
    ]
  });

  // Stanje za novu uslugu koju vlasnik želi da doda
  const [novaUsluga, setNovaUsluga] = useState({ naziv: '', cena: '' });

  // 1. Akcija: Izmena tekstualnih polja salona
  const handleSalonChange = (e) => {
    setSalon({ ...salon, [e.target.name]: e.target.value });
  };

  // 2. Akcija: Izmena cene postojeće usluge direktno u listi
  const handleCenaChange = (id, novaCena) => {
    const izmenjeneUsluge = salon.usluge.map(u => 
      u.id === id ? { ...u, cena: novaCena } : u
    );
    setSalon({ ...salon, usluge: izmenjeneUsluge });
  };

  // 3. Akcija: Dodavanje nove usluge (Create u CRUD-u)
  const handleDodajUslugu = (e) => {
    e.preventDefault();
    if (!novaUsluga.naziv || !novaUsluga.cena) return;
    
    const nova = {
      id: Date.now(), // Privremeni ID dok ne stigne baza
      naziv: novaUsluga.naziv,
      cena: novaUsluga.cena
    };

    setSalon({
      ...salon,
      usluge: [...salon.usluge, nova]
    });
    setNovaUsluga({ naziv: '', cena: '' }); // Resetuj inpute
    alert("Usluga je uspešno dodata!");
  };

  // 4. Akcija: Brisanje usluge (Delete u CRUD-u)
  const handleObrisiUslugu = (id) => {
    if (window.confirm("Da li želite da obrišete ovu uslugu?")) {
      const filtriraneUsluge = salon.usluge.filter(u => u.id !== id);
      setSalon({ ...salon, usluge: filtriraneUsluge });
    }
  };

  const handleSacuvajSve = () => {
    alert("Sve izmene na salonu su uspešno sačuvane u bazi podataka!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-[#f9fafb] min-h-screen">
      
      {/* GLAVNA TRAKA SA AKCIJAMA */}
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">Upravljačka tabla</span>
          <h1 className="text-xl font-black text-gray-900">Uređivanje Vašeg salona</h1>
        </div>
        <button 
          onClick={handleSacuvajSve}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-6 rounded-xl transition shadow-md shadow-green-100"
        >
          Sačuvaj sve izmene
        </button>
      </div>

      {/* DIZAJN KOJI JE IDENTIČAN STRANICI SALONA */}
      <div className="space-y-6">
        
        {/* Naziv i Lokacija (Sada su inputi koji izgledaju kao tekst) */}
        <div className="space-y-2">
          <input 
            type="text"
            name="naziv"
            value={salon.naziv}
            onChange={handleSalonChange}
            className="text-3xl md:text-4xl font-extrabold text-gray-950 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-pink-500 focus:outline-none w-full font-serif"
          />
          <div className="flex items-center text-pink-500 gap-1">
            📍 
            <input 
              type="text"
              name="lokacija"
              value={salon.lokacija}
              onChange={handleSalonChange}
              className="text-sm font-medium bg-transparent border-b border-transparent hover:border-gray-300 focus:border-pink-500 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Radno vreme box */}
        <div className="bg-pink-50 border border-pink-100 p-4 rounded-2xl">
          <label className="block text-xs font-bold text-pink-700 uppercase mb-1">Radno vreme:</label>
          <input 
            type="text"
            name="radnoVreme"
            value={salon.radnoVreme}
            onChange={handleSalonChange}
            className="w-full bg-transparent text-sm text-gray-800 font-medium focus:outline-none focus:border-b focus:border-pink-500"
          />
        </div>

        <p className="text-gray-600 text-sm">
          Sve vrste frizerskih i kozmetičkih usluga na jednom mestu. Profesionalni tim stilista brine o Vašem izgledu.
        </p>

        {/* REŠETKA: Usluge (Levo) vs Recenzije (Desno) */}
        <div className="grid md:grid-cols-2 gap-8 pt-4">
          
          {/* LEVA STRANA: USLUGE I CENOVNIK (Sa CRUD kontrolama) */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-bold mb-6 text-gray-900">Usluge i cenovnik</h2>
            
            {/* Lista postojećih usluga */}
            <div className="space-y-4 mb-8">
              {salon.usluge.map((usluga) => (
                <div key={usluga.id} className="flex justify-between items-center group border-b border-gray-50 pb-2">
                  <span className="text-gray-700 font-medium">{usluga.naziv}</span>
                  <div className="flex items-center gap-3">
                    {/* Input za brzu izmenu cene */}
                    <div className="flex items-center text-pink-500 font-bold">
                      <input 
                        type="text"
                        value={usluga.cena}
                        onChange={(e) => handleCenaChange(usluga.id, e.target.value)}
                        className="w-16 text-right bg-transparent border-b border-transparent hover:border-gray-300 focus:border-pink-500 focus:outline-none font-bold text-pink-500 mr-1"
                      />
                      <span>RSD</span>
                    </div>
                    {/* Dugme za brisanje usluge */}
                    <button 
                      onClick={() => handleObrisiUslugu(usluga.id)}
                      className="text-gray-300 hover:text-red-500 transition text-xs p-1"
                      title="Obriši uslugu"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* FORMA ZA DODAVANJE NOVE USLUGE (Create) */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Dodaj novu uslugu</h3>
              <form onSubmit={handleDodajUslugu} className="space-y-3">
                <input 
                  type="text"
                  placeholder="Naziv usluge (npr. Feniranje)"
                  value={novaUsluga.naziv}
                  onChange={(e) => setNovaUsluga({ ...novaUsluga, naziv: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <div className="flex gap-2">
                  <input 
                    type="text"
                    placeholder="Cena (npr. 1.200)"
                    value={novaUsluga.cena}
                    onChange={(e) => setNovaUsluga({ ...novaUsluga, cena: e.target.value })}
                    className="flex-1 px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <button 
                    type="submit"
                    className="bg-pink-500 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-pink-600 transition"
                  >
                    Dodaj +
                  </button>
                </div>
              </form>
            </div>

          </div>

          {/* DESNA STRANA: RECENZIJE KORISNIKA (ZAKLJUČANE) */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit opacity-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recenzije korisnika</h2>
              <span className="bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-full text-xs">⭐ 4.7</span>
            </div>
            
            <p className="text-sm text-gray-400 italic mb-6">
              Ovaj salon još uvek nema recenzija. Budite prvi!
            </p>

            {/* Blokada obaveštenja - Biznis logika */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-center text-xs text-gray-500">
              🔒 Kao vlasnik salona, ne možete sami sebi ostavljati niti menjati ocene i recenzije korisnika.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default UpravljanjeSalonom;