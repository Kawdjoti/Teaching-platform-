import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Layers, MousePointer2, Target, Zap } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      title: "Interactive Practice",
      description: "Draw and edit polylines directly on high-resolution training images.",
      icon: MousePointer2
    },
    {
      title: "Guided Tutorials",
      description: "Learn the core concepts of computer vision annotation through step-by-step guides.",
      icon: Target
    },
    {
      title: "Immediate Feedback",
      description: "Get real-time accuracy scoring to help you improve your tracing skills.",
      icon: Zap
    }
  ];

  const examples = [
    { title: "Road Lanes", description: "Tracing lane boundaries for autonomous vehicles.", icon: Layers },
    { title: "Railway Tracks", description: "Annotating rail infrastructure for safety monitoring.", icon: Zap },
    { title: "Pipelines", description: "Mapping utility lines from aerial imagery.", icon: CheckCircle2 }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold tracking-tight text-zinc-900 sm:text-7xl"
            >
              Master the Art of <span className="text-zinc-500">Polyline Segmentation</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-xl leading-8 text-zinc-600"
            >
              The definitive platform for learning image annotation. Trace linear structures with precision, understand computer vision data, and accelerate AI development.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link
                to="/lessons"
                className="rounded-full bg-zinc-900 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-zinc-800 transition-all active:scale-95"
              >
                Start Learning
              </Link>
              <Link to="/practice" className="text-lg font-semibold leading-6 text-zinc-900 hover:text-zinc-600 transition-colors flex items-center gap-2">
                Practice Now <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Background Grid Accent */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.zinc.100),white)]" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-zinc-600/10 ring-1 ring-zinc-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      </section>

      {/* About Section */}
      <section className="bg-zinc-50 py-24 sm:py-32 border-y border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                What is Polyline Segmentation?
              </h2>
              <p className="mt-6 text-lg leading-8 text-zinc-600">
                Polyline segmentation is an image annotation technique used to label linear structures by connecting a series of points into segments. It is critical for teaching AI models to recognize continuous objects like roads, power lines, and human skeletons.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {examples.map((ex) => (
                  <div key={ex.title} className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300">
                    <ex.icon className="h-6 w-6 text-zinc-900" />
                    <h3 className="font-bold text-zinc-900">{ex.title}</h3>
                    <p className="text-sm text-zinc-500">{ex.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-video rounded-3xl bg-zinc-900 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Mock UI for Polyline Tracing */}
                <div 
                  className="w-full h-full bg-cover bg-center opacity-50" 
                  style={{ backgroundImage: "url('/polyline.jpg')" }}
                />
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <motion.path
                    d="M 100 200 L 300 150 L 500 250 L 700 100"
                    stroke="white"
                    strokeWidth="4"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <circle cx="100" cy="200" r="6" fill="white" />
                  <circle cx="300" cy="150" r="6" fill="white" />
                  <circle cx="500" cy="250" r="6" fill="white" />
                  <circle cx="700" cy="100" r="6" fill="white" />
                </svg>
              </div>
              <div className="absolute bottom-6 left-6 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-medium text-white border border-white/20">
                Live Annotation Simulation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Everything you need to master annotation
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            From absolute beginner to professional annotator, we provide the tools and resources you need to succeed in the AI industry.
          </p>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center rounded-3xl border border-zinc-100 bg-zinc-50/50 p-8 text-center transition-all hover:bg-zinc-50 hover:shadow-lg"
              >
                <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200">
                  <feature.icon className="h-6 w-6 text-zinc-900" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">{feature.title}</h3>
                <p className="mt-4 text-zinc-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-zinc-900 py-24 sm:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to start your annotation journey?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Join thousands of students learning the skills that power the future of artificial intelligence.
          </p>
          <div className="mt-10 flex justify-center gap-6">
            <Link
              to="/lessons"
              className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-zinc-900 shadow-sm hover:bg-zinc-100 transition-all active:scale-95"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
