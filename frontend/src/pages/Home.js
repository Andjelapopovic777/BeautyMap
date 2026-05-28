import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import makazeImg from 'D:/Dokumenti/Desktop/BeautyMap IT36-2024/frontend/src/assets/makaze.jpg';


// Mock (privremeni) podaci o frizerskim salonima koji imitiraju bazu podataka
const MOCK_SALONI = [
  {
    id: '1',
    naziv: 'Studio Elegance',
    lokacija: 'Centar, Novi Sad',
    ocena: 4.9,
    slika: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
    opis: 'Vrhunske ženske frizure, pramenovi, balayage i kompletni tretmani dubinske nege kose uz najkvalitetniju kozmetiku.'
  },
  {
    id: '2',
    naziv: 'Barber Shop King',
    lokacija: 'Liman, Novi Sad',
    ocena: 4.8,
    slika: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800',
    opis: 'Moderne muške frizure, klasično šišanje makazama, uređivanje i oblikovanje brade toplim peškirima.'
  },
  {
    id: '3',
    naziv: 'Beauty Corner',
    lokacija: 'Novo Naselje, Novi Sad',
    ocena: 4.7,
    slika: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
    opis: 'Sve vrste frizerskih i kozmetičkih usluga na jednom mestu. Profesionalni tim stilista brine o Vašem izgledu.'
  },
  {
    id: '4',
    naziv: 'Hair Factory',
    lokacija: 'Grbavica, Novi Sad',
    ocena: 4.6,
    slika: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800',
    opis: 'Urbani salon specijalizovan za lude transformacije, moderne boje, pletenice i najnovije svetske trendove.'
  },
  {
    id: '5',
    naziv: 'Gentleman\'s Club',
    lokacija: 'Centar, Novi Sad',
    ocena: 4.9,
    slika: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800',
    opis: 'Premium muški salon sa akcentom na tradicionalne tehnike brijanja opasno oštrim britvama i vrhunsku negu.'
  },
  {
    id: '6',
    naziv: 'La Rose',
    lokacija: 'Detelinara, Novi Sad',
    ocena: 4.5,
    slika: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800',
    opis: 'Mali, šarmantni porodični salon sa tradicijom dugom preko 10 godina. Brza i kvalitetna usluga za celu porodicu.'
  },
  {
    id: '7',
    naziv: 'Studio Diamond',
    lokacija: 'Sajmište, Novi Sad',
    ocena: 4.8,
    slika: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800',
    opis: 'Specijalisti za svečane frizure, svadbe i mature. Profesionalno nadogradnja kose i keratin tretmani.'
  },
  {
    id: '8',
    naziv: 'The Barberian',
    lokacija: 'Podbara, Novi Sad',
    ocena: 4.7,
    slika: 'https://images.unsplash.com/photo-1512864084360-7c0c4d0a0845?w=800',
    opis: 'Alternativni barber shop sa sjajnom muzikom, hladnim pićem i frizerima koji će vašu frizuru dovesti do savršenstva.'
  },
  {
    id: '9',
    naziv: 'Aura Hair & Care',
    lokacija: 'Telep, Novi Sad',
    ocena: 4.4,
    slika: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800',
    opis: 'Fokusirani na zdravlje vaše kose. Radimo isključivo sa veganskim i organskim preparatima bez sulfata.'
  },
  {
    id: '10',
    naziv: 'Urban Cut',
    lokacija: 'Liman, Novi Sad',
    ocena: 4.6,
    slika: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800',
    opis: 'Brzo, efikasno i moderno šišanje za zaposlene i studente. Pratimo korak sa vremenom i urbanim stilom.'
  },
  {
    id: '11',
    naziv: 'Atelje Kose',
    lokacija: 'Petrovaradin, Novi Sad',
    ocena: 4.9,
    slika: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800',
    opis: 'Umetnički pristup svakom klijentu. Dođite na besplatne konsultacije i pronađite idealan oblik frizure za vaš oblik lica.'
  },
  {
    id: '12',
    naziv: 'Barber Shop Old School',
    lokacija: 'Novo Naselje, Novi Sad',
    ocena: 4.7,
    slika: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800',
    opis: 'Kao što ime kaže – povratak starim vrednostima. Opustite se u retro stolicama i prepustite se iskusnim rukama.'
  }
];

function Home() {
  const [saloni, setSaloni] = useState(MOCK_SALONI);
  const [pretraga, setPretraga] = useState('');

  // Logika za pretragu salona po nazivu ili lokaciji
  const filtriraniSaloni = saloni.filter(salon =>
    salon.naziv.toLowerCase().includes(pretraga.toLowerCase()) ||
    salon.lokacija.toLowerCase().includes(pretraga.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-0">
      {/* Hero sekcija */}
      <div className="flex flex-col items-center justify-center text-center mb-6">
  <img  
    src={makazeImg} alt="BeautyMap logo" 
    alt="BeautyMap logo" 
    className="w-full max-w-xs h-auto object-contain mb-2" 
  />
  <h1 className="text-3xl md:text-6xl font-extrabold text-gray-950 mb-4 max-w-xxl">
    NAJBOLJI FRIZERSKI SALON U NOVOM SADU
  </h1>
        
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Pregledajte usluge, cene i lokacije salona, pročitajte recenzije i zakažite svoj termin.
          
        </p>
        
        <p className="text-lg text-pink-500 max-w-xl mx-auto">
            Vaš BeautyMap!
            </p>
      </div>

      {/* Pretraga */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Pretraži salone po nazivu ili lokaciji..."
            value={pretraga}
            onChange={(e) => setPretraga(e.target.value)}
            className="w-full max-w-xl px-6 py-3 rounded-full border border-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-md"
          />
        </div>
      </div>

      {/* Grid sa salonima */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtriraniSaloni.map((salon) => (
          <div key={salon.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={salon.slika} alt={salon.naziv} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900">{salon.naziv}</h3>
                <span className="bg-pink-100 text-pink-700 text-sm font-bold px-2.5 py-0.5 rounded">
                  ⭐ {salon.ocena}
                </span>
              </div>
              <p className="text-sm text-pink-600 font-medium mb-3">📍 {salon.lokacija}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{salon.opis}</p>
              <Link 
  to={`/salon/${salon.id}`} 
  className="block text-center w-full bg-gray-950 text-white font-semibold py-2.5 rounded-xl hover:bg-pink-600 transition-colors"
>
  Pogledaj salon
</Link>
            </div>
          </div>
        ))}
      </div>

      {filtriraniSaloni.length === 0 && (
        <p className="text-center text-gray-500 mt-8">Nema pronađenih salona za uneti pojam.</p>
      )}
    </div>
  );
}

export default Home;