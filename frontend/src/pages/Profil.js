import React, { useState } from 'react';

function Profil() {
  const [prikaziFormu, setPrikaziFormu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [statusSalona, setStatusSalona] = useState('odobren'); 

  // Kompletan objekat sa podacima i uslugama koji se prikazuje na "stranici" salona
  const [salonData, setSalonData] = useState({
    imeSalona: 'Beauty Corner',
    lokacija: 'Telep, Novi Sad',
    radnoVreme: 'Pon - Pet: 09:00 - 20:00 | Sub: 09:00 - 17:00 | Ned: 10:00 - 15:00',
    opisSalona: 'Sve vrste frizerskih i kozmetičkih usluga na jednom mestu. Profesionalni tim stilista brine o Vašem izgledu.', // OVO SE SADA MENJA
    usluge: [
      { id: 1, naziv: 'Žensko šišanje', cena: '1.500' },
      { id: 2, naziv: 'Svečana frizura', cena: '3.000' },
      { id: 3, naziv: 'Manikir + gel lak', cena: '1.800' }
    ]
  });

  const [novaUsluga, setNovaUsluga] = useState({ naziv: '', cena: '' });

  const handleSalonChange = (e) => {
    setSalonData({ ...salonData, [e.target.name]: e.target.value });
  };

  const handleCenaChange = (id, novaCena) => {
    const izmenjene = salonData.usluge.map(u => u.id === id ? { ...u, cena: novaCena } : u);
    setSalonData({ ...salonData, usluge: izmenjene });
  };

  const handleNazivUslugeChange = (id, noviNaziv) => {
    const izmenjene = salonData.usluge.map(u => u.id === id ? { ...u, naziv: noviNaziv } : u);
    setSalonData({ ...salonData, usluge: izmenjene });
  };

  const handleDodajUslugu = (e) => {
    e.preventDefault();
    if (!novaUsluga.naziv || !novaUsluga.cena) return;
    const nova = { id: Date.now(), naziv: novaUsluga.naziv, cena: novaUsluga.cena };
    setSalonData({ ...salonData, usluge: [...salonData.usluge, nova] });
    setNovaUsluga({ naziv: '', cena: '' });
  };

  const handleObrisiUslugu = (id) => {
    if (window.confirm("Obriši ovu uslugu?")) {
      setSalonData({ ...salonData, usluge: salonData.usluge.filter(u => u.id !== id) });
    }
  };

  if (prikaziFormu) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button onClick={() => setPrikaziFormu(false)} className="text-gray-500 hover:text-pink-500 mb-4 transition flex items-center gap-2">← Nazad</button>
        <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Registrujte svoj salon</h2>
          <form onSubmit={(e) => { e.preventDefault(); setStatusSalona('na_cekanju'); setPrikaziFormu(false); }} className="space-y-4">
            
            {/* Ime salona */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Ime salona</label>
              <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200" placeholder="npr. Beauty Corner" />
            </div>

            {/* Ime vlasnika */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Ime vlasnika</label>
              <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200" placeholder="npr. Milica Jovanović" />
            </div>

            {/* Lokacija salona */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Lokacija salona</label>
              <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200" placeholder="npr. Petrovaradin, Novi Sad" />
            </div>

            {/* Broj telefona */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Broj telefona</label>
              <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200" placeholder="npr. 0641234567" />
            </div>

            <button type="submit" className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600 transition">Pošalji zahtev</button>
          </form>
        </div>
      </div>
    );
  }

  // =========================================================================
  // NAPREDNA STRANICA ZA IZMENU (Replika pravog salona sa slike!)
  // =========================================================================
  if (isEditing) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 bg-[#f9fafb] min-h-screen">
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <button onClick={() => setIsEditing(false)} className="text-gray-600 hover:text-pink-500 font-bold transition">← Nazad na profil</button>
          <button onClick={() => { setIsEditing(false); alert("Sve izmene na salonu, opisu i cenovniku su sačuvane!"); }} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-xl transition shadow-md">
            Sačuvaj izmene
          </button>
        </div>

        <div className="space-y-6">
          {/* Naziv salona */}
          <div>
            <label className="text-xs font-bold text-gray-400 block uppercase ml-1">Naziv salona</label>
            <input 
              type="text" 
              name="imeSalona" 
              value={salonData.imeSalona} 
              onChange={handleSalonChange}
              className="text-4xl font-extrabold text-gray-950 bg-transparent border-b-2 border-dashed border-gray-200 focus:border-pink-500 focus:outline-none w-full pb-1"
            />
          </div>

          {/* Lokacija */}
          <div className="flex flex-col w-full">
            <label className="text-xs font-bold text-gray-400 block uppercase ml-1">Lokacija</label>
            <div className="flex items-center text-pink-500 gap-1">
              <span className="text-xl">📍</span>
              <input 
                type="text" 
                name="lokacija" 
                value={salonData.lokacija} 
                onChange={handleSalonChange}
                className="text-base font-bold text-pink-600 bg-transparent border-b border-dashed border-gray-200 focus:border-pink-500 focus:outline-none w-full"
              />
            </div>
          </div>

          {/* Radno vreme box */}
          <div className="bg-pink-50/60 border border-pink-100 p-4 rounded-xl">
            <label className="block text-xs font-bold text-pink-700 uppercase mb-1">Radno vreme:</label>
            <input 
              type="text" 
              name="radnoVreme" 
              value={salonData.radnoVreme} 
              onChange={handleSalonChange}
              className="w-full bg-transparent text-sm text-gray-800 font-medium focus:outline-none focus:border-b border-pink-300"
            />
          </div>

          {/* OPIS SALONA (Sada je input/textarea polje koje gazda menja!) */}
          <div className="w-full">
            <label className="text-xs font-bold text-gray-400 block uppercase ml-1 mb-1">Opis salona</label>
            <textarea 
              name="opisSalona"
              value={salonData.opisSalona} 
              onChange={handleSalonChange}
              rows="2"
              className="w-full bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              placeholder="Unesite kratak opis salona..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-4">
            {/* LEVA STRANA: USLUGE I CENOVNIK */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit">
              <h2 className="text-2xl font-black mb-6 text-gray-900">Usluge i cenovnik</h2>
              
              <div className="space-y-4 mb-6">
                {salonData.usluge.map((usluga) => (
                  <div key={usluga.id} className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <input 
                      type="text"
                      value={usluga.naziv}
                      onChange={(e) => handleNazivUslugeChange(usluga.id, e.target.value)}
                      className="text-gray-800 font-medium bg-transparent focus:outline-none focus:border-b border-gray-300 w-1/2"
                    />
                    <div className="flex items-center gap-2">
                      <input 
                        type="text"
                        value={usluga.cena}
                        onChange={(e) => handleCenaChange(usluga.id, e.target.value)}
                        className="w-16 text-right bg-transparent font-bold text-pink-500 focus:outline-none focus:border-b border-gray-300"
                      />
                      <span className="font-bold text-pink-500 text-sm">RSD</span>
                      <button type="button" onClick={() => handleObrisiUslugu(usluga.id)} className="text-red-500 ml-2 hover:scale-110 transition">❌</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* DODAVANJE NOVE USLUGE */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mt-4">
                <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Dodaj novu uslugu u cenovnik:</h4>
                <div className="flex flex-col md:flex-row gap-2">
                  <input 
                    type="text" 
                    placeholder="Naziv (npr. Feniranje)" 
                    value={novaUsluga.naziv}
                    onChange={(e) => setNovaUsluga({...novaUsluga, naziv: e.target.value})}
                    className="flex-1 p-2 bg-white border border-gray-200 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                  <input 
                    type="text" 
                    placeholder="Cena (RSD)" 
                    value={novaUsluga.cena}
                    onChange={(e) => setNovaUsluga({...novaUsluga, cena: e.target.value})}
                    className="w-24 p-2 bg-white border border-gray-200 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                  <button onClick={handleDodajUslugu} className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition">
                    Dodaj +
                  </button>
                </div>
              </div>
            </div>

            {/* DESNA STRANA: RECENZIJE KORISNIKA */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit opacity-75">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Recenzije korisnika</h2>
                <span className="bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full text-xs">⭐ 4.7</span>
              </div>
              <p className="text-sm text-gray-400 italic mb-4">Ovaj salon još uvek nema recenzija. Budite prvi!</p>
              <div className="p-3 bg-gray-50 rounded-xl text-center text-xs text-gray-500 border border-gray-200">
                🔒 Recenzije i ocene su zaključane. Vlasnik ne može da ih menja radi zaštite objektivnosti.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // GLAVNI PROFIL
  // =========================================================================
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gray-100 p-2 rounded-xl mb-6 flex flex-wrap gap-2 text-xs justify-center items-center border border-gray-200">
        <span className="font-bold text-gray-500">Simulacija stanja salona:</span>
        <button className="bg-white px-2 py-1 rounded border shadow-sm" onClick={() => setStatusSalona('nema')}>1. Korisnik nema salon</button>
        <button className="bg-white px-2 py-1 rounded border shadow-sm" onClick={() => setStatusSalona('na_cekanju')}>2. Zahtev na čekanju</button>
        <button className="bg-white px-2 py-1 rounded border shadow-sm" onClick={() => setStatusSalona('odobren')}>3. Odobren salon (Izmeni izgled)</button>
      </div>

      <h1 className="text-3xl font-black text-gray-900 mb-6">Moj Profil</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Lični podaci</h2>
          <p className="text-gray-600 mb-2"><strong>Ime:</strong> Anđela Popović</p>
          <p className="text-gray-600 mb-4"><strong>E-mail:</strong> mail@gmail.com</p>
          <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">Status: Registrovan Korisnik</span>
        </div>

        {statusSalona === 'nema' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2 text-gray-800">Vlasnik ste salona?</h2>
              <p className="text-sm text-gray-500 mb-4">Pošaljite zahtev administratoru kako biste registrovali i upravljali svojim frizerskim salonom.</p>
            </div>
            <button onClick={() => setPrikaziFormu(true)} className="w-full bg-pink-500 text-white font-bold py-2.5 rounded-xl hover:bg-pink-600 transition shadow-md">
              Registruj svoj salon
            </button>
          </div>
        )}

        {statusSalona === 'na_cekanju' && (
          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 flex flex-col justify-center items-center text-center">
            <div className="text-3xl mb-2">⏳</div>
            <h2 className="text-xl font-bold mb-1 text-amber-900">Zahtev je na čekanju</h2>
            <p className="text-sm text-amber-700">Uspešno ste poslali zahtev za registraciju. Čeka se odobrenje administratora.</p>
          </div>
        )}

        {statusSalona === 'odobren' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">Moj Salon</h2>
                <span className="bg-blue-100 text-blue-700 font-bold px-2.5 py-0.5 rounded-full text-xs uppercase">Aktivan</span>
              </div>
              <div className="space-y-1.5 text-sm text-gray-600 mb-6">
                <p><strong>Naziv:</strong> {salonData.imeSalona}</p>
                <p><strong>Lokacija:</strong> {salonData.lokacija}</p>
                <p className="text-xs text-gray-400 truncate"><strong>Radno vreme:</strong> {salonData.radnoVreme}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setIsEditing(true)} 
                className="flex-1 bg-gray-900 text-white font-bold py-2.5 rounded-xl hover:bg-gray-800 transition text-sm shadow-md"
              >
                Izmeni podatke (Update)
              </button>
              <button onClick={() => { if(window.confirm("Obriši salon?")) setStatusSalona('nema'); }} className="px-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition text-sm border border-red-100">
                Obriši salon
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profil;