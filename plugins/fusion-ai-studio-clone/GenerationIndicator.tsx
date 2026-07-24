import React from "react";
import { Loader2, Check, Sparkles } from "lucide-react";

interface GeneratedResult {
  id: number;
  url: string;
  prompt: string;
  timestamp: string;
}

interface GenerationIndicatorProps {
  isLoading: boolean;
  generatedResults: GeneratedResult[];
  error: string | null;
  onViewResults: () => void;
}

export const GenerationIndicator: React.FC<GenerationIndicatorProps> = ({
  isLoading,
  generatedResults,
  error,
  onViewResults,
}) => {
  // Don't show if nothing is happening
  if (!isLoading && generatedResults.length === 0 && !error) {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-6 z-30">
      {/* Loading State */}
      {isLoading && (
        <div className="bg-black/90 border border-[#CCFF00]/50 rounded-2xl px-4 py-3 flex items-center gap-3 animate-pulse shadow-lg shadow-[#CCFF00]/20">
          <Loader2 size={20} className="text-[#CCFF00] animate-spin" />
          <div>
            <p className="text-sm font-bold text-white">Generating...</p>
            <p className="text-xs text-gray-400">Your image is being created</p>
          </div>
        </div>
      )}

      {/* Success State - Show when we have results and not loading */}
      {!isLoading && generatedResults.length > 0 && (
        <button
          onClick={onViewResults}
          className="bg-[#CCFF00] text-black rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg shadow-[#CCFF00]/30 hover:scale-105 transition-transform group"
        >
          <div className="relative">
            <Sparkles size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-[#CCFF00] text-[10px] font-bold rounded-full flex items-center justify-center">
              {generatedResults.length}
            </span>
          </div>
          <div className="text-left">
            <p className="text-sm font-bold">Images Ready!</p>
            <p className="text-xs opacity-70">Click to view in vault</p>
          </div>
        </button>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-red-900/90 border border-red-500/50 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
          <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-white text-xs">!</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Generation Failed</p>
            <p className="text-xs text-red-200 max-w-[200px] truncate">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};
