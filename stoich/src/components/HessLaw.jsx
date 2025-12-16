import React, { useState } from 'react';
import { Plus, Minus, X, RotateCcw, Check, Lightbulb, Moon, Sun } from 'lucide-react';

const HessLawSimulation = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [mode, setMode] = useState('guided');
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const examples = {
    guided: {
      title: "Pembentukan CO₂ melalui CO",
      target: "C(s) + O₂(g) → CO₂(g)",
      targetDH: -393.5,
      reactions: [
        { id: 1, equation: "C(s) + ½O₂(g) → CO(g)", dH: -110.5, coef: 1, flipped: false },
        { id: 2, equation: "CO(g) + ½O₂(g) → CO₂(g)", dH: -283.0, coef: 1, flipped: false }
      ],
      hint: "Jumlahkan kedua reaksi. Perhatikan CO akan tereliminasi.",
      explanation: "Menurut Hukum Hess, ΔH total = ΔH₁ + ΔH₂ = -110.5 + (-283.0) = -393.5 kJ/mol"
    },
    practice: {
      title: "Pembakaran Karbon",
      target: "C(s) + O₂(g) → CO₂(g)",
      targetDH: -393.5,
      reactions: [
        { id: 1, equation: "C(s) + ½O₂(g) → CO(g)", dH: -110.5, coef: 1, flipped: false },
        { id: 2, equation: "CO₂(g) → CO(g) + ½O₂(g)", dH: 283.0, coef: 1, flipped: false }
      ],
      hint: "Flip reaksi kedua agar CO₂ ada di sisi produk",
      explanation: "Flip reaksi 2: ΔH = -110.5 + (-283.0) = -393.5 kJ/mol"
    },
    challenge: {
      title: "Pembentukan NH₃ (Haber)",
      target: "½N₂(g) + 3/2H₂(g) → NH₃(g)",
      targetDH: -46.1,
      reactions: [
        { id: 1, equation: "N₂(g) + 3H₂(g) → 2NH₃(g)", dH: -92.2, coef: 1, flipped: false },
        { id: 2, equation: "H₂(g) + ½O₂(g) → H₂O(l)", dH: -285.8, coef: 1, flipped: false }
      ],
      hint: "Kalikan reaksi 1 dengan ½ untuk mendapatkan 1 mol NH₃",
      explanation: "Gunakan reaksi 1 saja, kalikan dengan ½: ΔH = -92.2 × ½ = -46.1 kJ/mol"
    }
  };

  const [currentExample, setCurrentExample] = useState(examples[mode]);
  const [reactions, setReactions] = useState([...currentExample.reactions]);

  const flipReaction = (id) => {
    setReactions(reactions.map(r => 
      r.id === id ? { ...r, dH: -r.dH, flipped: !r.flipped } : r
    ));
  };

  const multiplyReaction = (id, factor) => {
    setReactions(reactions.map(r => 
      r.id === id ? { ...r, dH: r.dH * factor, coef: r.coef * factor } : r
    ));
  };

  const calculateTotal = () => {
    return reactions.reduce((sum, r) => sum + r.dH, 0).toFixed(1);
  };

  const checkAnswer = () => {
    const total = parseFloat(calculateTotal());
    const target = currentExample.targetDH;
    if (Math.abs(total - target) < 0.5) {
      setFeedback('✅ Benar! ΔH = ' + total + ' kJ/mol');
    } else {
      setFeedback('❌ Belum tepat. Coba lagi atau lihat hint.');
    }
  };

  const resetSimulation = () => {
    setReactions([...currentExample.reactions]);
    setFeedback('');
    setShowHint(false);
    setShowExplanation(false);
    setUserAnswer('');
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setCurrentExample(examples[newMode]);
    setReactions([...examples[newMode].reactions]);
    setFeedback('');
    setShowHint(false);
    setShowExplanation(false);
  };

  const bgClass = darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';
  const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const inputClass = darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300';

  return (
    <div className={`min-h-screen p-6 ${bgClass}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Simulasi Hukum Hess</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg hover:bg-gray-700">
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* Mode Selection */}
        <div className="flex gap-3 mb-6">
          {['guided', 'practice', 'challenge'].map(m => (
            <button
              key={m}
              onClick={() => changeMode(m)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                mode === m 
                  ? 'bg-blue-600 text-white' 
                  : darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
              }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Reactions */}
          <div className="lg:col-span-2 space-y-4">
            {/* Target Reaction */}
            <div className={`p-6 rounded-lg border-2 border-green-500 ${cardClass}`}>
              <h2 className="font-bold text-lg mb-2">{currentExample.title}</h2>
              <p className="text-xl mb-2">{currentExample.target}</p>
              <p className="text-green-400">ΔH° = ? (Target: {currentExample.targetDH} kJ/mol)</p>
            </div>

            {/* Reactions List */}
            <div className="space-y-3">
              {reactions.map((reaction, idx) => (
                <div key={reaction.id} className={`p-4 rounded-lg border ${cardClass}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="font-mono text-sm text-gray-400">Reaksi {idx + 1}</p>
                      <p className="text-lg">{reaction.equation}</p>
                      <p className={`text-lg font-bold ${reaction.dH < 0 ? 'text-blue-400' : 'text-red-400'}`}>
                        ΔH = {reaction.dH > 0 ? '+' : ''}{reaction.dH.toFixed(1)} kJ/mol
                        {reaction.coef !== 1 && ` (×${reaction.coef})`}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => flipReaction(reaction.id)}
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm"
                      title="Balik reaksi"
                    >
                      <RotateCcw size={16} className="inline" /> Flip
                    </button>
                    <button
                      onClick={() => multiplyReaction(reaction.id, 2)}
                      className="px-3 py-1 bg-orange-600 hover:bg-orange-700 rounded text-sm"
                    >
                      ×2
                    </button>
                    <button
                      onClick={() => multiplyReaction(reaction.id, 0.5)}
                      className="px-3 py-1 bg-orange-600 hover:bg-orange-700 rounded text-sm"
                    >
                      ×½
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculation Result */}
            <div className={`p-6 rounded-lg border-2 ${cardClass}`}>
              <h3 className="font-bold text-xl mb-4">Perhitungan Total</h3>
              <div className="space-y-2 mb-4">
                {reactions.map((r, idx) => (
                  <div key={r.id} className="flex justify-between items-center">
                    <span>Reaksi {idx + 1}:</span>
                    <span className="font-mono">{r.dH > 0 ? '+' : ''}{r.dH.toFixed(1)} kJ/mol</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-xl">
                  <span>Total ΔH:</span>
                  <span className={calculateTotal() < 0 ? 'text-blue-400' : 'text-red-400'}>
                    {calculateTotal()} kJ/mol
                  </span>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="mt-4">
                <div className="h-8 bg-gray-700 rounded-lg overflow-hidden flex">
                  {reactions.map((r, idx) => {
                    const total = Math.abs(reactions.reduce((sum, rx) => sum + rx.dH, 0));
                    const width = total > 0 ? (Math.abs(r.dH) / total * 100) : 0;
                    return (
                      <div
                        key={r.id}
                        className={`h-full ${r.dH < 0 ? 'bg-blue-500' : 'bg-red-500'}`}
                        style={{ width: `${width}%` }}
                        title={`${r.dH.toFixed(1)} kJ/mol`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={checkAnswer}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold flex items-center justify-center gap-2"
                >
                  <Check size={20} /> Check Answer
                </button>
                <button
                  onClick={resetSimulation}
                  className="px-4 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg"
                >
                  <RotateCcw size={20} />
                </button>
              </div>

              {feedback && (
                <div className={`mt-4 p-4 rounded-lg ${
                  feedback.includes('✅') ? 'bg-green-900/50' : 'bg-red-900/50'
                }`}>
                  {feedback}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Help */}
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${cardClass}`}>
              <h3 className="font-bold mb-3">Hukum Hess</h3>
              <p className="text-sm mb-3">
                Perubahan entalpi suatu reaksi tidak bergantung pada jalannya reaksi, 
                tetapi hanya bergantung pada keadaan awal dan akhir.
              </p>
              <div className="text-xs space-y-2">
                <p><strong>Tips:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Flip reaksi jika perlu membalik posisi reaktan/produk</li>
                  <li>Kalikan koefisien jika jumlah mol tidak sesuai</li>
                  <li>Jumlahkan semua ΔH untuk mendapat total</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowHint(!showHint)}
              className={`w-full p-4 rounded-lg flex items-center gap-2 ${
                darkMode ? 'bg-yellow-900 hover:bg-yellow-800' : 'bg-yellow-100 hover:bg-yellow-200'
              }`}
            >
              <Lightbulb size={20} />
              <span className="font-semibold">{showHint ? 'Hide' : 'Show'} Hint</span>
            </button>

            {showHint && (
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-yellow-900/50' : 'bg-yellow-100'}`}>
                <p className="text-sm">{currentExample.hint}</p>
              </div>
            )}

            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className={`w-full p-4 rounded-lg ${darkMode ? 'bg-blue-900 hover:bg-blue-800' : 'bg-blue-100 hover:bg-blue-200'}`}
            >
              <span className="font-semibold">{showExplanation ? 'Hide' : 'Show'} Explanation</span>
            </button>

            {showExplanation && (
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
                <p className="text-sm">{currentExample.explanation}</p>
              </div>
            )}

            <div className={`p-4 rounded-lg ${cardClass}`}>
              <h4 className="font-bold mb-2">Mode Info</h4>
              <div className="text-sm space-y-2">
                <p><strong>Guided:</strong> Contoh dengan langkah jelas</p>
                <p><strong>Practice:</strong> Latihan mandiri</p>
                <p><strong>Challenge:</strong> Soal kompleks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HessLawSimulation;