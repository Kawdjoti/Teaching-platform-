import React from 'react';
import { motion } from 'motion/react';
import { Play, BookOpen, Clock, BarChart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LESSONS = [
  {
    id: 1,
    title: "Introduction to Polyline Segmentation",
    duration: "10 mins",
    difficulty: "Beginner",
    category: "Concepts",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    completed: true
  },
  {
    id: 2,
    title: "Annotating Road Infrastructure",
    duration: "15 mins",
    difficulty: "Beginner",
    category: "Practice",
    image: "https://images.unsplash.com/photo-1545143333-6382f1d5b893?auto=format&fit=crop&q=80&w=800",
    completed: false
  },
  {
    id: 3,
    title: "Advanced Polyline Editing Techniques",
    duration: "20 mins",
    difficulty: "Intermediate",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    completed: false
  },
  {
    id: 4,
    title: "Accuracy and QA in Image Annotation",
    duration: "12 mins",
    difficulty: "Intermediate",
    category: "Quality",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    completed: false
  }
];

export default function TutorialPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Learning Center</h1>
        <p className="text-zinc-500 mt-4 text-lg max-w-2xl">
          Master image annotation with our structured curriculum. Start from the basics and work your way up to professional standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {LESSONS.map((lesson) => (
          <motion.div
            key={lesson.id}
            whileHover={{ y: -4 }}
            className="group relative flex flex-col bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-xl transition-all"
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={lesson.image} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt={lesson.title}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent p-6 flex items-end">
                 <div className="flex items-center gap-2">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                        {lesson.category}
                    </span>
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                        {lesson.difficulty}
                    </span>
                 </div>
              </div>
              <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl p-4 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                <Play className="h-8 w-8 text-white fill-white" />
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {lesson.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> Video & Quiz</span>
                </div>
                {lesson.completed && (
                  <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Completed</span>
                )}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 leading-tight mb-6">{lesson.title}</h3>
              <div className="flex items-center justify-between">
                <Link 
                  to="/practice" 
                  className="flex items-center gap-2 text-sm font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors"
                >
                  Start Lesson <ChevronRight className="h-4 w-4" />
                </Link>
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-zinc-200 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
                  </div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-zinc-200 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="avatar" />
                  </div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-400">
                    +12
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
