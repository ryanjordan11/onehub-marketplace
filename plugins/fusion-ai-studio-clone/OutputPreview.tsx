import React from "react";
import { Box, Loader2 } from "lucide-react";

interface GeneratedResult {
  id: number;
  url: string;
  prompt: string;
  timestamp: string;
}

interface OutputPreviewProps {
  generatedResults: GeneratedResult[];
  isLoading: boolean;
  onOpenVault: () => void;
  theme: {
    border: string;
    card: string;
    textMuted: string;
    accent: string;
  };
}

export const OutputPreview: React.FC<OutputPreviewProps> = ({
  generatedResults,
  isLoading,
  onOpenVault,
  theme,
}) => {
  return (
    <div className={`lg:col-span-5 ${theme.card} rounded-2xl border ${theme.border} flex flex-col relative overflow-hidden lg:h-full`}>
      <div className={`p-4 border-b ${theme.border} flex justify-between items-center`}>
        <span className={`text-xs font-bold ${theme.textMuted} uppercase`}>Latest Output</span>
        <button onClick={onOpenVault} className={`text-xs ${theme.accent} hover:underline`}>
          Open Vault
        </button>
      </div>
      <div className="flex-1 p-4 flex items-center justify-center">
        {isLoading ? (
          <div className="text-center">
            <Loader2 size={48} className="mx-auto mb-4 text-[#CCFF00] animate-spin" />
            <p className="text-sm font-bold text-gray-400">Creating your image...</p>
            <p className="text-xs text-gray-600 mt-1">This may take a moment</p>
          </div>
        ) : generatedResults.length > 0 ? (
          <div className="relative w-full">
            <img
              src={generatedResults[0].url}
              className="w-full h-auto rounded-lg shadow-lg border border-white/10"
              alt="Latest generation"
            />
            <div className="absolute top-2 right-2 bg-[#CCFF00] text-black text-xs font-bold px-2 py-1 rounded">
              NEW
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <Box size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-xs font-mono">WAITING FOR SIGNAL</p>
          </div>
        )}
      </div>
    </div>
  );
};
