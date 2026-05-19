import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle2, Info, Save, Share2, Trash2 } from 'lucide-react';
import PolylineCanvas from '../components/PolylineCanvas';
import { cn } from '../lib/utils';

const SAMPLE_TASKS = [
  {
    id: 'road-1',
    title: 'Highway Lane Marking',
    description: 'Trace the dashed white lines separating the lanes.',
    image: 'https://images.unsplash.com/photo-1545143333-6382f1d5b893?auto=format&fit=crop&q=80&w=1200',
    difficulty: 'Beginner'
  },
  {
    id: 'rail-1',
    title: 'Railway Tracks',
    description: 'Segment the rail lines extending towards the horizon.',
    image: 'https://images.unsplash.com/photo-1474487548417-781f37a96e4b?auto=format&fit=crop&q=80&w=1200',
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

import AITips from '../components/AITips';

export default function PracticeLabPage() {
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
          <AITips context={currentTask.title} />

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

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">Stats & Feedback</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Accuracy Score</span>
                <span className="text-lg font-bold text-zinc-900">84%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-100 overflow-hidden">
                <div className="h-full bg-emerald-500 w-[84%]" />
              </div>
              <p className="text-xs text-zinc-500 italic">
                Tip: Try placing points precisely on the corners for better accuracy.
              </p>
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
          
          <PolylineCanvas 
            key={currentTask.id}
            imageUrl={currentTask.image} 
            onSave={handleSave}
          />

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
    </div>
  );
}
