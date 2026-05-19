import React from 'react';
import { Layers } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2 text-lg font-bold tracking-tighter text-zinc-900">
            <div className="rounded bg-zinc-900 p-1 text-white">
              <Layers className="h-4 w-4" />
            </div>
            PolyAnnotate
          </div>
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} PolyAnnotate. Teaching the art of precision in AI.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm font-medium text-zinc-500 hover:text-zinc-900">Privacy</a>
            <a href="#" className="text-sm font-medium text-zinc-500 hover:text-zinc-900">Terms</a>
            <a href="#" className="text-sm font-medium text-zinc-500 hover:text-zinc-900">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
