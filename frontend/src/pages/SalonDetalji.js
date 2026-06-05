import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ModalZaZakazivanje from './ModalZaZakazivanje';

function SalonDetalji() {
  const { id } = useParams();
  const [salon, setSalon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prikažiModal, setPrikažiModal] = useState(false);
  const [isFormaOpen, setIsFormaOpen] = useState(false);
  const [porukaModala, setPorukaModala] = useState('');

  const [recenzije, setRecenzije] = useState([]);
  const [novaRecenzija, setNovaRecenzija] = useState({ tekst: '', ocena: 5 });
  const [saljemRecenziju, setSaljemRecenziju] = useState(false);

  const token = localStorage.getItem('token');
  const ulogovan = !!token;

  useEffect(() => {
    axios.get(`http://localhost:5000/api/saloni/${id}`)
      .then(res => {
        setSalon(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Greška pri učitavanju:", err);
        setLoading(false);
      });

    ucitajRecenzije();
  }, [id]);

  const ucitajRecenzije = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/recenzije/salon/${id}`);
      setRecenzije(res.data.data || []);
    } catch (err) {
      console.error('Greška pri učitavanju recenzija:', err);
    }
  };

  const handlePošaljiRecenziju = async (e) => {
    e.preventDefault();
    if (!ulogovan) {
      setPorukaModala('Morate biti prijavljeni da biste ostavili recenziju.');
      setPrikažiModal(true);
      return;
    }
    if (!novaRecenzija.tekst.trim()) return;

    setSaljemRecenziju(true);
    try {
      await axios.post(
        `http://localhost:5000/api/recenzije/salon/${id}`,
        novaRecenzija,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNovaRecenzija({ tekst: '', ocena: 5 });
      await ucitajRecenzije();
    } catch (err) {
      alert('Greška pri slanju recenzije.');
    } finally {
      setSaljemRecenziju(false);
    }
  };

  const proveriAkciju = (tipAkcije) => {
    if (!ulogovan) {
      setPorukaModala(tipAkcije === 'zakazi' ? 'Morate biti prijavljeni da biste zakazali termin.' : 'Morate biti prijavljeni za recenziju.');
      setPrikažiModal(true);
    } else if (tipAkcije === 'zakazi') {
      setIsFormaOpen(true);
    }
  };

  if (loading) return <div className="text-center p-20">Učitavanje podataka...</div>;
  if (!salon) return <div className="text-center p-8">Salon nije pronađen.</div>;

  const prosecnaOcena = recenzije.length > 0
    ? (recenzije.reduce((sum, r) => sum + r.ocena, 0) / recenzije.length).toFixed(1)
    : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="text-pink-500 font-semibold hover:underline mb-6 inline-block">← Nazad na početnu</Link>

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-4xl font-black text-gray-900">{salon.name}</h1>
        {prosecnaOcena && (
          <span className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-full text-sm">
            ⭐ {prosecnaOcena} ({recenzije.length})
          </span>
        )}
      </div>

      <p className="text-pink-600 font-medium mb-4">📍 {salon.address}</p>
      <p className="text-gray-700 mb-6">📞 <span className="font-medium">{salon.phone}</span></p>

     
      <div className="grid md:grid-cols-2 gap-8 mb-12 items-start">

        {/* LEVA STRANA */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Radno vreme</h2>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-semibold">Ponedeljak - Petak:</span> {salon.workingHours?.monFri || 'Nije dostupno'}</p>
              <p><span className="font-semibold">Subota:</span> {salon.workingHours?.sat || 'Nije dostupno'}</p>
              <p><span className="font-semibold">Nedelja:</span> {salon.workingHours?.sun || 'Nije dostupno'}</p>
            </div>
          </div>
          {salon.description && (
            <p className="text-gray-700 text-lg leading-relaxed">{salon.description}</p>
          )}
        </div>

        {/* DESNA STRANA */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4">Usluge i cenovnik</h2>
          <div className="divide-y divide-gray-100">
            {salon.services && salon.services.map((stavka, index) => (
              <div key={index} className="flex justify-between py-3">
                <span className="text-gray-700 font-medium">{stavka.name}</span>
                <span className="text-pink-600 font-bold">{stavka.price} RSD</span>
              </div>
            ))}
          </div>
          <button onClick={() => proveriAkciju('zakazi')} className="w-full mt-6 bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600 transition">
            Zakažite termin
          </button>
        </div>
      </div>

      {/* RECENZIJE */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recenzije {recenzije.length > 0 && <span className="text-gray-400 font-normal text-lg">({recenzije.length})</span>}
        </h2>

        {ulogovan ? (
          <form onSubmit={handlePošaljiRecenziju} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <h3 className="font-bold text-gray-800 mb-4">Ostavite recenziju</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Ocena</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(broj => (
                  <button
                    key={broj}
                    type="button"
                    onClick={() => setNovaRecenzija({ ...novaRecenzija, ocena: broj })}
                    className={`text-2xl transition ${novaRecenzija.ocena >= broj ? 'text-amber-400' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={novaRecenzija.tekst}
              onChange={(e) => setNovaRecenzija({ ...novaRecenzija, tekst: e.target.value })}
              placeholder="Podelite vaše iskustvo..."
              rows="3"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition mb-4"
            />
            <button
              type="submit"
              disabled={saljemRecenziju}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2.5 px-6 rounded-xl transition disabled:opacity-50"
            >
              {saljemRecenziju ? 'Slanje...' : 'Pošalji recenziju'}
            </button>
          </form>
        ) : (
          <div
            onClick={() => { setPorukaModala('Morate biti prijavljeni da biste ostavili recenziju.'); setPrikažiModal(true); }}
            className="bg-gray-50 border border-dashed border-gray-300 p-6 rounded-2xl mb-8 text-center cursor-pointer hover:border-pink-400 transition"
          >
            <p className="text-gray-500">🔒 <span className="font-semibold text-pink-500">Prijavite se</span> da biste ostavili recenziju</p>
          </div>
        )}

        {recenzije.length === 0 ? (
          <p className="text-gray-400 italic text-center py-8">Ovaj salon još nema recenzija. Budite prvi!</p>
        ) : (
          <div className="space-y-4">
            {recenzije.map(r => (
              <div key={r._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-bold text-gray-900">{r.korisnik?.name || 'Korisnik'}</span>
                    <span className="text-amber-400 ml-2">{'★'.repeat(r.ocena)}{'☆'.repeat(5 - r.ocena)}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(r.createdAt).toLocaleDateString('sr-RS')}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{r.tekst}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal za nelogovanog korisnika */}
      {prikažiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full mx-4 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Potrebna prijava</h3>
            <p className="text-gray-500 mb-6">{porukaModala}</p>
            <div className="flex gap-3">
              <button onClick={() => setPrikažiModal(false)} className="flex-1 border border-gray-200 text-gray-600 font-bold py-2.5 rounded-xl hover:bg-gray-50 transition">
                Zatvori
              </button>
              <Link to="/login" className="flex-1 bg-pink-500 text-white font-bold py-2.5 rounded-xl hover:bg-pink-600 transition text-center">
                Prijavi se
              </Link>
            </div>
          </div>
        </div>
      )}

      <ModalZaZakazivanje
        isOpen={isFormaOpen}
        onClose={() => setIsFormaOpen(false)}
        imeSalona={salon.name}
      />
    </div>
  );
}

export default SalonDetalji;