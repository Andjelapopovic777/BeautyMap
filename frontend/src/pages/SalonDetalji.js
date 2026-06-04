import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ModalZaZakazivanje from './ModalZaZakazivanje';

function SalonDetalji() {
  const { id } = useParams();
  const [salon, setSalon] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Stanja za modal i recenzije
  const [prikažiModal, setPrikažiModal] = useState(false);
  const [isFormaOpen, setIsFormaOpen] = useState(false);
  const [porukaModala, setPorukaModala] = useState('');

  // Učitavanje salona iz baze
  useEffect(() => {
    axios.get(`http://localhost:5000/api/saloni/${id}`)
      .then(res => {
        setSalon(res.data.data); // Backend vraća { success: true, data: salon }
        setLoading(false);
      })
      .catch(err => {
        console.error("Greška pri učitavanju:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center p-20">Učitavanje podataka...</div>;
  if (!salon) return <div className="text-center p-8">Salon nije pronađen.</div>;

  const proveriAkciju = (tipAkcije) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setPorukaModala(tipAkcije === 'zakazi' ? 'Morate biti prijavljeni da biste zakazali termin.' : 'Morate biti prijavljeni za recenziju.');
      setPrikažiModal(true);
    } else if (tipAkcije === 'zakazi') {
      setIsFormaOpen(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="text-pink-500 font-semibold hover:underline mb-6 inline-block">← Nazad na početnu</Link>
      
      {/* Koristimo salon.slika ili placeholder ako ne postoji */}
      {/* <img src={salon.slika || 'https://via.placeholder.com/800'} alt={salon.name} className="w-full h-80 object-cover rounded-2xl shadow-md mb-8" /> */}
      

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-4xl font-black text-gray-900">{salon.name}</h1>
      </div>
      
      <p className="text-pink-600 font-medium mb-4">📍 {salon.address}</p>
      
      <p className="text-gray-700 text-lg leading-relaxed mb-8">{salon.description}</p>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
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

      <ModalZaZakazivanje 
        isOpen={isFormaOpen} 
        onClose={() => setIsFormaOpen(false)} 
        imeSalona={salon.name} 
      />
    </div>
  );
}

export default SalonDetalji;