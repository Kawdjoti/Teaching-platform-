import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, HelpCircle, Trophy, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { saveQuizScoreInFirestore } from '../lib/firestoreService';

const QUESTIONS = [
  {
    id: 1,
    question: "What is the primary purpose of polyline segmentation in computer vision?",
    options: [
      "To count the number of objects in a scene",
      "To trace linear structures like road lanes and pipelines",
      "To change the colors of an image",
      "To reduce the file size of images"
    ],
    answer: 1
  },
  {
    id: 2,
    question: "When annotating a curved road lane, what is the best approach for point placement?",
    options: [
      "Use as few points as possible to keep it simple",
      "Place points only at the start and end of the curve",
      "Decrease the distance between points around sharp turns for higher precision",
      "Always use exactly 10 points regardless of the shape"
    ],
    answer: 2
  },
  {
    id: 3,
    question: "Which of these is NOT typically annotated using polylines?",
    options: [
      "Railway tracks",
      "Power lines",
      "Pedestrian boxes",
      "Curb edges"
    ],
    answer: 2
  }
];

export default function QuizPage() {
  const { user } = useAuth();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = QUESTIONS[currentIdx];

  const handleNext = async () => {
    let finalScore = score;
    if (selectedOption === currentQuestion.answer) {
      finalScore = score + 1;
      setScore(finalScore);
    }

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
      if (user) {
        const percentage = Math.round((finalScore / QUESTIONS.length) * 100);
        try {
          await saveQuizScoreInFirestore(user.uid, 'concepts-assessment-1', percentage);
        } catch (err) {
          console.error("Failed to save quiz score in DB:", err);
        }
      }
    }
  };

  if (isFinished) {
    const percentage = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div className="container mx-auto px-4 py-24 max-w-2xl text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl border border-zinc-200 shadow-xl"
        >
          <div className="mx-auto h-24 w-24 bg-emerald-50 rounded-full flex items-center justify-center mb-8">
            <Trophy className="h-12 w-12 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-zinc-900 mb-2">Quiz Completed!</h2>
          <p className="text-zinc-500 mb-8 text-lg">You scored {percentage}% on your assessment.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
             <div className="bg-zinc-50 p-6 rounded-2xl">
                <div className="text-2xl font-bold text-zinc-900">{score}</div>
                <div className="text-sm text-zinc-500">Correct</div>
             </div>
             <div className="bg-zinc-50 p-6 rounded-2xl">
                <div className="text-2xl font-bold text-zinc-900">{QUESTIONS.length - score}</div>
                <div className="text-sm text-zinc-500">Incorrect</div>
             </div>
          </div>

          <button
            onClick={() => {
              setCurrentIdx(0);
              setSelectedOption(null);
              setScore(0);
              setIsFinished(false);
            }}
            className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold transition-all hover:bg-zinc-800"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 flex items-center gap-3">
            <HelpCircle className="h-8 w-8 text-zinc-400" />
            Concepts Assessment
          </h1>
          <p className="text-zinc-500 mt-2">Test your knowledge of polyline segmentation.</p>
        </div>
        <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
            Question {currentIdx + 1} of {QUESTIONS.length}
        </div>
      </div>

      <div className="w-full h-1 bg-zinc-100 rounded-full mb-12 overflow-hidden">
        <motion.div 
          className="h-full bg-zinc-900"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl border border-zinc-200 shadow-sm min-h-[400px] flex flex-col">
        <h2 className="text-2xl font-bold text-zinc-900 mb-10 leading-snug">
          {currentQuestion.question}
        </h2>

        <div className="space-y-4 flex-1">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedOption(idx)}
              className={cn(
                "w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-4 group",
                selectedOption === idx 
                  ? "border-zinc-900 bg-zinc-900 text-white" 
                  : "border-zinc-100 hover:border-zinc-300 bg-zinc-50/50"
              )}
            >
              <div className={cn(
                "h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0",
                selectedOption === idx ? "border-white/40" : "border-zinc-200"
              )}>
                {selectedOption === idx && <div className="h-2.5 w-2.5 rounded-full bg-white" />}
              </div>
              <span className="font-semibold">{option}</span>
            </button>
          ))}
        </div>

        <div className="mt-12">
            <button
                onClick={handleNext}
                disabled={selectedOption === null}
                className="w-full bg-zinc-900 text-white h-14 rounded-2xl font-bold disabled:opacity-50 transition-all hover:bg-zinc-800 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {currentIdx < QUESTIONS.length - 1 ? "Next Question" : "Finish Quiz"}
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
      </div>
    </div>
  );
}
