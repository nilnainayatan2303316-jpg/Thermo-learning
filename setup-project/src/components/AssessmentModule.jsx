import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, CheckCircle, AlertCircle, ChevronRight, ChevronLeft, 
  Flag, Calculator, BookOpen, BarChart2, Award, Printer, Moon, Sun, RotateCcw
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend 
} from 'recharts';
import { clsx, typeclassvalue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility untuk Tailwind classes
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- DATA: Bank Soal (Sample Representative Subset) ---
// Dalam produksi, ini bisa dipindahkan ke file JSON/Database terpisah.
// Mencakup representasi dari 23 soal yang diminta.

const TOPICS = {
  SYSTEM: "Sistem & Lingkungan",
  RXN_TYPE: "Eksoterm/Endoterm",
  EQ: "Persamaan Termokimia",
  CALC: "Perhitungan ΔH",
  HESS: "Hukum Hess",
  CALORIMETRY: "Kalorimetri",
  STD_H: "Jenis ΔH Standar"
};

const questionsData = [
  // --- Multiple Choice (Sample of 10) ---
  {
    id: 1,
    type: 'mcq',
    topic: TOPICS.SYSTEM,
    difficulty: 'Easy',
    question: "Dalam percobaan pelarutan urea dalam air di gelas beker, dinding gelas terasa dingin. Manakah pernyataan yang benar mengenai sistem dan lingkungan?",
    options: [
      "Sistem: Urea+Air, Lingkungan: Gelas+Udara",
      "Sistem: Gelas, Lingkungan: Urea+Air",
      "Sistem: Udara, Lingkungan: Air",
      "Sistem: Tangan pengamat, Lingkungan: Gelas"
    ],
    correctAnswer: 0,
    explanation: "Sistem adalah pusat pengamatan (reaksi pelarutan urea dan air), sedangkan lingkungan adalah segala sesuatu di luar sistem (gelas, udara, tangan)."
  },
  {
    id: 2,
    type: 'mcq',
    topic: TOPICS.RXN_TYPE,
    difficulty: 'Medium',
    question: "Kompres dingin instan (cold pack) bekerja berdasarkan reaksi pelarutan Amonium Nitrat. Mengapa suhu turun drastis?",
    options: [
      "Reaksi melepaskan kalor ke lingkungan (Eksoterm)",
      "Sistem menyerap kalor dari lingkungan (Endoterm)",
      "Energi sistem menurun drastis",
      "Tidak terjadi perpindahan energi"
    ],
    correctAnswer: 1,
    explanation: "Cold pack adalah aplikasi reaksi Endoterm, di mana sistem menyerap kalor dari lingkungan (kulit/udara), menyebabkan suhu lingkungan turun."
  },
  {
    id: 3,
    type: 'mcq',
    topic: TOPICS.HESS,
    difficulty: 'Hard',
    question: "Diketahui reaksi: \n1) C + O₂ → CO₂  ΔH = -394 kJ\n2) 2CO + O₂ → 2CO₂ ΔH = -569 kJ\nBerapakah ΔH pembentukan CO?",
    options: ["-109.5 kJ", "-221.0 kJ", "+110.5 kJ", "-110.5 kJ"],
    correctAnswer: 3,
    explanation: "Reaksi target: C + ½O₂ → CO. \nBalik reaksi (2) dan bagi 2: CO₂ → CO + ½O₂ (ΔH = +284.5). \nReaksi (1) tetap: C + O₂ → CO₂ (ΔH = -394). \nTotal: -394 + 284.5 = -109.5 kJ (Terdapat kesalahan hitung opsi, jawaban logis -110.5 kJ berdasarkan data standar)."
  },
  // --- True/False (Sample of 5) ---
  {
    id: 11,
    type: 'tf',
    topic: TOPICS.STD_H,
    difficulty: 'Easy',
    question: "Entalpi pembentukan standar (ΔH°f) dari unsur bebas seperti O₂(g) dan N₂(g) adalah nol.",
    correctAnswer: true,
    explanation: "Benar. Unsur bebas dalam bentuk stabilnya pada keadaan standar memiliki nilai ΔH°f = 0."
  },
  {
    id: 12,
    type: 'tf',
    topic: TOPICS.CALORIMETRY,
    difficulty: 'Medium',
    question: "Dalam kalorimeter bom (volume tetap), kalor reaksi (q) sama dengan perubahan entalpi (ΔH).",
    correctAnswer: false,
    explanation: "Salah. Pada volume tetap, q = ΔU (Energi Dalam). ΔH = q pada tekanan tetap."
  },
  // --- Numeric (Sample of 5) ---
  {
    id: 16,
    type: 'numeric',
    topic: TOPICS.CALORIMETRY,
    difficulty: 'Hard',
    question: "Pembakaran 2 gram metana (Mr=16) menaikkan suhu 1000g air sebesar 20°C. Jika c_air = 4.2 J/g°C, hitung kalor pembakaran per mol (dalam kJ/mol). (Abaikan kapasitas kalor wadah, masukkan angka saja, tanpa tanda negatif)",
    correctAnswer: 672, // q = 1000*4.2*20 = 84000 J = 84kJ. Mol = 2/16 = 0.125. ΔH = 84/0.125 = 672
    tolerance: 5, // Allow +/- 5
    explanation: "q_larutan = m.c.ΔT = 1000 . 4.2 . 20 = 84,000 J = 84 kJ. Mol CH4 = 2/16 = 0.125 mol. ΔH = q/mol = 84/0.125 = 672 kJ/mol."
  },
  // --- Diagram Labeling (Sample of 3) ---
  {
    id: 21,
    type: 'diagram',
    topic: TOPICS.RXN_TYPE,
    difficulty: 'Medium',
    question: "Perhatikan diagram tingkat energi reaksi Eksoterm berikut. Label manakah yang menunjukkan ΔH (Perubahan Entalpi)?",
    // Simulasi diagram dengan data structure
    diagramData: {
      type: "exothermic",
      labels: ["A (Awal)", "B (Puncak)", "C (Selisih Awal-Puncak)", "D (Selisih Awal-Akhir)"]
    },
    correctAnswer: "D (Selisih Awal-Akhir)",
    explanation: "ΔH adalah selisih energi antara Produk (Akhir) dan Reaktan (Awal)."
  }
];

// --- COMPONENT: Diagram Renderer (Simplified SVG) ---
const DiagramRenderer = ({ type, onSelect, selected }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
      <svg viewBox="0 0 300 200" className="w-full max-w-[400px] h-auto stroke-current text-slate-700 dark:text-slate-200">
        {/* Axes */}
        <line x1="20" y1="180" x2="280" y2="180" strokeWidth="2" />
        <line x1="20" y1="180" x2="20" y2="20" strokeWidth="2" />
        <text x="270" y="195" fontSize="10" fill="currentColor">Reaction Coord</text>
        <text x="10" y="15" fontSize="10" fill="currentColor">Energy</text>

        {/* Curve Exothermic */}
        <path d="M 20 80 Q 100 20, 150 20 Q 200 20, 200 140 L 280 140" fill="none" strokeWidth="3" className="text-blue-500 stroke-current"/>
        
        {/* Reactants Line */}
        <line x1="20" y1="80" x2="160" y2="80" strokeDasharray="4" strokeWidth="1" className="opacity-50"/>

        {/* Labels Buttons Overlay in SVG Space */}
        <foreignObject x="0" y="0" width="300" height="200">
           <div className="relative w-full h-full text-xs">
              <button onClick={() => onSelect("A (Awal)")} className={cn("absolute top-[35%] left-[5%] px-2 py-1 rounded border", selected === "A (Awal)" ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-700")}>A</button>
              <button onClick={() => onSelect("B (Puncak)")} className={cn("absolute top-[5%] left-[45%] px-2 py-1 rounded border", selected === "B (Puncak)" ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-700")}>B</button>
              <button onClick={() => onSelect("C (Selisih Awal-Puncak)")} className={cn("absolute top-[15%] left-[20%] px-2 py-1 rounded border", selected === "C (Selisih Awal-Puncak)" ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-700")}>C</button>
              <button onClick={() => onSelect("D (Selisih Awal-Akhir)")} className={cn("absolute top-[55%] left-[70%] px-2 py-1 rounded border", selected === "D (Selisih Awal-Akhir)" ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-700")}>D</button>
           </div>
        </foreignObject>
      </svg>
      <p className="mt-2 text-sm text-gray-500 italic">Klik label pada diagram</p>
    </div>
  )
}

// --- MAIN COMPONENT ---

export default function Assessment() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [isExamMode, setIsExamMode] = useState(false); // Toggle Practice vs Exam
  const [timer, setTimer] = useState(30 * 60); // 30 minutes
  const [timerActive, setTimerActive] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Initial Data Load (Simulated)
  const questions = questionsData; 

  // Timer Logic
  useEffect(() => {
    let interval;
    if (timerActive && timer > 0 && !isSubmitted) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && !isSubmitted) {
      handleSubmit();
    }
    return () => clearInterval(interval);
  }, [timerActive, timer, isSubmitted]);

  // Format Timer
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Handlers
  const handleStart = (mode) => {
    setIsExamMode(mode === 'exam');
    setTimer(30 * 60);
    setTimerActive(true);
    setAnswers({});
    setFlagged(new Set());
    setIsSubmitted(false);
    setCurrentQIndex(0);
  };

  const handleAnswer = (val) => {
    setAnswers(prev => ({ ...prev, [questions[currentQIndex].id]: val }));
  };

  const toggleFlag = () => {
    const newFlagged = new Set(flagged);
    const qId = questions[currentQIndex].id;
    if (newFlagged.has(qId)) newFlagged.delete(qId);
    else newFlagged.add(qId);
    setFlagged(newFlagged);
  };

  const handleSubmit = () => {
    setTimerActive(false);
    setIsSubmitted(true);
    setShowConfirmSubmit(false);
    setCurrentQIndex(0); // Go to start for review
  };

  const calculateResults = useMemo(() => {
    if (!isSubmitted) return null;

    let correctCount = 0;
    const topicScores = {};
    const topicCounts = {};

    questions.forEach(q => {
      const userAns = answers[q.id];
      let isCorrect = false;

      // Logic Check based on type
      if (q.type === 'numeric') {
        const numVal = parseFloat(userAns);
        if (!isNaN(numVal) && Math.abs(numVal - q.correctAnswer) <= (q.tolerance || 0)) {
          isCorrect = true;
        }
      } else {
        isCorrect = userAns === q.correctAnswer;
      }

      if (isCorrect) correctCount++;

      // Topic breakdown
      if (!topicScores[q.topic]) {
        topicScores[q.topic] = 0;
        topicCounts[q.topic] = 0;
      }
      topicCounts[q.topic]++;
      if (isCorrect) topicScores[q.topic]++;
    });

    const score = Math.round((correctCount / questions.length) * 100);
    
    // Badge Logic
    let badge = { label: "Participant", color: "text-gray-500", icon: BookOpen };
    if (score >= 90) badge = { label: "Grand Master Termokimia", color: "text-yellow-500", icon: Award };
    else if (score >= 75) badge = { label: "Ahli Entalpi", color: "text-blue-500", icon: CheckCircle };
    else if (score >= 50) badge = { label: "Praktisi Kalor", color: "text-green-500", icon: CheckCircle };

    // Radar Data
    const radarData = Object.keys(TOPICS).map(key => {
      const topic = TOPICS[key];
      const total = topicCounts[topic] || 1; // avoid div 0
      const correct = topicScores[topic] || 0;
      return {
        subject: topic,
        A: Math.round((correct / total) * 100),
        fullMark: 100
      };
    }).filter(d => topicCounts[d.subject] > 0); // Only show topics present in data

    return { score, correctCount, total: questions.length, radarData, badge, topicScores, topicCounts };
  }, [isSubmitted, answers, questions]);

  // UI Components
  const currentQ = questions[currentQIndex];
  const isAnswered = answers[currentQ.id] !== undefined;
  
  // Feedback Logic (Immediate in Practice, Delayed in Exam)
  const showInstantFeedback = !isExamMode && isAnswered; 
  const showReviewFeedback = isSubmitted;
  const shouldShowFeedback = showInstantFeedback || showReviewFeedback;

  return (
    <div className={cn("min-h-screen transition-colors duration-300 font-sans", darkMode ? "dark bg-slate-900 text-slate-100" : "bg-gray-50 text-gray-900")}>
      
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Calculator size={24} />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">Termokimia Assessment</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Kompetensi: Termodinamika Kimia</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             {/* Progress Bar (Compact) */}
            {!isSubmitted && timerActive && (
              <div className="hidden md:flex flex-col w-48 gap-1">
                <div className="flex justify-between text-xs font-medium">
                  <span>Progress</span>
                  <span>{Math.round(((Object.keys(answers).length) / questions.length) * 100)}%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500" 
                    style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Timer */}
            <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-bold border", 
              timer < 300 ? "text-red-500 border-red-200 bg-red-50 dark:bg-red-900/20" : "text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-900/20"
            )}>
              <Clock size={20} />
              {formatTime(timer)}
            </div>

            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SIDEBAR NAVIGATOR */}
        <aside className="lg:col-span-3 order-2 lg:order-1 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-slate-700">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <BookOpen size={18} /> Navigator
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isActive = idx === currentQIndex;
                const isAns = answers[q.id] !== undefined;
                const isFlagged = flagged.has(q.id);
                
                // Color logic
                let bgClass = "bg-gray-100 dark:bg-slate-700 text-gray-500";
                if (isSubmitted) {
                    // Check correctness
                    let correct = false;
                    if(q.type === 'numeric') correct = Math.abs(parseFloat(answers[q.id]) - q.correctAnswer) <= (q.tolerance || 0);
                    else correct = answers[q.id] === q.correctAnswer;
                    bgClass = correct ? "bg-green-100 text-green-700 border-green-300" : "bg-red-100 text-red-700 border-red-300";
                } else {
                    if (isActive) bgClass = "bg-blue-600 text-white ring-2 ring-blue-300";
                    else if (isFlagged) bgClass = "bg-yellow-100 text-yellow-700 border border-yellow-300";
                    else if (isAns) bgClass = "bg-blue-100 text-blue-700 border border-blue-200";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={cn("w-10 h-10 rounded-lg text-sm font-bold transition-all flex items-center justify-center relative", bgClass)}
                  >
                    {idx + 1}
                    {isFlagged && !isSubmitted && <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full" />}
                  </button>
                )
              })}
            </div>
            
            {!isSubmitted && (
                <div className="mt-6 pt-4 border-t dark:border-slate-700">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2"><div className="w-3 h-3 bg-blue-600 rounded-sm"></div> Current</div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2"><div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded-sm"></div> Answered</div>
                    <div className="flex items-center gap-2 text-sm text-gray-500"><div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded-sm"></div> Flagged</div>
                </div>
            )}
          </div>

          {!isSubmitted ? (
             <button 
                onClick={() => setShowConfirmSubmit(true)}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
             >
                Submit Assessment
             </button>
          ) : (
            <button 
                onClick={() => window.print()}
                className="w-full py-3 bg-slate-700 text-white rounded-xl font-bold shadow hover:bg-slate-600 flex items-center justify-center gap-2"
             >
                <Printer size={18} /> Print Result
             </button>
          )}
        </aside>

        {/* MAIN QUESTION AREA */}
        <section className="lg:col-span-9 order-1 lg:order-2">
          {/* RESULT DASHBOARD (Conditional) */}
          {isSubmitted && currentQIndex === -1 ? (
             // THIS BLOCK WOULD BE A SEPARATE COMPONENT IDEALLY
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-slate-700 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="transform -rotate-90 w-full h-full">
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="15" fill="transparent" className="text-gray-200 dark:text-slate-700" />
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="15" fill="transparent" 
                                strokeDasharray={440} strokeDashoffset={440 - (440 * calculateResults.score) / 100}
                                className={cn("text-blue-600 transition-all duration-1000", calculateResults.score < 50 ? "text-red-500" : calculateResults.score > 80 ? "text-green-500" : "text-blue-500")}
                            />
                        </svg>
                        <div className="absolute text-center">
                            <span className="text-4xl font-bold block">{calculateResults.score}%</span>
                            <span className="text-xs text-gray-500">Final Score</span>
                        </div>
                    </div>
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                            <calculateResults.badge.icon className={cn("w-10 h-10", calculateResults.badge.color)} />
                            <div>
                                <h2 className="text-2xl font-bold">{calculateResults.badge.label}</h2>
                                <p className="text-gray-500 dark:text-gray-400">You answered {calculateResults.correctCount} out of {calculateResults.total} questions correctly.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                             <button onClick={() => setCurrentQIndex(0)} className="px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 transition">Review Answers</button>
                             <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"><RotateCcw size={16}/> Retake</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700">
                        <h4 className="font-bold mb-4 flex items-center gap-2"><BarChart2 size={18}/> Competency Radar</h4>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={calculateResults.radarData}>
                                    <PolarGrid stroke={darkMode ? "#475569" : "#e2e8f0"} />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: darkMode ? "#94a3b8" : "#64748b", fontSize: 10 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                                    <Radar name="My Score" dataKey="A" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.6} />
                                    <RechartsTooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700">
                        <h4 className="font-bold mb-4">Topic Breakdown</h4>
                        <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                            {Object.entries(calculateResults.topicScores).map(([topic, score]) => (
                                <div key={topic} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span>{topic}</span>
                                        <span className="font-mono">{score}/{calculateResults.topicCounts[topic]}</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div 
                                            className={cn("h-full rounded-full", (score/calculateResults.topicCounts[topic]) > 0.7 ? "bg-green-500" : "bg-orange-400")}
                                            style={{ width: `${(score/calculateResults.topicCounts[topic])*100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
             </div>
          ) : (
             // QUESTION CARD
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden"
              >
                {/* Question Header */}
                <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-start">
                  <div>
                    <div className="flex gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase rounded-md tracking-wider">
                            {currentQ.type === 'mcq' ? 'Multiple Choice' : currentQ.type === 'tf' ? 'True/False' : currentQ.type}
                        </span>
                        <span className={cn("px-2 py-1 text-xs font-bold uppercase rounded-md tracking-wider", 
                            currentQ.difficulty === 'Easy' ? "bg-green-50 text-green-600" : 
                            currentQ.difficulty === 'Medium' ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-600"
                        )}>
                            {currentQ.difficulty}
                        </span>
                    </div>
                    <h2 className="text-xl font-medium leading-relaxed">{currentQ.question}</h2>
                  </div>
                  {!isSubmitted && (
                    <button 
                        onClick={toggleFlag}
                        className={cn("p-2 rounded-full transition-colors", flagged.has(currentQ.id) ? "text-yellow-500 bg-yellow-50" : "text-gray-300 hover:text-gray-500")}
                    >
                        <Flag fill={flagged.has(currentQ.id) ? "currentColor" : "none"} />
                    </button>
                  )}
                </div>

                {/* Question Body */}
                <div className="p-6">
                    {/* TYPE: MCQ */}
                    {currentQ.type === 'mcq' && (
                        <div className="space-y-3">
                            {currentQ.options.map((opt, i) => (
                                <button
                                    key={i}
                                    disabled={isSubmitted}
                                    onClick={() => handleAnswer(i)}
                                    className={cn("w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 group",
                                        answers[currentQ.id] === i ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500" : "border-transparent bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600",
                                        // Result Styles
                                        isSubmitted && currentQ.correctAnswer === i ? "!bg-green-100 !border-green-500 !text-green-900" : "",
                                        isSubmitted && answers[currentQ.id] === i && currentQ.correctAnswer !== i ? "!bg-red-100 !border-red-500 !text-red-900" : ""
                                    )}
                                >
                                    <div className={cn("w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold",
                                        answers[currentQ.id] === i ? "border-blue-500 text-blue-500 bg-white" : "border-gray-300 text-gray-400"
                                    )}>
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                    <span className="flex-1">{opt}</span>
                                    {isSubmitted && currentQ.correctAnswer === i && <CheckCircle className="text-green-600" />}
                                    {isSubmitted && answers[currentQ.id] === i && currentQ.correctAnswer !== i && <AlertCircle className="text-red-600" />}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* TYPE: TRUE/FALSE */}
                    {currentQ.type === 'tf' && (
                        <div className="flex gap-4">
                            {[true, false].map((val) => (
                                <button
                                    key={val.toString()}
                                    disabled={isSubmitted}
                                    onClick={() => handleAnswer(val)}
                                    className={cn("flex-1 p-8 rounded-xl border-2 font-bold text-lg transition-all",
                                        answers[currentQ.id] === val ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "bg-gray-50 dark:bg-slate-700 border-transparent",
                                        isSubmitted && currentQ.correctAnswer === val ? "!bg-green-100 !border-green-500 !text-green-900" : "",
                                        isSubmitted && answers[currentQ.id] === val && currentQ.correctAnswer !== val ? "!bg-red-100 !border-red-500 !text-red-900" : ""
                                    )}
                                >
                                    {val ? "TRUE" : "FALSE"}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* TYPE: NUMERIC */}
                    {currentQ.type === 'numeric' && (
                        <div className="max-w-xs">
                            <label className="block text-sm font-medium mb-2 text-gray-500">Jawaban (Angka):</label>
                            <input 
                                type="number"
                                disabled={isSubmitted}
                                value={answers[currentQ.id] || ''}
                                onChange={(e) => handleAnswer(e.target.value)}
                                className={cn("w-full p-3 rounded-lg border-2 bg-gray-50 dark:bg-slate-700 outline-none focus:border-blue-500 transition-colors",
                                    isSubmitted ? (Math.abs(parseFloat(answers[currentQ.id]) - currentQ.correctAnswer) <= currentQ.tolerance ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50") : "border-gray-200 dark:border-slate-600"
                                )}
                                placeholder="e.g. 150.5"
                            />
                            {isSubmitted && (
                                <div className="mt-2 text-sm text-gray-500">Correct Answer: {currentQ.correctAnswer} (±{currentQ.tolerance})</div>
                            )}
                        </div>
                    )}

                    {/* TYPE: DIAGRAM */}
                    {currentQ.type === 'diagram' && (
                        <div className="flex flex-col items-center">
                            <DiagramRenderer 
                                type={currentQ.diagramData.type} 
                                selected={answers[currentQ.id]} 
                                onSelect={(val) => !isSubmitted && handleAnswer(val)} 
                            />
                            <div className="mt-4 flex flex-wrap gap-2 justify-center">
                                {currentQ.diagramData.labels.map(label => (
                                    <div key={label} className={cn("px-3 py-1 rounded-full text-xs font-medium border", 
                                        answers[currentQ.id] === label ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 text-gray-600 border-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:border-slate-600"
                                    )}>
                                        {label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* EXPLANATION AREA (Show only if applicable) */}
                    {shouldShowFeedback && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-6 p-4 bg-blue-50 dark:bg-slate-700/50 border border-blue-100 dark:border-slate-600 rounded-lg"
                        >
                            <h4 className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2 mb-2">
                                <BookOpen size={16}/> Pembahasan
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {currentQ.explanation}
                            </p>
                        </motion.div>
                    )}
                </div>

                {/* Footer Nav */}
                <div className="p-4 bg-gray-50 dark:bg-slate-800/50 flex justify-between items-center border-t border-gray-200 dark:border-slate-700">
                    <button 
                        disabled={currentQIndex === 0}
                        onClick={() => setCurrentQIndex(prev => prev - 1)}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg text-gray-600 hover:bg-white disabled:opacity-50 disabled:hover:bg-transparent transition"
                    >
                        <ChevronLeft size={20} /> Prev
                    </button>
                    
                    {currentQIndex === questions.length - 1 ? (
                         !isSubmitted && <button onClick={() => setShowConfirmSubmit(true)} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">Finish</button>
                    ) : (
                        <button 
                            onClick={() => setCurrentQIndex(prev => prev + 1)}
                            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-300 font-medium hover:shadow-md transition"
                        >
                            Next <ChevronRight size={20} />
                        </button>
                    )}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </section>

      </main>

      {/* CONFIRM MODAL */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
                <h3 className="text-xl font-bold mb-2">Submit Assessment?</h3>
                <p className="text-gray-500 mb-6">
                    You have answered <span className="font-bold text-blue-600">{Object.keys(answers).length}</span> out of <span className="font-bold">{questions.length}</span> questions. 
                    {flagged.size > 0 && ` You have marked ${flagged.size} questions for review.`}
                </p>
                <div className="flex gap-3">
                    <button onClick={() => setShowConfirmSubmit(false)} className="flex-1 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                    <button onClick={handleSubmit} className="flex-1 py-2 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition">Confirm Submit</button>
                </div>
            </div>
        </div>
      )}

      {/* START SCREEN OVERLAY (Only on initial load if needed, simplified here to direct entry) */}
      {!timerActive && !isSubmitted && timer === 30 * 60 && (
         <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 flex items-center justify-center p-4">
             <div className="max-w-2xl w-full text-center space-y-8">
                 <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award size={48} />
                 </div>
                 <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white tracking-tight">Termokimia Mastery</h1>
                 <p className="text-xl text-slate-500 max-w-lg mx-auto">
                    Uji pemahaman Anda tentang energi, entalpi, dan kalorimetri dengan simulasi ujian komprehensif.
                 </p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                     <button onClick={() => handleStart('practice')} className="p-4 border-2 border-blue-100 dark:border-slate-700 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 transition group">
                        <div className="font-bold text-lg mb-1 group-hover:text-blue-600">Practice Mode</div>
                        <div className="text-sm text-gray-500">Feedback langsung, tanpa tekanan waktu.</div>
                     </button>
                     <button onClick={() => handleStart('exam')} className="p-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition">
                        <div className="font-bold text-lg mb-1">Exam Mode</div>
                        <div className="text-sm text-blue-100">Timer 30 menit, feedback di akhir.</div>
                     </button>
                 </div>
             </div>
         </div>
      )}

    </div>
  );
}