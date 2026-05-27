import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ModalZaZakazivanje from './ModalZaZakazivanje'; // <-- Uvezen modal za zakazivanje


const MOCK_SALONI = [
  {
    id: '1',
    naziv: 'Studio Elegance',
    lokacija: 'Centar, Novi Sad',
    ocena: 4.9,
    slika: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
    opis: 'Vrhunske ženske frizure, pramenovi, balayage i kompletni tretmani dubinske nege kose uz najkvalitetniju kozmetiku.',
    radnoVreme: 'Pon - Pet: 08:00 - 20:00 | Sub: 09:00 - 16:00 | Ned: Zatvoreno',
    cenovnik: [
      { usluga: 'Šišanje i feniranje', cena: '1.800 RSD' },
      { usluga: 'Farbanje (kratka kosa)', cena: '2.500 RSD' },
      { usluga: 'Ol deliverance tretman', cena: '3.500 RSD' }
    ],
    recenzije: [
      { autor: 'Milica S.', ocena: 5, komentar: 'Najbolji salon u gradu! Feniranje drži danima.' },
      { autor: 'Jelena K.', ocena: 4, komentar: 'Prelepa atmosfera, veoma profesionalno osoblje.' }
    ]
  },
  {
    id: '2',
    naziv: 'Barber Shop King',
    lokacija: 'Liman, Novi Sad',
    ocena: 4.8,
    slika: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800',
    opis: 'Moderne muške frizure, klasično šišanje makazama, uređivanje i oblikovanje brade toplim peškirima.',
    radnoVreme: 'Pon - Sub: 09:00 - 21:00 | Ned: Zatvoreno',
    cenovnik: [
      { usluga: 'Muško šišanje', cena: '800 RSD' },
      { usluga: 'Uređivanje brade', cena: '500 RSD' },
      { usluga: 'King paket (šišanje + brada)', cena: '1.200 RSD' }
    ],
    recenzije: [
      { autor: 'Nikola P.', ocena: 5, komentar: 'Majstori svog zanata, brada uvek savršeno oblikovana.' }
    ]
  },
  {
    id: '3',
    naziv: 'Beauty Corner',
    lokacija: 'Novo Naselje, Novi Sad',
    ocena: 4.7,
    slika: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
    opis: 'Sve vrste frizerskih i kozmetičkih usluga na jednom mestu. Profesionalni tim stilista brine o Vašem izgledu.',
    radnoVreme: 'Pon - Pet: 09:00 - 20:00 | Sub: 09:00 - 17:00 | Ned: 10:00 - 15:00',
    cenovnik: [
      { usluga: 'Žensko šišanje', cena: '1.500 RSD' },
      { usluga: 'Svečana frizura', cena: '3.000 RSD' },
      { usluga: 'Manikir + gel lak', cena: '1.800 RSD' }
    ],
    recenzije: []
  },
  {
    id: '4',
    naziv: 'Hair Factory',
    lokacija: 'Grbavica, Novi Sad',
    ocena: 4.6,
    slika: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800',
    opis: 'Urbani salon specijalizovan za lude transformacije, moderne boje, pletenice i najnovije svetske trendove.',
    radnoVreme: 'Pon - Sub: 10:00 - 22:00 | Ned: Zatvoreno',
    cenovnik: [
      { usluga: 'Šišanje', cena: '1.200 RSD' },
      { usluga: 'Eksperimentalna boja', cena: '4.000 RSD' }
    ],
    recenzije: []
  },
  {
    id: '5',
    naziv: 'Gentleman\'s Club',
    lokacija: 'Centar, Novi Sad',
    ocena: 4.9,
    slika: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800',
    opis: 'Premium muški salon sa akcentom na tradicionalne tehnike brijanja opasno oštrim britvama i vrhunsku negu.',
    radnoVreme: 'Pon - Pet: 08:00 - 21:00 | Sub: 08:00 - 17:00 | Ned: Zatvoreno',
    cenovnik: [
      { usluga: 'Premium šišanje', cena: '1.500 RSD' },
      { usluga: 'Brijanje britvom', cena: '1.000 RSD' }
    ],
    recenzije: []
  },
  {
    id: '6',
    naziv: 'La Rose',
    lokacija: 'Detelinara, Novi Sad',
    ocena: 4.5,
    slika: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800',
    opis: 'Mali, šarmantni porodični salon sa tradicijom dugom preko 10 godina. Brza i kvalitetna usluga za celu porodicu.',
    radnoVreme: 'Pon - Pet: 09:00 - 19:00 | Sub: 09:00 - 14:00 | Ned: Zatvoreno',
    cenovnik: [
      { usluga: 'Dečije šišanje', cena: '600 RSD' },
      { usluga: 'Penzionerski popust šišanje', cena: '700 RSD' }
    ],
    recenzije: []
  },
  {
    id: '7',
    naziv: 'Studio Diamond',
    lokacija: 'Sajmište, Novi Sad',
    ocena: 4.8,
    slika: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800',
    opis: 'Specijalisti za svečane frizure, svadbe i mature. Profesionalna nadogradnja kose i keratin tretmani.',
    radnoVreme: 'Pon - Sub: 09:00 - 20:00 | Ned: Po zakazivanju',
    cenovnik: [
      { usluga: 'Svečana frizura (punđa)', cena: '3.500 RSD' },
      { usluga: 'Keratin tretman', cena: '7.000 RSD' }
    ],
    recenzije: []
  },
  {
    id: '8',
    naziv: 'The Barberian',
    lokacija: 'Podbara, Novi Sad',
    ocena: 4.7,
    slika: 'https://images.unsplash.com/photo-1512864084360-7c0c4d0a0845?w=800',
    opis: 'Alternativni barber shop sa sjajnom muzikom, hladnim pićem i frizerima koji će vašu frizuru dovesti do savršenstva.',
    radnoVreme: 'Pon - Pet: 12:00 - 20:00 | Sub: 10:00 - 18:00 | Ned: Zatvoreno',
    cenovnik: [
      { usluga: 'Šišanje + pranje kose', cena: '1.000 RSD' }
    ],
    recenzije: []
  },
  {
    id: '9',
    naziv: 'Aura Hair & Care',
    lokacija: 'Telep, Novi Sad',
    ocena: 4.4,
    slika: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800',
    opis: 'Fokusirani na zdravlje vaše kose. Radimo isključivo sa veganskim i organskim preparatima bez sulfata.',
    radnoVreme: 'Pon - Pet: 09:00 - 17:00 | Sub: Zatvoreno | Ned: Zatvoreno',
    cenovnik: [
      { usluga: 'Organski tretman kose', cena: '4.500 RSD' }
    ],
    recenzije: []
  },
  {
    id: '10',
    naziv: 'Urban Cut',
    lokacija: 'Liman, Novi Sad',
    ocena: 4.6,
    slika: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800',
    opis: 'Brzo, efikasno i moderno šišanje za zaposlene i studente. Pratimo korak sa vremenom i urbanim stilom.',
    radnoVreme: 'Pon - Sub: 08:00 - 22:00 | Ned: Zatvoreno',
    cenovnik: [
      { usluga: 'Brzo šišanje mašinicom', cena: '700 RSD' }
    ],
    recenzije: []
  },
  {
    id: '11',
    naziv: 'Atelje Kose',
    lokacija: 'Petrovaradin, Novi Sad',
    ocena: 4.9,
    slika: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800',
    opis: 'Umetnički pristup svakom klijentu. Dođite na besplatne konsultacije i pronađite idealan oblik frizure za vaš oblik lica.',
    radnoVreme: 'Utorak - Nedelja: 09:00 - 19:00 | Ponedeljak: Zatvoreno',
    cenovnik: [
      { usluga: 'Stilski saveti + šišanje', cena: '2.200 RSD' }
    ],
    recenzije: []
  },
  {
    id: '12',
    naziv: 'Barber Shop Old School',
    lokacija: 'Novo Naselje, Novi Sad',
    ocena: 4.7,
    slika: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800',
    opis: 'Kao što ime kaže – povratak starim vrednostima. Opustite se u retro stolicama i prepustite se iskusnim rukama.',
    radnoVreme: 'Pon - Sub: 09:00 - 20:00 | Ned: Zatvoreno',
    cenovnik: [
      { usluga: 'Klasično šišanje i brijanje', cena: '1.400 RSD' }
    ],
    recenzije: []
  }
];

function SalonDetalji({ userRole }) {
  const { id } = useParams();
  const salon = MOCK_SALONI.find(s => s.id === id);

  // Stanja za modal i recenzije
  const [prikažiModal, setPrikažiModal] = useState(false);
  const [isFormaOpen, setIsFormaOpen] = useState(false); // <-- Prekidač za našu novu formu
  const [porukaModala, setPorukaModala] = useState('');
  const [lokalneRecenzije, setLokalneRecenzije] = useState(salon ? salon.recenzije : []);
  const [novaRecenzijaTekst, setNovaRecenzijaTekst] = useState('');
  const [novaOcena, setNovaOcena] = useState(5);

  if (!salon) {
    return <div className="text-center p-8 text-gray-500">Salon nije pronađen.</div>;
  }

  // Zajednička provera za akcije (Zakazivanje i Recenzije)
  const proveriAkciju = (tipAkcije) => {
    if (userRole === 'gost') {
      if (tipAkcije === 'zakazi') {
        setPorukaModala('Morate biti prijavljeni da biste zakazali termin.');
      } else {
        setPorukaModala('Morate biti prijavljeni da biste ostavili recenziju.');
      }
      setPrikažiModal(true);
    } else {
      if (tipAkcije === 'zakazi') {
        setIsFormaOpen(true); // <-- Otvara formu umesto starog alert-a!
      }
    }
  };

  // Dodavanje recenzije za ulogovanog korisnika
  const handleDodajRecenziju = (e) => {
    e.preventDefault();
    if (!novaRecenzijaTekst.trim()) return;

    const nova = {
      autor: 'Vi (Ulogovani korisnik)',
      ocena: Number(novaOcena),
      komentar: novaRecenzijaTekst
    };

    setLokalneRecenzije([nova, ...lokalneRecenzije]);
    setNovaRecenzijaTekst('');
    alert('Recenzija je uspešno dodata!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <Link to="/" className="text-pink-500 font-semibold hover:underline mb-6 inline-block">
        ← Nazad na početnu
      </Link>
      
      <img src={salon.slika} alt={salon.naziv} className="w-full h-80 object-cover rounded-2xl shadow-md mb-8" />
      
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-4xl font-black text-gray-900">{salon.naziv}</h1>
        <span className="bg-pink-100 text-pink-700 text-lg font-bold px-3 py-1 rounded-xl">⭐ {salon.ocena}</span>
      </div>
      
      <p className="text-pink-600 font-medium mb-4">📍 {salon.lokacija}</p>
      
      
      <div className="bg-pink-50 text-pink-950 p-4 rounded-xl mb-6 font-medium text-sm border border-pink-100">
         <span className="font-bold">Radno vreme:</span> {salon.radnoVreme}
      </div>

      <p className="text-gray-700 text-lg leading-relaxed mb-8">{salon.opis}</p>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
       
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Usluge i cenovnik </h2>
          <div className="divide-y divide-gray-100">
            {salon.cenovnik.map((stavka, index) => (
              <div key={index} className="flex justify-between py-3">
                <span className="text-gray-700 font-medium">{stavka.usluga}</span>
                <span className="text-pink-600 font-bold">{stavka.cena}</span>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => proveriAkciju('zakazi')}
            className="w-full mt-6 bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600 shadow-md transition"
          >
            Zakažite termin
          </button>
        </div>

        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Recenzije korisnika</h2>
            
           
            <div className="space-y-4 max-h-60 overflow-y-auto mb-4 pr-2">
              {lokalneRecenzije.length === 0 ? (
                <p className="text-sm text-gray-500 italic">Ovaj salon još uvek nema recenzija. Budite prvi!</p>
              ) : (
                <p>Nema recenzija</p> && lokalneRecenzije.map((rec, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-gray-800">{rec.autor}</span>
                      <span className="text-xs text-yellow-500">{'⭐'.repeat(rec.ocena)}</span>
                    </div>
                    <p className="text-xs text-gray-600">{rec.komentar}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {userRole !== 'gost' ? (
            <form onSubmit={handleDodajRecenziju} className="border-t border-gray-100 pt-4 mt-auto">
              <p className="text-sm font-bold text-gray-800 mb-2">Ostavite Vašu recenziju:</p>
              <div className="flex gap-2 mb-2">
                <select 
                  value={novaOcena} 
                  onChange={(e) => setNovaOcena(e.target.value)}
                  className="bg-gray-100 text-sm p-1.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-pink-500"
                >
                  <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                  <option value="4">⭐⭐⭐⭐ (4)</option>
                  <option value="3">⭐⭐⭐ (3)</option>
                  <option value="2">⭐⭐ (2)</option>
                  <option value="1">⭐ (1)</option>
                </select>
              </div>
              <textarea
                rows="2"
                value={novaRecenzijaTekst}
                onChange={(e) => setNovaRecenzijaTekst(e.target.value)}
                placeholder="Napišite utiske..."
                className="w-full text-sm p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none mb-2"
                required
              ></textarea>
              <button type="submit" className="w-full bg-gray-950 text-white font-bold py-2 rounded-xl text-xs hover:bg-pink-600 transition">
                Objavi komentar
              </button>
            </form>
          ) : (
            <div className="border-t border-gray-100 pt-4 mt-auto">
              <button 
                onClick={() => proveriAkciju('recenzija')}
                className="w-full bg-gray-100 text-gray-700 font-bold py-2.5 rounded-xl text-sm hover:bg-gray-200 transition"
              >
                Ostavite Vašu recenziju
              </button>
            </div>
          )}
        </div>
      </div>

    
      {prikažiModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 border border-gray-100 text-center animate-scale-up">
            <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              🔒
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Potrebna prijava</h3>
            <p className="text-gray-500 text-sm mb-6">{porukaModala}</p>
            <div className="space-y-2">
              <Link 
                to="/login" 
                onClick={() => setPrikažiModal(false)}
                className="block w-full bg-pink-500 text-white font-bold py-2.5 rounded-xl text-sm hover:bg-pink-600 shadow-md transition"
              >
                Prijavi se odmah
              </Link>
              <button 
                onClick={() => setPrikažiModal(false)}
                className="block w-full bg-gray-100 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-200 transition"
              >
                Zatvori
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- UBACEN MODAL ZA ZAKAZIVANJE NA KRAJ STRANICE --- */}
      <ModalZaZakazivanje 
        isOpen={isFormaOpen} 
        onClose={() => setIsFormaOpen(false)} 
        imeSalona={salon.naziv} 
      />

    </div>
  );
}

export default SalonDetalji;