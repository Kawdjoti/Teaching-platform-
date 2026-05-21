import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle2, Info, Save, Share2, Trash2, Lock, PlayCircle } from 'lucide-react';
import PolylineCanvas from '../components/PolylineCanvas';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import SignupModal from '../components/SignupModal';

const SAMPLE_TASKS = [
  {
    id: 'road-1',
    title: 'Highway Lane Marking',
    description: 'Trace the dashed white lines separating the lanes.',
    image: '/polyline.jpg',
    difficulty: 'Beginner'
  },
  {
    id: 'rail-1',
    title: 'Railway Tracks',
    description: 'Segment the rail lines extending towards the horizon.',
    image: '/railway_tracks.png',
    difficulty: 'Intermediate'
  },
  {
    id: 'pipeline-1',
    title: 'Industrial Pipelines',
    description: 'Map the industrial pipes in the factory complex.',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=1200',
    difficulty: 'Advanced'
  }
];

import TrainingGuide from '../components/TrainingGuide';

export default function PracticeLabPage() {
  const { user } = useAuth();
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(SAMPLE_TASKS[0]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleSave = async (polylines: any) => {
    setSaveStatus('saving');
    // Simulate API call
    await new Promise(r => setTimeout(r, 1000));
    console.log("Saving polylines:", polylines);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-80 flex flex-col gap-6">

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">Select Task</h3>
            <div className="space-y-3">
              {SAMPLE_TASKS.map((task) => (
                <button
                  key={task.id}
                  onClick={() => setCurrentTask(task)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-1",
                    currentTask.id === task.id 
                      ? "border-zinc-900 bg-zinc-900 text-white" 
                      : "border-zinc-100 hover:border-zinc-200 bg-zinc-50/50"
                  )}
                >
                  <span className="text-xs font-bold uppercase opacity-70">{task.difficulty}</span>
                  <span className="font-semibold">{task.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex gap-3">
            <Info className="h-5 w-5 text-amber-600 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-amber-900">Annotation Tip</h4>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                Consistency is key. Always annotate from left to right or top to bottom to maintain a predictable workflow for ML models.
              </p>
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{currentTask.title}</h1>
            <p className="text-zinc-500 mt-2">{currentTask.description}</p>
          </div>
          
          {!user ? (
            <div id="locked-sandbox-stage" className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100/30 p-12 text-center aspect-[4/3] flex flex-col items-center justify-center">
              {/* Grid background */}
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40" />
              
              {/* Lock Indicator */}
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-xl mb-6">
                <Lock className="h-6 w-6 text-indigo-400" />
              </div>

              <div className="relative z-10 max-w-md flex flex-col items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  Interactive Lab Locked
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight text-zinc-900 mt-3">
                  Account Registration Required
                </h3>
                <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                  Real-time overlay drafting, precision rating evaluations, and progress sync profiles require registering an official Datamaker training account.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button
                    id="practice-unlock-btn"
                    onClick={() => setIsSignupOpen(true)}
                    className="rounded-2xl bg-zinc-950 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-zinc-900/10 hover:bg-zinc-800 transition-all active:scale-95 cursor-pointer"
                  >
                    Unlock Sandbox Laboratory
                  </button>
                  <button
                    id="practice-secondary-sign-btn"
                    onClick={() => setIsSignupOpen(true)}
                    className="rounded-2xl border border-zinc-200 bg-white px-6 py-3 text-sm font-bold text-zinc-700 hover:bg-zinc-50 transition-all cursor-pointer"
                  >
                    Authenticate with Google
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <PolylineCanvas 
              key={currentTask.id}
              imageUrl={currentTask.image} 
              onSave={handleSave}
            />
          )}

          <TrainingGuide />

          {saveStatus === 'saved' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center gap-2 bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-100"
            >
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-medium">Session saved successfully to your dashboard!</span>
            </motion.div>
          )}
        </div>
      </div>
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
        sourceContext="practice" 
      />
    </div>
  );
}
