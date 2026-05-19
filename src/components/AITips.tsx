import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface AITipsProps {
  context: string;
}

export default function AITips({ context }: AITipsProps) {
  const [tip, setTip] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getTip = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai-tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: `Give a brief, professional image annotation tip for someone practicing polyline segmentation on a ${context}. The tip should be one sentence long and focus on accuracy or industry best practices.` 
        }),
      });
      const data = await response.json();
      setTip(data.text);
    } catch (error) {
      console.error("Failed to get AI tip:", error);
      setTip("Focus on placing points precisely at the transition of colors for best edge detection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 p-6 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-indigo-900 font-bold">
          <Sparkles className="h-5 w-5" />
          AI-Powered Tips
        </div>
        <button
          onClick={getTip}
          disabled={loading}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Get New Tip"}
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 text-indigo-400 animate-spin" />
        </div>
      ) : tip ? (
        <p className="text-sm text-indigo-800 leading-relaxed italic">
          "{tip}"
        </p>
      ) : (
        <p className="text-sm text-indigo-700/60 leading-relaxed italic">
          Click button to get an AI-generated tip based on your current task.
        </p>
      )}
    </div>
  );
}
