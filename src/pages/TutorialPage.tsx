import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, BookOpen, Clock, BarChart, ChevronRight, X, Sparkles, Check, Info, ZoomIn, Eye, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SignupModal from '../components/SignupModal';

const LESSONS = [
  {
    id: 1,
    title: "Annotating Road Infrastructure",
    duration: "15 mins",
    difficulty: "Beginner",
    category: "Practice",
    image: "/polyline.jpg",
    videoUrl: "/workspace_video_0.mp4",
    completed: false,
    desc: "Observe real annotation workflows following lane center lines, utilizing brightness adjustment controls, and tagging classes correctly."
  }
];

export default function TutorialPage() {
  const { user } = useAuth();
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<typeof LESSONS[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'details'>('video');

  const handleStartLesson = (lesson: typeof LESSONS[0]) => {
    if (!user) {
      setIsSignupOpen(true);
    } else {
      setSelectedLesson(lesson);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Classroom Overview</span>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mt-2">Learning Center</h1>
        <p className="text-zinc-500 mt-4 text-lg max-w-2xl">
          Master image annotation with our structured curriculum. Study human labeling screen recordings to match professional industry speed and accuracy expectations.
        </p>
      </div>

      <div className="flex justify-center">
        {LESSONS.map((lesson) => (
          <motion.div
            key={lesson.id}
            whileHover={{ y: -4 }}
            className="group relative flex flex-col bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-xl transition-all max-w-lg w-full"
          >
            <div className="aspect-video overflow-hidden relative cursor-pointer" onClick={() => handleStartLesson(lesson)}>
              <video 
                src={lesson.videoUrl} 
                poster={lesson.image}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                autoPlay
                loop
                muted
                playsInline
                onError={(e) => {
                  console.log("Card video error, attempting fallback...");
                  const targetRef = e.currentTarget;
                  if (!targetRef.dataset.tried) {
                    targetRef.dataset.tried = "true";
                    targetRef.src = "https://raw.githubusercontent.com/udacity/CarND-LaneLines-P1/master/test_videos/solidWhiteRight.mp4";
                    targetRef.load();
                    targetRef.play().catch(err => console.log("Failed to play card fallback video", err));
                  }
                }}
              />
              <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-between">
                 <div className="flex justify-between items-start">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                        {lesson.category}
                    </span>
                    <span className="bg-zinc-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white border border-zinc-700/50">
                        {lesson.difficulty}
                    </span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="rounded-full bg-white/20 p-2 border border-white/10 backdrop-blur-md">
                      <Play className="h-4 w-4 text-white fill-white" />
                    </div>
                    <span className="text-xs font-semibold text-white/90">Watch Training Video</span>
                 </div>
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {lesson.duration}</span>
                    <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> Step-by-Step Training</span>
                  </div>
                  {lesson.completed && (
                    <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Completed</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-zinc-900 leading-tight mb-3">{lesson.title}</h3>
                <p className="text-sm text-zinc-500 mb-6 leading-relaxed line-clamp-2">{lesson.desc}</p>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-100 pt-6">
                <button 
                  onClick={() => handleStartLesson(lesson)}
                  className="flex items-center gap-2 text-sm font-bold text-zinc-900 hover:text-zinc-600 transition-colors"
                >
                  Start Lesson <ChevronRight className="h-4 w-4" />
                </button>
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-zinc-200 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
                  </div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-zinc-200 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="avatar" />
                  </div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-400">
                    +24
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Lecture Modal / Synapse Simulator */}
      <AnimatePresence>
        {selectedLesson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl bg-zinc-950 text-white rounded-3xl overflow-hidden border border-zinc-800 flex flex-col xl:flex-row shadow-2xl"
            >
              {/* Simulator / Video View */}
              <div className="flex-1 flex flex-col border-b xl:border-b-0 xl:border-r border-zinc-800">
                {/* Header mimicking datamaker synapse toolbar */}
                <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold tracking-tighter uppercase text-white bg-indigo-600 px-2.5 py-1 rounded-md">
                      datamaker synapse
                    </span>
                    <span className="bg-zinc-800 px-3 py-1 rounded-full text-[10px] font-mono border border-zinc-700/50 text-emerald-400 font-bold">
                      Labeler Mode
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                    <span>Task ID: <strong className="text-zinc-200">11031183</strong></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                    <span>Work Status: <strong className="text-amber-400">In Progress</strong></span>
                  </div>
                </div>

                {/* Sub-Header mimicking User Role Info */}
                <div className="bg-zinc-900/50 border-b border-zinc-800 px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-400">
                  <div>
                    Labeler: <span className="text-zinc-300">Rita Yea Kwadjati (ritakawd@gmail.com)</span>
                  </div>
                  <div>
                    Progress Time: <span className="text-emerald-400 font-bold">00:19:51</span>
                  </div>
                </div>

                {/* Video Container Playing Norway Roadways */}
                <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    controls
                    playsInline
                    muted
                    onError={(e) => {
                      console.log("Primary video loading failed, loading fallback...");
                      const videoEl = e.currentTarget;
                      if (!videoEl.dataset.fallbackTried) {
                        videoEl.dataset.fallbackTried = "true";
                        videoEl.src = "https://raw.githubusercontent.com/udacity/CarND-LaneLines-P1/master/test_videos/solidWhiteRight.mp4";
                        videoEl.load();
                        videoEl.play().catch(err => console.log("Failed to play fallback video", err));
                      }
                    }}
                  >
                    <source src={selectedLesson.videoUrl} type="video/mp4" />
                    <source src="https://raw.githubusercontent.com/udacity/CarND-LaneLines-P1/master/test_videos/solidWhiteRight.mp4" type="video/mp4" />
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Dynamic SVG annotation overlay imitating real user tracing mouse clicks */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Simulated white shoulder lane annotation */}
                    <path
                      d="M 180 540 Q 300 450 480 340 T 720 220"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3.5"
                    />
                    <circle cx="180" cy="540" r="5" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                    <circle cx="350" cy="425" r="5" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                    <circle cx="560" cy="300" r="5" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                    
                    {/* Simulated yellow centerline annotation */}
                    <path
                      d="M 520 540 Q 550 450 580 340 T 640 220"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3.5"
                      strokeDasharray="8 8"
                    />
                    <circle cx="520" cy="540" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                    <circle cx="565" cy="390" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                    
                    {/* Floating label box representing labeler tooltip */}
                    <g transform="translate(195, 515)">
                      <rect width="135" height="24" rx="6" fill="#1e1b4b" stroke="#3730a3" strokeWidth="1" />
                      <text x="8" y="15" fill="#e0e7ff" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        #1 Lane · Solid · White
                      </text>
                    </g>

                    <g transform="translate(535, 515)">
                      <rect width="140" height="24" rx="6" fill="#451a03" stroke="#78350f" strokeWidth="1" />
                      <text x="8" y="15" fill="#fef3c7" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        #2 Lane · Solid · Yellow
                      </text>
                    </g>
                  </svg>
                  
                  {/* Watermark Overlay mimicking Datamaker Annotator Tool */}
                  <div className="absolute top-4 left-4 bg-zinc-950/70 backdrop-blur-md border border-zinc-800/45 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[11px] font-mono">
                    <Activity className="h-3.5 w-3.5 text-blue-400" />
                    <span>Real-time Annotation Walkthrough</span>
                  </div>
                </div>

                {/* Video Info Controls */}
                <div className="p-6 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-zinc-300">
                      Walkthrough demonstrates: Adding vertices, adjusting brightness & selecting taxonomy tags.
                    </span>
                  </div>
                  <Link
                    to="/practice"
                    className="flex items-center gap-2 rounded-xl bg-white text-zinc-950 px-5  py-2.5 text-sm font-bold shadow-md hover:bg-zinc-200 transition-all active:scale-95"
                  >
                    Go Test It Now
                  </Link>
                </div>
              </div>

              {/* Sidebar with Meta Deck Guidelines */}
              <div className="w-full xl:w-80 p-8 flex flex-col justify-between bg-zinc-900/60">
                <div className="space-y-6">
                  {/* Close button */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Lesson Material</h3>
                    <button
                      onClick={() => setSelectedLesson(null)}
                      className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white leading-tight">{selectedLesson.title}</h4>
                    <p className="text-zinc-400 text-xs mt-1">Duration: {selectedLesson.duration} • Level: {selectedLesson.difficulty}</p>
                  </div>

                  <div className="border-t border-zinc-800 pt-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-lg bg-indigo-950/50 border border-indigo-900 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5 text-indigo-400" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-zinc-200">Interactive Canvas View</h5>
                        <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">Observe how white & yellow dashed and solid lanes are segmented.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-lg bg-amber-950/50 border border-amber-905 flex items-center justify-center shrink-0 mt-0.5">
                        <ZoomIn className="h-3.5 w-3.5 text-amber-500" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-zinc-200">Adjust View Transparency</h5>
                        <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">Zoom and dim brightness to see complex boundaries on highways.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-6 mt-6">
                  <div className="bg-zinc-800/40 border border-zinc-800 p-4 rounded-2xl flex gap-3">
                    <Info className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-300">Training Key</h4>
                      <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                        To add points in practice lab, make successive single-clicks. Drag points with left-drag to move existing vertices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
        sourceContext="lesson" 
      />
    </div>
  );
}
