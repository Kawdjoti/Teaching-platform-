import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Layers, GraduationCap, PlayCircle, BarChart2, LogIn, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export default function Navbar() {
  const { user, signIn, signOut } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Lessons', path: '/lessons', icon: GraduationCap },
    { name: 'Practice', path: '/practice', icon: PlayCircle },
    { name: 'Quiz', path: '/quiz', icon: Layers },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart2 },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter text-zinc-900">
          <div className="rounded-lg bg-zinc-900 p-1.5 text-white">
            <Layers className="h-5 w-5" />
          </div>
          PolyAnnotate
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-zinc-900",
                  isActive ? "text-zinc-900" : "text-zinc-500"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden text-sm font-medium text-zinc-600 md:inline-block">
                {user.displayName}
              </span>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-50"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-95"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
