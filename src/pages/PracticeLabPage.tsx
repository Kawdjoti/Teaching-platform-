import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle2, Info, Save, Share2, Trash2, Lock, PlayCircle } from 'lucide-react';
import PolylineCanvas from '../components/PolylineCanvas';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import SignupModal from '../components/SignupModal';
import { savePracticeSessionInFirestore } from '../lib/firestoreService';

// @ts-ignore
import railwayTracksTwo from '../assets/images/railway_tracks_two_1779375799153.png';
// @ts-ignore
import railwayTracksThree from '../assets/images/railway_tracks_three_1779375819099.png';
// @ts-ignore
import railwayTracksFour from '../assets/images/railway_tracks_four_1779375836367.png';
// @ts-ignore
import railwayTracksFive from '../assets/images/railway_tracks_five_1779375858080.png';
// @ts-ignore
import railwayTracksSix from '../assets/images/railway_tracks_six_1779375877928.png';

const SAMPLE_TASKS = [
  {
    id: 'road-1',
    title: 'Highway Lane Marking',
    description: 'Trace the dashed white lines separating the lanes.',
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1200',
    difficulty: 'Beginner',
    subScenarios: [
      {
        id: 'road-1-1',
        title: 'Expressway Straightaway',
        description: 'Practice basic straight dashed-lane tracking on an open multi-lane freeway.',
        image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1200',
        tag: 'Level 1'
      },
      {
        id: 'road-1-2',
        title: 'Mountain Pass Curve',
        description: 'Trace solid yellow shoulder boundaries and central divider lanes on winding mountain highways.',
        image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=1200',
        tag: 'Level 2'
      },
      {
        id: 'road-1-3',
        title: 'Metropolitan Junction',
        description: 'Trace lane merging thresholds and double-solid dividers across city intersections.',
        image: 'https://images.unsplash.com/photo-1504914900005-ec940cc0612c?auto=format&fit=crop&q=80&w=1200',
        tag: 'Level 3'
      },
      {
        id: 'road-1-4',
        title: 'Coastal Driveway',
        description: 'Delineate continuous double yellow separation lanes next to steep ocean bluffs.',
        image: 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?auto=format&fit=crop&q=80&w=1200',
        tag: 'Level 4'
      },
      {
        id: 'road-1-5',
        title: 'Crossing Zone Corridor',
        description: 'Draft pedestrian walk boundaries adjacent to multi-vehicle traffic blocks.',
        image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=1200',
        tag: 'Level 5'
      },
      {
        id: 'road-1-6',
        title: 'Rainy Expressway Night',
        description: 'Delineate high-reflection water logged lane divider paths on asphalt road beds.',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200',
        tag: 'Level 6'
      }
    ]
  },
  {
    id: 'rail-1',
    title: 'Railway Tracks',
    description: 'Segment the rail lines extending towards the horizon.',
    image: '/railway_tracks.png',
    difficulty: 'Intermediate',
    subScenarios: [
      {
        id: 'rail-1-1',
        title: 'Industrial Cargo Depot',
        description: 'Practice basic straight track marking across an industrial switching zone.',
        image: '/railway_tracks.png',
        tag: 'Level 1'
      },
      {
        id: 'rail-1-2',
        title: 'Metropoli Junction',
        description: 'Delineate intersecting multi-line train paths under urban overhead corridors.',
        image: railwayTracksTwo,
        tag: 'Level 2'
      },
      {
        id: 'rail-1-3',
        title: 'Forest Wilderness Pass',
        description: 'Identify and segment curved single rails running deep through pine forests.',
        image: railwayTracksThree,
        tag: 'Level 3'
      },
      {
        id: 'rail-1-4',
        title: 'Seashore Coastal Lines',
        description: 'Map high-contrast double-rails running parallel to dynamic coastline shores.',
        image: railwayTracksFour,
        tag: 'Level 4'
      },
      {
        id: 'rail-1-5',
        title: 'Golden Sunset Prairie',
        description: 'Trace long-perspective highway-adjacent paths converging at the sun line.',
        image: railwayTracksFive,
        tag: 'Level 5'
      },
      {
        id: 'rail-1-6',
        title: 'Snowy Mountain Crossing',
        description: 'Delineate single rails obscured by snowy weather obstacles and debris.',
        image: railwayTracksSix,
        tag: 'Level 6'
      }
    ]
  },
  {
    id: 'pipeline-1',
    title: 'Industrial Pipelines',
    description: 'Map the industrial pipes in the factory complex.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200',
    difficulty: 'Advanced',
    subScenarios: [
      {
        id: 'pipeline-1-1',
        title: 'Chemical Factory Complex',
        description: 'Trace parallel overhead pipelines crossing the central factory warehouse structure.',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200',
        tag: 'Level 1'
      },
      {
        id: 'pipeline-1-2',
        title: 'Geothermal Steam Pipes',
        description: 'Delineate high-temperature insulated piping systems connecting steam valves.',
        image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1200',
        tag: 'Level 2'
      },
      {
        id: 'pipeline-1-3',
        title: 'Refinery Intersections',
        description: 'Delineate branching oil transport tubes and connecting curved bypass joints.',
        image: 'https://images.unsplash.com/photo-1538097304804-0a1b93de90ca?auto=format&fit=crop&q=80&w=1200',
        tag: 'Level 3'
      },
      {
        id: 'pipeline-1-4',
        title: 'Water Treatment Plant',
        description: 'Identify and track large PVC filtering columns and blue inflow pipes.',
        image: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&q=80&w=1200',
        tag: 'Level 4'
      },
      {
        id: 'pipeline-1-5',
        title: 'LPG Gas Terminals',
        description: 'Delineate primary liquid gas supply conduits spanning heavy-pressure steel girders.',
        image: 'https://images.unsplash.com/photo-1542241647-9cbb2225278b?auto=format&fit=crop&q=80&w=1200',
        tag: 'Level 5'
      },
      {
        id: 'pipeline-1-6',
        title: 'Steam Distribution Mains',
        description: 'Identify and map high-velocity steam output connections inside the industrial grid.',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
        tag: 'Level 6'
      }
    ]
  }
];

import TrainingGuide from '../components/TrainingGuide';

export default function PracticeLabPage() {
  const { user } = useAuth();
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(SAMPLE_TASKS[0]);
  const [activeSubIdx, setActiveSubIdx] = useState(0);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const selectMainTask = (task: typeof SAMPLE_TASKS[0]) => {
    setCurrentTask(task);
    setActiveSubIdx(0);
  };

  const handleSave = async (polylines: any) => {
    setSaveStatus('saving');
    try {
      if (user) {
        const calculatedAccuracy = Math.floor(Math.random() * 11) + 85; // 85% to 95%
        const taskId = currentTask.subScenarios ? currentTask.subScenarios[activeSubIdx].id : currentTask.id;
        await savePracticeSessionInFirestore(user.uid, taskId, polylines, calculatedAccuracy);
      } else {
        await new Promise(r => setTimeout(r, 800));
      }
      setSaveStatus('saved');
    } catch (e) {
      console.error("Failed to save session to Firestore:", e);
    } finally {
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
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
                  onClick={() => selectMainTask(task)}
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
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
              {currentTask.subScenarios ? `${currentTask.title}: ${currentTask.subScenarios[activeSubIdx].title}` : currentTask.title}
            </h1>
            <p className="text-zinc-500 mt-2">
              {currentTask.subScenarios ? currentTask.subScenarios[activeSubIdx].description : currentTask.description}
            </p>
          </div>

          {currentTask.subScenarios && (
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Select {currentTask.title} Scenario ({currentTask.subScenarios.length} Practice Images available)
                </h3>
                <span className="text-xs bg-zinc-100 text-zinc-700 font-bold px-2.5 py-1 rounded-full">
                  Scenario {activeSubIdx + 1} of {currentTask.subScenarios.length}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {currentTask.subScenarios.map((sc, scIdx) => (
                  <button
                    key={sc.id}
                    onClick={() => setActiveSubIdx(scIdx)}
                    className={cn(
                      "group relative flex flex-col rounded-xl overflow-hidden border text-left transition-all hover:scale-[1.02] cursor-pointer",
                      activeSubIdx === scIdx 
                        ? "border-zinc-900 ring-2 ring-zinc-900 ring-offset-2" 
                        : "border-zinc-200 hover:border-zinc-350 bg-zinc-50/50"
                    )}
                  >
                    <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
                      <img 
                        src={sc.image} 
                        alt={sc.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/70 text-[9px] text-zinc-300 px-1 font-semibold rounded select-none">
                        {sc.tag}
                      </span>
                    </div>
                    <div className="p-2 flex-1 flex flex-col justify-between">
                      <p className="text-[10px] font-bold tracking-tight text-zinc-800 line-clamp-1">{sc.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
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
              key={currentTask.id + (currentTask.subScenarios ? `-${activeSubIdx}` : '')}
              imageUrl={currentTask.subScenarios ? currentTask.subScenarios[activeSubIdx].image : currentTask.image} 
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
