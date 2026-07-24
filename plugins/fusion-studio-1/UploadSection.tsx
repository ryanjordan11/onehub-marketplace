import React, { RefObject } from "react";
import { Upload } from "lucide-react";

interface UploadSectionProps {
  selectedImage: string | null;
  fileInputRef: RefObject<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  generationCount: number;
  setGenerationCount: (count: number) => void;
  theme: {
    border: string;
    card: string;
    text: string;
    accent: string;
    activeBg: string;
  };
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  selectedImage,
  fileInputRef,
  onFileChange,
  generationCount,
  setGenerationCount,
  theme,
}) => {
  return (
    <div className={`${theme.card} rounded-2xl border ${theme.border} p-4 flex flex-col`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-6 h-6 rounded-full ${theme.activeBg} text-black flex items-center justify-center text-xs font-bold`}>
          1
        </div>
        <span className={`text-sm font-bold ${theme.text} uppercase tracking-wide`}>Upload</span>
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        className={`h-48 rounded-xl border-2 border-dashed ${theme.border} bg-black/20 hover:border-[#CCFF00] hover:bg-[#CCFF00]/5 transition-all cursor-pointer relative overflow-hidden group w-full`}
      >
        {selectedImage ? (
          <img src={selectedImage} className="w-full h-full object-cover" alt="Selected" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 group-hover:text-[#CCFF00]">
            <Upload size={24} className="mb-2" />
            <span className="text-xs font-bold uppercase">Choose Image</span>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          className="hidden"
          accept="image/*"
        />
      </div>

      {/* Batch Slider */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
          <span>VARIATIONS</span>
          <span className={theme.accent}>{generationCount}</span>
        </div>
        <input
          type="range"
          min="1"
          max="20"
          value={generationCount}
          onChange={e => setGenerationCount(parseInt(e.target.value))}
          className="w-full h-1 bg-gray-800 rounded-full appearance-none cursor-pointer accent-[#CCFF00]"
        />
      </div>
    </div>
  );
};
