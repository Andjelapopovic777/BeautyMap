import React, { useState, useEffect } from 'react';
import api from '../api';

function Profil() {
  const [recenzijePregled, setRecenzijePregled] = useState([]);
  const [prikaziFormu, setPrikaziFormu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [statusSalona, setStatusSalona] = useState('ucitavanje');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [salonData, setSalonData] = useState({
    imeSalona: '',
    lokacija: '',
    opisSalona: '',
    telefon: '',
    services: [],
    workingHours: { monFri: '', sat: '', sun: '' }
  });

  const [novaUsluga, setNovaUsluga] = useState({ naziv: '', cena: '' });

  useEffect(() => {
  if (!salonData._id) return;
  api.get(`/api/recenzije/salon/${salonData._id}`)
    .then(res => setRecenzijePregled(res.data.data || []))
    .catch(err => console.error('Greška pri učitavanju recenzija:', err));
  }, [salonData._id]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setStatusSalona('nema');
      setLoading(false);
      return;
    }

    api.get('/api/saloni/moj-salon', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const salon = res.data;
        setSalonData({
          _id: salon._id,
          imeSalona: salon.name || '',
          lokacija: salon.address || '',
          opisSalona: salon.description || '',
          telefon: salon.phone || '',
          services: (salon.services || []).map((s, index) => ({
            id: index + 1,
            naziv: s.name,
            cena: s.price
          })),
          workingHours: salon.workingHours || { monFri: '', sat: '', sun: '' }
        });
        setStatusSalona(salon.status === 'pending' ? 'na_cekanju' : 'odobren');
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setStatusSalona('nema');
        } else {
          setStatusSalona('nema');
        }
        setLoading(false);
      });
  }, []);

  const handleRegistracija = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const token = localStorage.getItem('token');
      // Backend očekuje: imeSalona, lokacija, telefon
      await api.post('/api/saloni', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Zahtev uspešno poslat!");
      setPrikaziFormu(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Došlo je do greške!");
    }
  };

  const saveBasicInfo = async () => {
    const token = localStorage.getItem('token');
    await api.put(
      '/api/saloni/moj-salon/basic-info',
      {
        imeSalona: salonData.imeSalona,
        lokacija: salonData.lokacija,
        telefon: salonData.telefon,
        opisSalona: salonData.opisSalona
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const saveWorkingHours = async () => {
    const token = localStorage.getItem('token');
    await api.put(
      '/api/saloni/moj-salon/working-hours',
      {
        monFri: salonData.workingHours.monFri,
        sat: salonData.workingHours.sat,
        sun: salonData.workingHours.sun
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const saveServices = async () => {
    const token = localStorage.getItem('token');
    await api.put(
      '/api/saloni/moj-salon/services',
      {
        services: salonData.services.map((u) => ({
          name: u.naziv,
          price: u.cena
        }))
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const handleSalonChange = (e) => {
    setSalonData({ ...salonData, [e.target.name]: e.target.value });
  };

  const handleCenaChange = (id, novaCena) => {
    setSalonData({ ...salonData, services: salonData.services.map(u => u.id === id ? { ...u, cena: novaCena } : u) });
  };

  const handleNazivUslugeChange = (id, noviNaziv) => {
    setSalonData({ ...salonData, services: salonData.services.map(u => u.id === id ? { ...u, naziv: noviNaziv } : u) });
  };

  const handleDodajUslugu = (e) => {
    e.preventDefault();
    if (!novaUsluga.naziv || !novaUsluga.cena) return;
    const nova = { id: Date.now(), naziv: novaUsluga.naziv, cena: novaUsluga.cena };
    setSalonData({ ...salonData, services: [...salonData.services, nova] });
    setNovaUsluga({ naziv: '', cena: '' });
  };

  const handleObrisiUslugu = (id) => {
    if (window.confirm("Obriši ovu uslugu?")) {
      setSalonData({ ...salonData, services: salonData.services.filter(u => u.id !== id) });
    }
  };

  const handleDeleteSalon = async () => {
    if (!window.confirm("Da li sigurno želiš da obrišeš salon?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/saloni/moj-salon/${salonData._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Salon uspešno obrisan.");
      setSalonData({ imeSalona: '', lokacija: '', opisSalona: '', telefon: '', services: [], workingHours: { monFri: '', sat: '', sun: '' } });
      setStatusSalona("nema");
    } catch (err) {
      console.error(err);
      alert("Greška prilikom brisanja salona.");
    }
  };

  // =========================================================================
  // FORMA ZA REGISTRACIJU
  // =========================================================================
  if (prikaziFormu) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button onClick={() => setPrikaziFormu(false)} className="text-gray-500 hover:text-pink-500 mb-4 transition flex items-center gap-2">← Nazad</button>
        <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Registrujte svoj salon</h2>
          <form onSubmit={handleRegistracija} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Ime salona</label>
              {/* name="imeSalona" jer backend to očekuje u createSalon */}
              <input name="imeSalona" type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200" placeholder="npr. Beauty Corner" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Lokacija salona</label>
              {/* name="lokacija" jer backend to očekuje */}
              <input name="lokacija" type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200" placeholder="npr. Petrovaradin, Novi Sad" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Broj telefona</label>
              {/* name="telefon" jer backend to očekuje */}
              <input name="telefon" type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200" placeholder="npr. 0641234567" />
            </div>
            <button type="submit" className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600 transition">Pošalji zahtev</button>
          </form>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STRANICA ZA IZMENU
  // =========================================================================
  if (isEditing) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 bg-[#f9fafb] min-h-screen">
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <button onClick={() => setIsEditing(false)} className="text-gray-600 hover:text-pink-500 font-bold transition">← Nazad na profil</button>
          <button
            onClick={async () => {
              try {
                await saveBasicInfo();  
                await saveServices();
                await saveWorkingHours();
                setIsEditing(false);
                alert("Sve izmene su sačuvane!");
              } catch (err) {
                console.error(err);
                alert("Greška pri čuvanju. Pokušaj ponovo.");
              }
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-xl transition shadow-md"
          >
            Sačuvaj izmene
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-gray-400 block uppercase ml-1">Naziv salona</label>
            <input type="text" name="imeSalona" value={salonData.imeSalona} onChange={handleSalonChange}
              className="text-4xl font-extrabold text-gray-950 bg-transparent border-b-2 border-dashed border-gray-200 focus:border-pink-500 focus:outline-none w-full pb-1" />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-xs font-bold text-gray-400 block uppercase ml-1">Lokacija</label>
            <div className="flex items-center text-pink-500 gap-1">
              <span className="text-xl">📍</span>
              <input type="text" name="lokacija" value={salonData.lokacija} onChange={handleSalonChange}
                className="text-base font-bold text-pink-600 bg-transparent border-b border-dashed border-gray-200 focus:border-pink-500 focus:outline-none w-full" />
            </div>
          </div>

          <div className="bg-pink-50 border border-pink-100 p-5 rounded-2xl">
            <h3 className="font-bold text-pink-700 mb-4">Radno vreme</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Ponedeljak - Petak</label>
                <input type="text" value={salonData.workingHours?.monFri || ''}
                  onChange={(e) => setSalonData({ ...salonData, workingHours: { ...salonData.workingHours, monFri: e.target.value } })}
                  placeholder="09:00 - 20:00" className="w-full border border-gray-200 rounded-xl px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Subota</label>
                <input type="text" value={salonData.workingHours?.sat || ''}
                  onChange={(e) => setSalonData({ ...salonData, workingHours: { ...salonData.workingHours, sat: e.target.value } })}
                  placeholder="09:00 - 17:00" className="w-full border border-gray-200 rounded-xl px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Nedelja</label>
                <input type="text" value={salonData.workingHours?.sun || ''}
                  onChange={(e) => setSalonData({ ...salonData, workingHours: { ...salonData.workingHours, sun: e.target.value } })}
                  placeholder="10:00 - 15:00" className="w-full border border-gray-200 rounded-xl px-4 py-2" />
              </div>
            </div>
          </div>

          <div className="w-full">
            <label className="text-xs font-bold text-gray-400 block uppercase ml-1 mb-1">Opis salona</label>
            <textarea name="opisSalona" value={salonData.opisSalona} onChange={handleSalonChange} rows="2"
              className="w-full bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              placeholder="Unesite kratak opis salona..." />
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit">
              <h2 className="text-2xl font-black mb-6 text-gray-900">Usluge i cenovnik</h2>
              <div className="space-y-4 mb-6">
                {(salonData.services || []).map((usluga) => (
                  <div key={usluga.id} className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <input type="text" value={usluga.naziv} onChange={(e) => handleNazivUslugeChange(usluga.id, e.target.value)}
                      className="text-gray-800 font-medium bg-transparent focus:outline-none focus:border-b border-gray-300 w-1/2" />
                    <div className="flex items-center gap-2">
                      <input type="text" value={usluga.cena} onChange={(e) => handleCenaChange(usluga.id, e.target.value)}
                        className="w-16 text-right bg-transparent font-bold text-pink-500 focus:outline-none focus:border-b border-gray-300" />
                      <span className="font-bold text-pink-500 text-sm">RSD</span>
                      <button type="button" onClick={() => handleObrisiUslugu(usluga.id)} className="text-red-500 ml-2 hover:scale-110 transition">❌</button>
                    </div>
                  </div>
                ))}
                {salonData.services.length === 0 && (
                  <p className="text-gray-400 text-sm italic">Još uvek nema usluga. Dodajte prvu!</p>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mt-4">
                <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Dodaj novu uslugu u cenovnik:</h4>
                <div className="flex flex-col md:flex-row gap-2">
                  <input type="text" placeholder="Naziv (npr. Feniranje)" value={novaUsluga.naziv}
                    onChange={(e) => setNovaUsluga({ ...novaUsluga, naziv: e.target.value })}
                    className="flex-1 p-2 bg-white border border-gray-200 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-500" />
                  <input type="text" placeholder="Cena (RSD)" value={novaUsluga.cena}
                    onChange={(e) => setNovaUsluga({ ...novaUsluga, cena: e.target.value })}
                    className="w-24 p-2 bg-white border border-gray-200 text-sm rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-500" />
                  <button onClick={handleDodajUslugu} className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition">
                    Dodaj +
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Recenzije korisnika</h2>
                {recenzijePregled.length > 0 && (
                  <span className="bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full text-xs">
                    ⭐ {(recenzijePregled.reduce((sum, r) => sum + r.ocena, 0) / recenzijePregled.length).toFixed(1)}
                  </span>
                )}
              </div>

              {recenzijePregled.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Ovaj salon još uvek nema recenzija.</p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {recenzijePregled.map(r => (
                    <div key={r._id} className="border-b border-gray-50 pb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-sm text-gray-800">{r.korisnik?.name || 'Korisnik'}</span>
                        <span className="text-amber-400 text-sm">{'★'.repeat(r.ocena)}{'☆'.repeat(5 - r.ocena)}</span>
                      </div>
                      <p className="text-sm text-gray-600">{r.tekst}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(r.createdAt).toLocaleDateString('sr-RS')}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="p-3 bg-gray-50 rounded-xl text-center text-xs text-gray-500 border border-gray-200 mt-4">
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
      <h1 className="text-3xl font-black text-gray-900 mb-6">Moj Profil</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Lični podaci</h2>
          <p className="text-gray-600 mb-2"><strong>Ime:</strong> {user?.name}</p>
          <p className="text-gray-600 mb-4"><strong>E-mail:</strong> {user?.email}</p>
        </div>

        {loading && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center">
            <p className="text-gray-400 animate-pulse">Učitavanje salona...</p>
          </div>
        )}

        {!loading && statusSalona === 'nema' && (
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

        {!loading && statusSalona === 'na_cekanju' && (
          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 flex flex-col justify-center items-center text-center">
            <div className="text-3xl mb-2">⏳</div>
            <h2 className="text-xl font-bold mb-1 text-amber-900">Zahtev je na čekanju</h2>
            <p className="text-sm text-amber-700">Uspešno ste poslali zahtev za registraciju. Čeka se odobrenje administratora.</p>
          </div>
        )}

        {!loading && statusSalona === 'odobren' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">Moj Salon</h2>
                <span className="bg-green-100 text-green-700 font-bold px-2.5 py-0.5 rounded-full text-xs uppercase">Aktivan</span>
              </div>
              <div className="space-y-1.5 text-sm text-gray-600 mb-6">
                <p><strong>Naziv:</strong> {salonData.imeSalona}</p>
                <p><strong>Lokacija:</strong> {salonData.lokacija}</p>
                <p><strong>Telefon:</strong> {salonData.telefon}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(true)}
                className="flex-1 bg-pink-500 text-white font-bold py-2.5 rounded-xl hover:bg-gray-500 transition text-sm shadow-md">
                Izmeni podatke
              </button>
              <button onClick={handleDeleteSalon}
                className="bg-gray-500 text-white font-bold py-2.5 px-4 rounded-xl hover:bg-pink-500 transition text-sm shadow-md">
                Obriši
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profil;