import React, { useState } from 'react';

function AdminPanel() {
  // 1. STANJE: Aktivni tab (šta admin trenutno gleda)
  // Vrednosti: 'zahtevi', 'saloni', 'recenzije'
  const [aktivniTab, setAktivniTab] = useState('zahtevi');

  // 2. STANJE: Lista zahteva za registraciju salona (Na čekanju)
  const [zahtevi, setZahtevi] = useState([
    { id: 1, imeSalona: 'Magic Hair Studio', vlasnik: 'Milica Jovanović', telefon: '065 111 222', lokacija: 'Detelinara, Novi Sad' },
    { id: 2, imeSalona: 'Barber Shop NS', vlasnik: 'Nikola Mandić', telefon: '063 777 888', lokacija: 'Centar, Novi Sad' }
  ]);

  // 3. STANJE: Lista već odobrenih/aktivnih salona (Ukupno 12 salona)
  const [aktivniSaloni, setAktivniSaloni] = useState([
    { id: 101, imeSalona: 'Beauty Corner', vlasnik: 'Anđela Popović', lokacija: 'Novo Naselje, Novi Sad' },
    { id: 102, imeSalona: 'Studio Star', vlasnik: 'Jelena Gajić', lokacija: 'Liman 3, Novi Sad' },
    { id: 103, imeSalona: 'Elegance NS', vlasnik: 'Sara Dokić', lokacija: 'Jevrejska 15, Novi Sad' },
    { id: 104, imeSalona: 'Hair & Beard', vlasnik: 'Marko Kesić', lokacija: 'Bulevar Oslobođenja, Novi Sad' },
    { id: 105, imeSalona: 'Grace Studio', vlasnik: 'Ivana Tepić', lokacija: 'Grbavica, Novi Sad' },
    { id: 106, imeSalona: 'Scissors Palace', vlasnik: 'Luka Jović', lokacija: 'Podbara, Novi Sad' },
    { id: 107, imeSalona: 'Cacao Beauty', vlasnik: 'Maja Gojković', lokacija: 'Sajmište, Novi Sad' },
    { id: 108, imeSalona: 'Diamond Hair', vlasnik: 'Tamara Milić', lokacija: 'Telep, Novi Sad' },
    { id: 109, imeSalona: 'Gentleman House', vlasnik: 'Stefan Vuković', lokacija: 'Sremska Kamenica' },
    { id: 110, imeSalona: 'Bella Vita', vlasnik: 'Nataša Ilić', lokacija: 'Rotkvarija, Novi Sad' },
    { id: 111, imeSalona: 'Studio Queen', vlasnik: 'Sanja Lazić', lokacija: 'Petrovaradin' },
    { id: 112, imeSalona: 'Urban Barber', vlasnik: 'Filip Babić', lokacija: 'Liman 1, Novi Sad' }
  ]);

  // 4. STANJE: Lista objavljenih recenzija u sistemu (Tačno 5 primera za moderaciju)
  const [recenzije, setRecenzije] = useState([
    { id: 1, salon: 'Beauty Corner', korisnik: 'Milana M.', ocena: 5, tekst: 'Prezadolim sam uslugom i šišanjem, sve preporuke!' },
    { id: 2, salon: 'Studio Star', korisnik: 'Igor V.', ocena: 2, tekst: 'Frizura je ok, ali su kasnili sa terminom 20 minuta.' },
    { id: 3, salon: 'Elegance NS', korisnik: 'Jovana P.', ocena: 5, tekst: 'Najbolji manikir u gradu, nokti mi traju po mesec dana bez oštećenja.' },
    { id: 4, salon: 'Hair & Beard', korisnik: 'Nemanja S.', ocena: 4, tekst: 'Odlični berberi, atmosfera u salonu je opuštena i profesionalna.' },
    { id: 5, salon: 'Grace Studio', korisnik: 'Anja T.', ocena: 1, tekst: 'Katastrofa, zakazala sam termin a salon je bio zaključan!' }
  ]);

  // --- AKCIJE ZA ZAHTEVE SALONA ---
  const handlePrihvatiSalon = (id, imeSalona) => {
    alert(`Salon "${imeSalona}" je uspešno odobren i dodat na mapu!`);
    setZahtevi(zahtevi.filter(z => z.id !== id));
  };

  const handleOdbijSalon = (id, imeSalona) => {
    if (window.confirm(`Da li sigurno želite da odbijete zahtev za salon "${imeSalona}"?`)) {
      setZahtevi(zahtevi.filter(z => z.id !== id));
    }
  };

  // --- AKCIJE ZA UPRAVLJANJE SALONIMA (DELETE) ---
  const handleObrisiSalon = (id, imeSalona) => {
    if (window.confirm(` PAŽNJA: Da li sigurno želite da uklonite salon "${imeSalona}" iz sistema?`)) {
      setAktivniSaloni(aktivniSaloni.filter(s => s.id !== id));
    }
  };

  // --- AKCIJA ZA RECENZIJE (SAMO BRISANJE) ---
  const handleObrisiRecenziju = (id, korisnik) => {
    if (window.confirm(`Da li sigurno želite da obrišete recenziju korisnika ${korisnik}?`)) {
      setRecenzije(recenzije.filter(r => r.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-[#f9fafb] min-h-screen">
      {/* Naslov panela */}
      <div className="border-b border-gray-200 pb-5 mb-8">
        <h1 className="text-3xl font-black text-gray-900"> Administratorski Panel</h1>
        <p className="text-sm text-gray-500 mt-1">Pregled i upravljanje celokupnim BeautyMap sistemom.</p>
      </div>

      {/* STATISTIKA KARTICE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Zahtevi na čekanju</p>
          <p className="text-3xl font-bold text-amber-500 mt-2">{zahtevi.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Registrovani saloni</p>
          <p className="text-3xl font-bold text-pink-600 mt-2">{aktivniSaloni.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Broj recenzija</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{recenzije.length}</p>
        </div>
      </div>

      {/* UPRAVLJAČKI MENI */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
        <h3 className="text-xs font-bold uppercase text-gray-400 mb-3 ml-1">Upravljačke komande</h3>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setAktivniTab('zahtevi')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition ${aktivniTab === 'zahtevi' ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
          >
            Zahtevi za registraciju ({zahtevi.length})
          </button>
          
          <button 
            onClick={() => setAktivniTab('saloni')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition ${aktivniTab === 'saloni' ? 'bg-pink-500 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
          >
             Upravljaj salonima
          </button>
          
          <button 
            onClick={() => setAktivniTab('recenzije')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition ${aktivniTab === 'recenzije' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
          >
             Upravljaj recenzijama ({recenzije.length})
          </button>
        </div>
      </div>

      {/* SADRŽAJ TABOVA */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* TAB 1: LISTA ZAHTEVA SALONA */}
        {aktivniTab === 'zahtevi' && (
          <div className="p-6">
            <h2 className="text-xl font-black text-gray-900 mb-4">Novi zahtevi za salone</h2>
            {zahtevi.length === 0 ? (
              <p className="text-gray-500 text-sm py-4 italic">Nema novih zahteva za odobrenje.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase border-b border-gray-100">
                    <tr>
                      <th className="p-4">Naziv Salona</th>
                      <th className="p-4">Vlasnik</th>
                      <th className="p-4">Lokacija / Telefon</th>
                      <th className="p-4 text-right">Akcije</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {zahtevi.map(zahtev => (
                      <tr key={zahtev.id} className="hover:bg-gray-50/50 transition">
                        <td className="p-4 font-bold text-gray-950">{zahtev.imeSalona}</td>
                        <td className="p-4 font-medium">{zahtev.vlasnik}</td>
                        <td className="p-4 text-xs">
                          <p className="font-semibold text-gray-700">{zahtev.lokacija}</p>
                          <p className="text-gray-400">{zahtev.telefon}</p>
                        </td>
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                          <button 
                            onClick={() => handlePrihvatiSalon(zahtev.id, zahtev.imeSalona)}
                            className="bg-green-100 text-green-700 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-green-200 transition"
                          >
                            Prihvati 
                          </button>
                          <button 
                            onClick={() => handleOdbijSalon(zahtev.id, zahtev.imeSalona)}
                            className="bg-red-50 text-red-600 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-red-100 transition"
                          >
                            Odbij
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: UPRAVLJANJE SALONIMA */}
        {aktivniTab === 'saloni' && (
          <div className="p-6">
            <h2 className="text-xl font-black text-gray-900 mb-4">Svi registrovani saloni u sistemu</h2>
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase border-b border-gray-100 sticky top-0">
                  <tr>
                    <th className="p-4">Naziv Salona</th>
                    <th className="p-4">Vlasnik</th>
                    <th className="p-4">Lokacija</th>
                    <th className="p-4 text-right">Akcija</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {aktivniSaloni.map(salon => (
                    <tr key={salon.id} className="hover:bg-gray-50/50 transition">
                      <td className="p-4 font-bold text-gray-950">{salon.imeSalona}</td>
                      <td className="p-4 font-medium">{salon.vlasnik}</td>
                      <td className="p-4 text-gray-500">{salon.lokacija}</td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => handleObrisiSalon(salon.id, salon.imeSalona)}
                          className="bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs px-3 py-1.5 rounded-lg border border-red-100 transition"
                        >
                          Ukloni salon 
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: UPRAVLJANJE RECENZIJAMA (MODERACIJA - SAMO BRISANJE) */}
        {aktivniTab === 'recenzije' && (
          <div className="p-6">
            <h2 className="text-xl font-black text-gray-900 mb-4">Moderacija korisničkih recenzija</h2>
            <p className="text-xs text-gray-400 mb-4">* Recenzije su odmah vidljive na profilu salona, a administrator ima pravo da ukloni neadekvatne komentare.</p>
            {recenzije.length === 0 ? (
              <p className="text-gray-500 text-sm py-4 italic">Nema nijedne recenzije u sistemu.</p>
            ) : (
              <div className="space-y-4">
                {recenzije.map(recenzija => (
                  <div key={recenzija.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">{recenzija.korisnik}</span>
                        <span className="text-gray-300">za</span>
                        <span className="font-bold text-pink-600 text-sm">{recenzija.salon}</span>
                        <span className="bg-amber-100 text-amber-800 font-black text-xs px-2 py-0.5 rounded">⭐ {recenzija.ocena}</span>
                      </div>
                      <p className="text-gray-600 text-sm italic">"{recenzija.tekst}"</p>
                    </div>
                    <div className="flex gap-2 self-end md:self-center">
                      <button 
                        onClick={() => handleObrisiRecenziju(recenzija.id, recenzija.korisnik)}
                        className="bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs px-3 py-1.5 rounded-lg border border-red-100 transition shadow-sm"
                      >
                        Obriši recenziju 
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminPanel;