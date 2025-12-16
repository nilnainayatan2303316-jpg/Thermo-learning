import React, { useState, useEffect } from 'react';
import { Flame, BookOpen, Activity, FlaskConical, ClipboardCheck, BookMarked, Sun, Moon } from 'lucide-react';

// Particle Animation Component
const Particle = ({ delay, duration, startX, startY }) => {
  return (
    <div
      className="absolute w-2 h-2 rounded-full opacity-60"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        background: 'radial-gradient(circle, #f97316, #ef4444)',
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
};

// LandingPage Component
const LandingPage = ({ onNavigate, isDark }) => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
  }));

  const modules = [
    {
      id: 'theory',
      title: 'Modul Teori',
      description: 'Pelajari konsep dasar termokimia dari sistem hingga Hukum Hess',
      icon: BookOpen,
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'enthalpy',
      title: 'Simulasi Entalpi',
      description: 'Visualisasi reaksi eksoterm dan endoterm secara interaktif',
      icon: Activity,
      color: 'from-red-500 to-pink-500',
    },
    {
      id: 'hess',
      title: 'Simulasi Hukum Hess',
      description: 'Praktikkan perhitungan entalpi dengan Hukum Hess',
      icon: Flame,
      color: 'from-orange-600 to-red-600',
    },
    {
      id: 'lab',
      title: 'Lab Virtual',
      description: 'Eksperimen kalorimetri virtual dengan berbagai reaksi',
      icon: FlaskConical,
      color: 'from-red-600 to-orange-500',
    },
    {
      id: 'assessment',
      title: 'Assessment',
      description: 'Uji pemahaman dengan berbagai tipe soal interaktif',
      icon: ClipboardCheck,
      color: 'from-pink-500 to-red-500',
    },
    {
      id: 'reference',
      title: 'Referensi',
      description: 'Sumber belajar dan data termokimia lengkap',
      icon: BookMarked,
      color: 'from-orange-500 to-red-600',
    },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-orange-900/20 via-red-900/20 to-pink-900/20' : 'from-orange-200 via-red-200 to-pink-200'}`}>
          {particles.map((p) => (
            <Particle key={p.id} delay={p.delay} duration={p.duration} startX={p.startX} startY={p.startY} />
          ))}
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-block mb-6">
              <Flame className={`w-20 h-20 ${isDark ? 'text-orange-400' : 'text-orange-600'} animate-pulse`} />
            </div>
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Termokimia
            </h1>
            <p className={`text-xl md:text-2xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Jelajahi Dunia Energi dalam Reaksi Kimia
            </p>
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold shadow-lg">
              Platform Pembelajaran Interaktif
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Pilih Modul Pembelajaran
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => onNavigate(module.id)}
                className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="p-8">
                  <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${module.color} mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {module.title}
                  </h3>
                  
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {module.description}
                  </p>
                  
                  <div className={`mt-4 inline-flex items-center text-sm font-semibold bg-gradient-to-r ${module.color} bg-clip-text text-transparent`}>
                    Mulai Belajar →
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t py-8 mt-16`}>
        <div className="container mx-auto px-4 text-center">
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2025 Thermochemistry Learning Platform
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translate(10px, -20px) scale(1.2);
            opacity: 0.8;
          }
          50% {
            transform: translate(-10px, -40px) scale(0.8);
            opacity: 0.4;
          }
          75% {
            transform: translate(15px, -30px) scale(1.1);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

// Theory Module Component
const TheoryModule = ({ isDark, onNavigate }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});
  const [calcInput, setCalcInput] = useState({ reactants: '', products: '' });
  const [calcResult, setCalcResult] = useState(null);

  const sections = [
    { id: 0, title: 'Sistem dan Lingkungan', icon: '🔄' },
    { id: 1, title: 'Entalpi dan Perubahan Entalpi', icon: '⚡' },
    { id: 2, title: 'Reaksi Eksoterm dan Endoterm', icon: '🔥' },
    { id: 3, title: 'Persamaan Termokimia', icon: '📝' },
    { id: 4, title: 'Jenis Perubahan Entalpi Standar', icon: '📊' },
    { id: 5, title: 'Perhitungan Entalpi', icon: '🧮' },
    { id: 6, title: 'Hukum Hess', icon: '⚖️' },
  ];

  const toggleCard = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const progress = ((activeSection + 1) / sections.length) * 100;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r min-h-screen sticky top-0 hidden md:block`}>
          <div className="p-6">
            <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Daftar Topik
            </h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      : isDark
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Section 0: Sistem dan Lingkungan */}
          {activeSection === 0 && (
            <div className="max-w-4xl mx-auto">
              <h1 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Sistem dan Lingkungan
              </h1>

              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 mb-6 shadow-lg`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  Definisi
                </h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>Sistem</strong> adalah bagian dari alam semesta yang menjadi fokus studi. <strong>Lingkungan</strong> adalah segala sesuatu di luar sistem.
                </p>
              </div>

              {/* Interactive Diagram */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  { type: 'Sistem Terbuka', desc: 'Pertukaran materi dan energi', example: 'Air mendidih tanpa tutup', color: 'blue' },
                  { type: 'Sistem Tertutup', desc: 'Hanya pertukaran energi', example: 'Air dalam botol tertutup yang dipanaskan', color: 'green' },
                  { type: 'Sistem Terisolasi', desc: 'Tidak ada pertukaran', example: 'Termos yang sempurna', color: 'purple' },
                ].map((sys, idx) => (
                  <div
                    key={idx}
                    className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg hover:scale-105 transition-transform cursor-pointer`}
                    onClick={() => toggleCard(`sys-${idx}`)}
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${sys.color}-500/20 flex items-center justify-center`}>
                      <div className={`w-10 h-10 rounded-full bg-${sys.color}-500`} />
                    </div>
                    <h4 className={`text-lg font-bold mb-2 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {sys.type}
                    </h4>
                    <p className={`text-sm text-center mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {sys.desc}
                    </p>
                    <p className={`text-xs text-center italic ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      Contoh: {sys.example}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigate('enthalpy')}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Coba Simulasi Entalpi →
              </button>
            </div>
          )}

          {/* Section 1: Entalpi */}
          {activeSection === 1 && (
            <div className="max-w-4xl mx-auto">
              <h1 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Entalpi dan Perubahan Entalpi
              </h1>

              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 mb-6 shadow-lg`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  Konsep Entalpi (H)
                </h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Entalpi adalah kandungan kalor suatu zat pada tekanan tetap. Entalpi absolut suatu zat tidak dapat diukur, yang dapat diukur adalah <strong>perubahan entalpi (ΔH)</strong>.
                </p>
                <div className={`${isDark ? 'bg-gray-700' : 'bg-orange-50'} p-4 rounded-lg`}>
                  <p className="text-center text-2xl font-mono mb-2">ΔH = H<sub>produk</sub> - H<sub>reaktan</sub></p>
                  <p className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Satuan: kJ/mol, kkal/mol, J/mol
                  </p>
                </div>
              </div>

              {/* Flip Cards */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  { front: 'ΔH < 0', back: 'Reaksi Eksoterm\nMembebaskan kalor' },
                  { front: 'ΔH > 0', back: 'Reaksi Endoterm\nMenyerap kalor' },
                ].map((card, idx) => (
                  <div
                    key={idx}
                    className="h-40 cursor-pointer perspective"
                    onClick={() => toggleCard(`enth-${idx}`)}
                  >
                    <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${flippedCards[`enth-${idx}`] ? 'rotate-y-180' : ''}`}>
                      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-orange-600 to-red-600' : 'bg-gradient-to-br from-orange-400 to-red-400'} rounded-xl flex items-center justify-center backface-hidden`}>
                        <p className="text-white text-3xl font-bold">{card.front}</p>
                      </div>
                      <div className={`absolute inset-0 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl flex items-center justify-center backface-hidden rotate-y-180 shadow-lg`}>
                        <p className={`text-center font-semibold whitespace-pre-line ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {card.back}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Eksoterm dan Endoterm */}
          {activeSection === 2 && (
            <div className="max-w-4xl mx-auto">
              <h1 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Reaksi Eksoterm dan Endoterm
              </h1>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Eksoterm */}
                <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h3 className="text-xl font-bold mb-4 text-red-500">🔥 Reaksi Eksoterm</h3>
                  <div className="relative h-48 mb-4">
                    <svg viewBox="0 0 200 150" className="w-full h-full">
                      <defs>
                        <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
                          <polygon points="0 0, 10 3, 0 6" fill="#ef4444" />
                        </marker>
                      </defs>
                      <line x1="20" y1="50" x2="80" y2="50" stroke="#ef4444" strokeWidth="3" />
                      <text x="50" y="40" textAnchor="middle" fill={isDark ? '#fff' : '#000'} fontSize="12">Reaktan</text>
                      <path d="M 80 50 Q 100 30, 120 50" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrowRed)" />
                      <line x1="120" y1="100" x2="180" y2="100" stroke="#ef4444" strokeWidth="3" />
                      <text x="150" y="120" textAnchor="middle" fill={isDark ? '#fff' : '#000'} fontSize="12">Produk</text>
                      <line x1="90" y1="50" x2="90" y2="100" stroke="#666" strokeWidth="1" strokeDasharray="5,5" />
                      <text x="100" y="80" fill="#ef4444" fontSize="14" fontWeight="bold">ΔH &lt; 0</text>
                    </svg>
                  </div>
                  <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>• Melepaskan kalor ke lingkungan</li>
                    <li>• Suhu lingkungan naik</li>
                    <li>• Contoh: Pembakaran, Netralisasi</li>
                  </ul>
                </div>

                {/* Endoterm */}
                <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <h3 className="text-xl font-bold mb-4 text-blue-500">❄️ Reaksi Endoterm</h3>
                  <div className="relative h-48 mb-4">
                    <svg viewBox="0 0 200 150" className="w-full h-full">
                      <defs>
                        <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
                          <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
                        </marker>
                      </defs>
                      <line x1="20" y1="100" x2="80" y2="100" stroke="#3b82f6" strokeWidth="3" />
                      <text x="50" y="120" textAnchor="middle" fill={isDark ? '#fff' : '#000'} fontSize="12">Reaktan</text>
                      <path d="M 80 100 Q 100 80, 120 50" stroke="#3b82f6" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)" />
                      <line x1="120" y1="50" x2="180" y2="50" stroke="#3b82f6" strokeWidth="3" />
                      <text x="150" y="40" textAnchor="middle" fill={isDark ? '#fff' : '#000'} fontSize="12">Produk</text>
                      <line x1="90" y1="50" x2="90" y2="100" stroke="#666" strokeWidth="1" strokeDasharray="5,5" />
                      <text x="100" y="80" fill="#3b82f6" fontSize="14" fontWeight="bold">ΔH &gt; 0</text>
                    </svg>
                  </div>
                  <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>• Menyerap kalor dari lingkungan</li>
                    <li>• Suhu lingkungan turun</li>
                    <li>• Contoh: Fotosintesis, Pelarutan NH₄NO₃</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={() => onNavigate('enthalpy')}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Coba Simulasi Reaksi →
              </button>
            </div>
          )}

          {/* Section 3: Persamaan Termokimia */}
          {activeSection === 3 && (
            <div className="max-w-4xl mx-auto">
              <h1 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Persamaan Termokimia
              </h1>

              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 mb-6 shadow-lg`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  Aturan Penulisan
                </h3>
                <ol className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li><strong>1.</strong> Tulis wujud zat dalam kurung: (s), (l), (g), (aq)</li>
                  <li><strong>2.</strong> Nilai ΔH ditulis di sebelah kanan dengan satuan</li>
                  <li><strong>3.</strong> Koefisien dapat berupa pecahan</li>
                  <li><strong>4.</strong> Jika persamaan dibalik, tanda ΔH berubah</li>
                  <li><strong>5.</strong> Jika koefisien dikalikan n, ΔH juga dikalikan n</li>
                </ol>
              </div>

              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 mb-6 shadow-lg`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  Contoh Interaktif
                </h3>
                <div className={`${isDark ? 'bg-gray-700' : 'bg-orange-50'} p-4 rounded-lg mb-4`}>
                  <p className="font-mono text-lg mb-2">
                    CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)  ΔH = -890 kJ
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Pembakaran 1 mol metana melepaskan 890 kJ energi
                  </p>
                </div>

                <div className={`${isDark ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg`}>
                  <p className="font-mono text-lg mb-2">
                    N₂(g) + O₂(g) → 2NO(g)  ΔH = +180 kJ
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Pembentukan 2 mol NO memerlukan 180 kJ energi
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Jenis Perubahan Entalpi */}
          {activeSection === 4 && (
            <div className="max-w-4xl mx-auto">
              <h1 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Jenis Perubahan Entalpi Standar
              </h1>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { symbol: 'ΔH°f', name: 'Entalpi Pembentukan', desc: 'Kalor pembentukan 1 mol senyawa dari unsur-unsurnya', example: 'C(s) + O₂(g) → CO₂(g)' },
                  { symbol: 'ΔH°c', name: 'Entalpi Pembakaran', desc: 'Kalor pembakaran 1 mol zat sempurna dengan O₂', example: 'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)' },
                  { symbol: 'ΔH°d', name: 'Entalpi Penguraian', desc: 'Kalor penguraian 1 mol senyawa menjadi unsur-unsurnya', example: '2H₂O(l) → 2H₂(g) + O₂(g)' },
                  { symbol: 'ΔH°n', name: 'Entalpi Netralisasi', desc: 'Kalor reaksi asam dan basa membentuk 1 mol H₂O', example: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)' },
                  { symbol: 'ΔH°sol', name: 'Entalpi Pelarutan', desc: 'Kalor melarutkan 1 mol zat dalam pelarut', example: 'NaCl(s) → Na⁺(aq) + Cl⁻(aq)' },
                  { symbol: 'ΔH°vap', name: 'Entalpi Penguapan', desc: 'Kalor menguapkan 1 mol zat cair', example: 'H₂O(l) → H₂O(g)' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`${isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} rounded-xl p-6 shadow-lg transition-all cursor-pointer`}
                    onClick={() => toggleCard(`type-${idx}`)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl font-bold text-orange-500">{item.symbol}</span>
                      <div className="flex-1">
                        <h4 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {item.name}
                        </h4>
                        <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.desc}
                        </p>
                        <p className={`text-xs font-mono ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {item.example}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: Perhitungan Entalpi */}
          {activeSection === 5 && (
            <div className="max-w-4xl mx-auto">
              <h1 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Perhitungan Entalpi
              </h1>

              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 mb-6 shadow-lg`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  Metode 1: Dari ΔH°f
                </h3>
                <div className={`${isDark ? 'bg-gray-700' : 'bg-orange-50'} p-4 rounded-lg mb-4`}>
                  <p className="text-center text-xl font-mono mb-2">
                    ΔH°reaksi = Σ ΔH°f (produk) - Σ ΔH°f (reaktan)
                  </p>
                </div>
                <div className={`${isDark ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg`}>
                  <p className="font-semibold mb-2">Contoh:</p>
                  <p className="font-mono mb-2">CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)</p>
                  <p className="text-sm">ΔH°f CH₄ = -74.8 kJ/mol</p>
                  <p className="text-sm">ΔH°f CO₂ = -393.5 kJ/mol</p>
                  <p className="text-sm">ΔH°f H₂O = -285.8 kJ/mol</p>
                  <p className="text-sm mt-2 font-semibold">
                    ΔH° = [(-393.5) + 2(-285.8)] - [(-74.8) + 0] = -890.3 kJ
                  </p>
                </div>
              </div>

              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 mb-6 shadow-lg`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  Metode 2: Dari Energi Ikatan
                </h3>
                <div className={`${isDark ? 'bg-gray-700' : 'bg-orange-50'} p-4 rounded-lg`}>
                  <p className="text-center text-xl font-mono">
                    ΔH = Σ Energi ikatan terputus - Σ Energi ikatan terbentuk
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('enthalpy')}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Coba Kalkulator Entalpi →
              </button>
            </div>
          )}

          {/* Section 6: Hukum Hess */}
          {activeSection === 6 && (
            <div className="max-w-4xl mx-auto">
              <h1 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Hukum Hess
              </h1>

              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 mb-6 shadow-lg`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  Prinsip Dasar
                </h3>
                <p className={`text-lg mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <em>"Perubahan entalpi reaksi tidak bergantung pada jalannya reaksi, tetapi hanya bergantung pada keadaan awal dan keadaan akhir."</em>
                </p>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  - Germain Henri Hess (1840)
                </p>
              </div>

              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 mb-6 shadow-lg`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  Diagram Siklus
                </h3>
                <div className="relative h-64">
                  <svg viewBox="0 0 400 200" className="w-full h-full">
                    <defs>
                      <marker id="arrow1" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="#f97316" />
                      </marker>
                      <marker id="arrow2" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
                      </marker>
                    </defs>
                    
                    {/* Path 1: Direct */}
                    <line x1="50" y1="50" x2="350" y2="50" stroke="#f97316" strokeWidth="3" markerEnd="url(#arrow1)" />
                    <text x="200" y="40" textAnchor="middle" fill="#f97316" fontSize="14" fontWeight="bold">ΔH₁ (langsung)</text>
                    
                    {/* Path 2: Indirect */}
                    <line x1="50" y1="50" x2="50" y2="150" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow2)" />
                    <line x1="50" y1="150" x2="350" y2="150" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow2)" />
                    <text x="200" y="170" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">ΔH₃</text>
                    
                    <line x1="350" y1="150" x2="350" y2="50" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow2)" />
                    <text x="370" y="100" fill="#3b82f6" fontSize="14" fontWeight="bold">ΔH₄</text>
                    
                    {/* Labels */}
                    <text x="50" y="35" textAnchor="middle" fill={isDark ? '#fff' : '#000'} fontSize="16" fontWeight="bold">A</text>
                    <text x="350" y="35" textAnchor="middle" fill={isDark ? '#fff' : '#000'} fontSize="16" fontWeight="bold">B</text>
                    <text x="50" y="180" textAnchor="middle" fill={isDark ? '#fff' : '#000'} fontSize="16" fontWeight="bold">C</text>
                  </svg>
                </div>
                <div className={`${isDark ? 'bg-gray-700' : 'bg-orange-50'} p-4 rounded-lg mt-4`}>
                  <p className="text-center text-xl font-mono font-bold">
                    ΔH₁ = ΔH₂ + ΔH₃ + ΔH₄
                  </p>
                </div>
              </div>

              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 mb-6 shadow-lg`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  Contoh Perhitungan
                </h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Tentukan ΔH pembentukan CO₂ dari reaksi:
                </p>
                <div className={`${isDark ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg space-y-2`}>
                  <p className="font-mono text-sm">1) C(s) + ½O₂(g) → CO(g)    ΔH₁ = -110.5 kJ</p>
                  <p className="font-mono text-sm">2) CO(g) + ½O₂(g) → CO₂(g)  ΔH₂ = -283.0 kJ</p>
                  <p className="font-mono text-sm mt-4 font-bold text-green-600">
                    C(s) + O₂(g) → CO₂(g)    ΔH = -393.5 kJ
                  </p>
                  <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    ΔH = ΔH₁ + ΔH₂ = -110.5 + (-283.0) = -393.5 kJ
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('hess')}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Coba Simulasi Hukum Hess →
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 max-w-4xl mx-auto">
            <button
              onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
              disabled={activeSection === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeSection === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : isDark
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              ← Sebelumnya
            </button>
            <button
              onClick={() => setActiveSection(Math.min(6, activeSection + 1))}
              disabled={activeSection === 6}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeSection === 6
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg'
              }`}
            >
              Selanjutnya →
            </button>
          </div>
        </main>
      </div>

      <style>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

const EnthalpySimulation = ({ isDark, onNavigate }) => (
  <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-8`}>
    <h1 className="text-4xl font-bold mb-4">Simulasi Entalpi</h1>
    <p>Konten simulasi entalpi akan ditambahkan di sini...</p>
  </div>
);

const HessLawSimulation = ({ isDark, onNavigate }) => (
  <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-8`}>
    <h1 className="text-4xl font-bold mb-4">Simulasi Hukum Hess</h1>
    <p>Konten simulasi Hukum Hess akan ditambahkan di sini...</p>
  </div>
);

const VirtualLab = ({ isDark, onNavigate }) => (
  <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-8`}>
    <h1 className="text-4xl font-bold mb-4">Lab Virtual</h1>
    <p>Konten lab virtual akan ditambahkan di sini...</p>
  </div>
);

const Assessment = ({ isDark, onNavigate }) => (
  <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-8`}>
    <h1 className="text-4xl font-bold mb-4">Assessment</h1>
    <p>Konten assessment akan ditambahkan di sini...</p>
  </div>
);

const Reference = ({ isDark, onNavigate }) => (
  <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-8`}>
    <h1 className="text-4xl font-bold mb-4">Referensi</h1>
    <p>Konten referensi akan ditambahkan di sini...</p>
  </div>
);

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      {currentPage !== 'landing' && (
        <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-50 transition-colors duration-300`}>
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <button
              onClick={() => navigate('landing')}
              className={`flex items-center gap-2 text-xl font-bold ${isDark ? 'text-white hover:text-orange-400' : 'text-gray-900 hover:text-orange-600'} transition-colors`}
            >
              <Flame className="w-6 h-6" />
              Termokimia
            </button>
            
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>
      )}

      {/* Theme Toggle on Landing */}
      {currentPage === 'landing' && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full shadow-lg ${isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-100'} transition-all`}
          >
            {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
      )}

      {/* Page Routing */}
      {currentPage === 'landing' && <LandingPage onNavigate={navigate} isDark={isDark} />}
      {currentPage === 'theory' && <TheoryModule isDark={isDark} onNavigate={navigate} />}
      {currentPage === 'enthalpy' && <EnthalpySimulation isDark={isDark} onNavigate={navigate} />}
      {currentPage === 'hess' && <HessLawSimulation isDark={isDark} onNavigate={navigate} />}
      {currentPage === 'lab' && <VirtualLab isDark={isDark} onNavigate={navigate} />}
      {currentPage === 'assessment' && <Assessment isDark={isDark} onNavigate={navigate} />}
      {currentPage === 'reference' && <Reference isDark={isDark} onNavigate={navigate} />}
    </div>
  );
}

export default App;