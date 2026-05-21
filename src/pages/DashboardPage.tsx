import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'motion/react';
import { Award, Clock, Target, TrendingUp, CheckCircle2 } from 'lucide-react';

const DATA = [
  { day: 'Mon', accuracy: 65, sessions: 2 },
  { day: 'Tue', accuracy: 68, sessions: 3 },
  { day: 'Wed', accuracy: 75, sessions: 1 },
  { day: 'Thu', accuracy: 72, sessions: 4 },
  { day: 'Fri', accuracy: 84, sessions: 2 },
  { day: 'Sat', accuracy: 82, sessions: 5 },
  { day: 'Sun', accuracy: 88, sessions: 3 },
];

export default function DashboardPage() {
  const stats = [
    { label: 'Total Lessons', value: '4 / 12', icon: Target, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Certificates', value: '1', icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Student Dashboard</h1>
        <p className="text-zinc-500 mt-2">Track your learning journey and annotation performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm"
          >
            <div className={cn("inline-flex p-3 rounded-2xl mb-4", stat.bg)}>
              <stat.icon className={cn("h-6 w-6", stat.color)} />
            </div>
            <div className="text-2xl font-bold text-zinc-900 mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h3 className="text-xl font-bold text-zinc-900 mb-8">Accuracy Progression</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA}>
                  <defs>
                    <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#a1a1aa', fontSize: 12 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#a1a1aa', fontSize: 12 }} 
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      borderRadius: '16px', 
                      border: '1px solid #e4e4e7',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
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
          </div>

          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h3 className="text-xl font-bold text-zinc-900 mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="h-12 w-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center transition-colors group-hover:bg-zinc-100">
                    <CheckCircle2 className="h-6 w-6 text-zinc-900" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-zinc-900">Completed Highway Lane Marking</h4>
                    <p className="text-sm text-zinc-500">2 hours ago • Accuracy Score: 92%</p>
                  </div>
                  <button className="text-zinc-400 hover:text-zinc-600">
                    <Award className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Profile Column */}
        <div className="space-y-8">
          <div className="bg-zinc-900 p-8 rounded-3xl text-white">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full border-4 border-white/10 bg-zinc-800 mb-4 overflow-hidden">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
              </div>
              <h3 className="text-2xl font-bold">Alex Johnson</h3>
              <p className="text-zinc-400 text-sm mt-1">Junior Annotator • Level 4</p>
              
              <div className="w-full h-1.5 rounded-full bg-zinc-800 mt-8 mb-2 overflow-hidden">
                <div className="h-full bg-white w-2/3" />
              </div>
              <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest text-right w-full">650 / 1000 XP</p>
              
              <button className="w-full mt-8 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 py-3 text-sm font-bold transition-all">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h3 className="text-xl font-bold text-zinc-900 mb-6">Badges Earned</h3>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="aspect-square bg-zinc-50 border border-zinc-100 rounded-2xl flex items-center justify-center transition-transform hover:scale-110">
                   <Award className={cn("h-8 w-8", i === 1 ? "text-amber-500" : "text-zinc-300")} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fixed import for cn since it's used
import { cn } from '../lib/utils';
