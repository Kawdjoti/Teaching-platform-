import React, { useEffect, useState } from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Clock, 
  Target, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  LogIn, 
  Calendar, 
  ChevronRight, 
  UserCheck, 
  TrendingUp, 
  BookOpen,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  getOrCreateProgress, 
  getPracticeSessionsFromFirestore, 
  PracticeSession, 
  UserProgress 
} from '../lib/firestoreService';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const TASK_MAP: Record<string, string> = {
  'road-1': 'Highway Lane Marking',
  'rail-1': 'Railway Tracks',
  'rail-1-1': 'Rail: Industrial Cargo Depot',
  'rail-1-2': 'Rail: Metropoli Junction',
  'rail-1-3': 'Rail: Forest Wilderness Pass',
  'rail-1-4': 'Rail: Seashore Coastal Lines',
  'rail-1-5': 'Rail: Golden Sunset Prairie',
  'rail-1-6': 'Rail: Snowy Mountain Crossing',
  'pipeline-1': 'Industrial Pipelines'
};

export default function DashboardPage() {
  const { user, signIn } = useAuth();
  
  // Dynamic state
  const [loadingStats, setLoadingStats] = useState(true);
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  // Fetch Firestore data
  useEffect(() => {
    if (!user) {
      setLoadingStats(false);
      return;
    }

    async function loadData() {
      try {
        setLoadingStats(true);
        const [progressData, sessionsList] = await Promise.all([
          getOrCreateProgress(user.uid),
          getPracticeSessionsFromFirestore(user.uid)
        ]);
        
        setProgress(progressData);
        setSessions(sessionsList);
      } catch (err) {
        console.error("Failed to load dashboard statistics:", err);
      } finally {
        setLoadingStats(false);
      }
    }

    loadData();
  }, [user]);

  // If loading, show elegant loading circle container
  if (user && loadingStats) {
    return (
      <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-950" />
          <p className="text-sm font-semibold text-zinc-400 font-mono">Synchronizing learning profile...</p>
        </div>
      </div>
    );
  }

  // State A: Signed Out Portal Layout
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50/50 p-8 md:p-12 text-center flex flex-col items-center justify-center">
          {/* Subtle Grid Accent */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-45" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 max-w-xl"
          >
            <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-6">
              <Zap className="h-4 w-4 fill-indigo-600 animate-pulse text-indigo-600" />
              Datamaker Interactive Academy
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Start Tracking Your Annotation Skill Level
            </h1>
            <p className="mt-4 text-base leading-relaxed text-zinc-500">
              Sign up or register down below to load your personalized performance dashboard, unlock structured progress pathways, review saved polyline evaluations, and earn official labeler micro-credentials.
            </p>

            {/* Dashboard Mock Features */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="bg-white border border-zinc-150 rounded-2xl p-4 flex gap-3.5">
                <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-800">Precision Statistics</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Visualize your accuracy progression curve on every saved training draft.</p>
                </div>
              </div>

              <div className="bg-white border border-zinc-150 rounded-2xl p-4 flex gap-3.5">
                <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-800">Dynamic Badges</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Earn custom certified accomplishments validating annotation taxonomy hygiene.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-zinc-200/60">
              <button
                id="dash-gate-signin-btn"
                onClick={signIn}
                className="inline-flex items-center gap-2.5 rounded-2xl bg-zinc-950 px-8 py-4 text-sm font-bold text-white shadow-xl hover:bg-zinc-800 transition-all active:scale-[0.98] outline-none cursor-pointer"
              >
                <LogIn className="h-4 w-4 text-indigo-400" />
                Unlock Dashboard with Google
              </button>
              <div className="text-[11px] text-zinc-400 mt-3 font-medium flex items-center justify-center gap-1">
                <UserCheck className="h-3.5 w-3.5 text-emerald-500" /> Secure user profile syncing enabled. Zero payments required.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Computed gamification metrics
  const completedLessonsCount = progress?.completedLessons?.length || 0;
  
  // Calculate quiz assessed score (concepts assessment)
  const quizScore = progress?.quizResults?.['concepts-assessment-1'];
  const hasQuizPassed = quizScore !== undefined && quizScore >= 80;

  // Let's compute XP & Level dynamically
  // Each completion adds values: Completed lesson = 200 XP, Saved practice session = 150 XP, Quiz assessment = 300 XP
  const lessonXp = completedLessonsCount * 200;
  const practiceXp = sessions.length * 150;
  const quizXp = quizScore !== undefined ? 300 : 0;
  const totalXp = lessonXp + practiceXp + quizXp;
  
  const level = Math.floor(totalXp / 1000) + 1;
  const currentLevelXp = totalXp % 1000;
  const nextLevelXpThreshold = 1000;
  const levelProgressPercentage = (currentLevelXp / nextLevelXpThreshold) * 100;

  // Format accuracy progression data for charting
  // Show last 7 sessions, sorted chronological
  const rawChartData = [...sessions]
    .reverse() // from oldest to newest for chronological progress
    .slice(-7); // take last 7

  const chartData = rawChartData.length > 0 
    ? rawChartData.map((s, index) => {
        const dateObj = s.createdAt?.seconds 
          ? new Date(s.createdAt.seconds * 1000) 
          : new Date();
        const formattedDay = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        return {
          day: `${formattedDay} #${rawChartData.length - index}`,
          accuracy: s.accuracy,
          sessions: 1
        };
      })
    : [
        { day: 'Start', accuracy: 0, sessions: 0 },
        { day: 'Setup', accuracy: 0, sessions: 0 }
      ];

  // Dynamic Badges layout configuration
  const badges = [
    {
      id: 'badge-onboarding',
      title: 'Academy Recruit',
      desc: 'Created an authenticated Datamaker trainee account.',
      isUnlocked: true,
      color: 'text-blue-500 border-blue-100 bg-blue-50'
    },
    {
      id: 'badge-first-practice',
      title: 'Lab Assistant',
      desc: 'Completed and drafted your first interactive polyline task.',
      isUnlocked: sessions.length > 0,
      color: 'text-indigo-500 border-indigo-100 bg-indigo-50'
    },
    {
      id: 'badge-precision',
      title: 'Precision Specialist',
      desc: 'Achieved 90% or higher target accuracy on a practice task.',
      isUnlocked: sessions.some(s => s.accuracy >= 90),
      color: 'text-emerald-500 border-emerald-100 bg-emerald-50'
    },
    {
      id: 'badge-theory',
      title: 'Theory Scholar',
      desc: 'Scored 80% or greater on the concepts assessment.',
      isUnlocked: hasQuizPassed,
      color: 'text-amber-500 border-amber-100 bg-amber-50'
    },
    {
      id: 'badge-completionist',
      title: 'Curriculum Master',
      desc: 'Triggered and started the road infrastructure training guide.',
      isUnlocked: completedLessonsCount > 0,
      color: 'text-purple-500 border-purple-100 bg-purple-50'
    }
  ];

  // Stats cards configuration
  const stats = [
    { 
      label: 'Lessons Started', 
      value: `${completedLessonsCount} / 1`, 
      icon: Target, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      desc: 'Core training modules initiated'
    },
    { 
      label: 'Quiz Assessment Passed', 
      value: hasQuizPassed ? 'Passed' : quizScore !== undefined ? `${quizScore}%` : 'Not Taken', 
      icon: Award, 
      color: hasQuizPassed ? 'text-emerald-600' : 'text-zinc-400', 
      bg: hasQuizPassed ? 'bg-emerald-50' : 'bg-zinc-50',
      desc: 'Concept master certificates earned'
    },
  ];

  // Create real activity feed lists
  const activities: Array<{
    id: string;
    type: 'lesson' | 'session' | 'quiz';
    title: string;
    subtitle: string;
    timestamp: string;
    scoreLabel?: string;
  }> = [];

  // 1. Populate sessions-based activities
  sessions.slice(0, 4).forEach((s, idx) => {
    const taskName = TASK_MAP[s.imageId] || 'Delineation Task';
    
    // Human-friendly date representation
    let formattedDate = 'Recently';
    if (s.createdAt?.seconds) {
      const date = new Date(s.createdAt.seconds * 1000);
      formattedDate = date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    activities.push({
      id: s.id || `act-session-${idx}`,
      type: 'session',
      title: `Saved Custom Annotations for ${taskName}`,
      subtitle: `Draft complete • Accuracy score: ${s.accuracy}%`,
      timestamp: formattedDate,
      scoreLabel: `${s.accuracy}%`
    });
  });

  // 2. Populate quiz assessment if present
  if (quizScore !== undefined) {
    let formattedDate = 'Recently';
    if (progress?.updatedAt?.seconds) {
      const date = new Date(progress.updatedAt.seconds * 1000);
      formattedDate = date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric'
      });
    }

    activities.push({
      id: 'act-quiz',
      type: 'quiz',
      title: 'Passed Concepts Assessment',
      subtitle: hasQuizPassed ? 'Official assessment passing mark achieved!' : 'Assessment evaluated below certificate target.',
      timestamp: formattedDate,
      scoreLabel: `${quizScore}%`
    });
  }

  // 3. Populate lesson starting history if present
  if (completedLessonsCount > 0) {
    activities.push({
      id: 'act-lesson',
      type: 'lesson',
      title: 'Began Road Infrastructure Walkthrough',
      subtitle: 'Studied high-resolution workflow and lane tagging conventions.',
      timestamp: 'Recently'
    });
  }

  // Sort activities chronologically (fake order since array adds them sequentially)
  // We'll keep them ordered: session first, then quiz, then lessons
  const displayActivities = activities.slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl font-sans">
      
      {/* Dynamic Welcome Heading */}
      <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Hi, {user.displayName || user.email?.split('@')[0]}
          </h1>
          <p className="text-zinc-500 mt-2">Welcome back to Datamaker academy database. Track your precise training parameters below.</p>
        </div>
        <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 rounded-2xl p-3 text-xs font-mono text-zinc-600">
          <Calendar className="h-4 w-4 text-zinc-400 shrink-0" />
          <span>Active Session ID: <strong className="text-zinc-900">{user.uid.slice(0, 8)}</strong></span>
        </div>
      </div>

      {/* Core Dynamic Stats Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className={cn("inline-flex p-3 rounded-2xl mb-4", stat.bg)}>
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
              <div className="text-3xl font-extrabold text-zinc-900 leading-none mb-1">{stat.value}</div>
              <div className="text-sm font-bold text-zinc-500 uppercase tracking-wider">{stat.label}</div>
            </div>
            <p className="text-xs text-zinc-400 mt-4 border-t border-zinc-50 pt-3">{stat.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Charts and Activities feeds) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Practice Accuracy Chart Progression */}
          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-zinc-900">Annotation Calibration Curve</h3>
                <p className="text-xs text-zinc-450 mt-1">Tracks the quality scores of your submitted polyline drafts.</p>
              </div>
              {sessions.length > 0 && (
                <span className="text-xs font-bold uppercase text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> Average: {Math.round(sessions.reduce((acc, curr) => acc + curr.accuracy, 0) / sessions.length)}%
                </span>
              )}
            </div>

            {sessions.length === 0 ? (
              <div className="h-[260px] flex flex-col items-center justify-center text-center border-2 border-dashed border-zinc-150 rounded-2xl bg-zinc-50/50 p-6">
                <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-3">
                  <Lock className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-bold text-zinc-700">No Calibration Data Found</h4>
                <p className="text-xs text-zinc-400 max-w-sm mt-1">
                  Run custom segmentation practices in the sandbox to draw your calibration timeline chart automatically.
                </p>
                <Link
                  to="/practice"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-zinc-950 bg-white border border-zinc-200 shadow-sm px-4 py-2 rounded-xl hover:bg-zinc-50 transition-colors"
                >
                  Start Practice Session <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.12}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#a1a1aa', fontSize: 11 }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#a1a1aa', fontSize: 11 }} 
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        borderRadius: '16px', 
                        border: '1px solid #e4e4e7',
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                        fontSize: '12px'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorAcc)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Real user feedback and activity lists */}
          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h3 className="text-xl font-bold text-zinc-900 mb-6">Recent Academy Activities</h3>
            
            {displayActivities.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <BookOpen className="h-8 w-8 text-zinc-300 mb-3" />
                <h4 className="text-sm font-semibold text-zinc-500">No activity logged</h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm">
                  Complete lessons or start tests to feed operations into your activity logs securely.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {displayActivities.map((act) => (
                  <div key={act.id} className="flex items-start gap-4 group">
                    <div className="h-10 w-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center transition-colors group-hover:bg-zinc-100 shrink-0 mt-0.5">
                      <CheckCircle2 className="h-5 w-5 text-zinc-900" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-zinc-900 group-hover:text-indigo-600 transition-colors">{act.title}</h4>
                      <p className="text-xs text-zinc-400 mt-1">{act.timestamp} • {act.subtitle}</p>
                    </div>
                    {act.scoreLabel && (
                      <span className="text-xs font-mono font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                        Score: {act.scoreLabel}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (User Profile level and badges) */}
        <div className="space-y-8">
          
          {/* User Profile Info Card inside Gamification container */}
          <div className="bg-zinc-900 p-8 rounded-3xl text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full border-4 border-white/10 bg-zinc-805 mb-4 overflow-hidden shadow-lg select-none">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.displayName || user.email}`} 
                  alt="Avatar" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight">{user.displayName || user.email?.split('@')[0]}</h3>
              <p className="text-zinc-400 text-xs mt-1 uppercase font-mono tracking-widest">
                Level {level} • Datamaker Trainee
              </p>
              
              <div className="w-full h-2 rounded-full bg-zinc-800 mt-8 mb-2 overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-500" 
                  style={{ width: `${levelProgressPercentage}%` }}
                />
              </div>
              <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest text-right w-full">
                {currentLevelXp} / {nextLevelXpThreshold} XP
              </p>
              
              <Link
                to="/lessons"
                className="w-full mt-6 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/5 py-3 text-sm font-bold transition-all text-center flex items-center justify-center gap-1.5"
              >
                Go to Lessons
              </Link>
            </div>
          </div>

          {/* Badges Earned List Container */}
          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h3 className="text-xl font-bold text-zinc-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600">Badges Earned</h3>
            <div className="space-y-4">
              {badges.map((badge) => (
                <div 
                  key={badge.id} 
                  className={cn(
                    "flex items-start gap-3.5 p-3 rounded-2xl border transition-all",
                    badge.isUnlocked 
                      ? "bg-zinc-50/50 border-zinc-100 hover:bg-zinc-50" 
                      : "bg-zinc-50/20 border-zinc-1.5/50 opacity-45 select-none"
                  )}
                >
                  <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border",
                    badge.isUnlocked ? badge.color : "text-zinc-300 border-zinc-100 bg-zinc-100/50"
                  )}>
                    {badge.isUnlocked ? (
                      <Award className="h-5 w-5" />
                    ) : (
                      <Lock className="h-4 w-4 text-zinc-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                      {badge.title}
                      {!badge.isUnlocked && <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold font-mono">(Locked)</span>}
                    </h4>
                    <p className="text-[10px] text-zinc-400 mt-0.5 leading-normal">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
