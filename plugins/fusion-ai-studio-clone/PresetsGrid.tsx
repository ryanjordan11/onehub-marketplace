import React from "react";
import { Check } from "lucide-react";

interface Preset {
  id: string;
  category: string;
  type?: string;
  label: string;
  prompt: string;
}

interface PresetsGridProps {
  presets: Preset[];
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  selectedPresetId: string | null;
  setSelectedPresetId: (id: string) => void;
  theme: {
    border: string;
    card: string;
    text: string;
    activeBg: string;
    activeItem: string;
  };
}

export const PresetsGrid: React.FC<PresetsGridProps> = ({
  presets,
  categories,
  activeCategory,
  setActiveCategory,
  selectedPresetId,
  setSelectedPresetId,
  theme,
}) => {
  return (
    <div className={`flex-1 rounded-2xl border ${theme.border} ${theme.card} flex flex-col overflow-hidden`}>
      {/* Header */}
      <div className={`p-4 border-b ${theme.border} bg-black/20 shrink-0`}>
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-6 h-6 rounded-full ${theme.activeBg} text-black flex items-center justify-center text-xs font-bold`}>
            2
          </div>
          <span className={`text-sm font-bold ${theme.text} uppercase tracking-wide`}>Select Style</span>
        </div>
        {/* Categories */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all ${
              activeCategory === "All" ? theme.activeItem : `border-transparent bg-white/5 text-gray-500 hover:text-white`
            }`}
          >
            ALL
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all ${
                activeCategory === cat ? theme.activeItem : `border-transparent bg-white/5 text-gray-500 hover:text-white`
              }`}
            >
              {cat.split(":")[1] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Presets Grid */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-800 max-h-[calc(100vh-280px)]">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {presets
            .filter(p => activeCategory === "All" || p.category === activeCategory)
            .map(preset => (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`text-left p-2 rounded-xl border transition-all h-16 flex flex-col justify-between group ${
                  selectedPresetId === preset.id
                    ? `bg-[#CCFF00]/10 border-[#CCFF00]`
                    : `bg-black/20 ${theme.border} hover:bg-white/5`
                }`}
              >
                <div className="flex justify-between w-full items-start">
                  <span
                    className={`text-[8px] uppercase font-bold px-1 py-0.5 rounded ${
                      selectedPresetId === preset.id ? "bg-[#CCFF00] text-black" : "bg-white/10 text-gray-500"
                    }`}
                  >
                    {preset.type || "Solo"}
                  </span>
                  {selectedPresetId === preset.id && <Check size={10} className="text-[#CCFF00]" />}
                </div>
                <span
                  className={`text-[9px] font-bold leading-snug ${
                    selectedPresetId === preset.id ? "text-[#CCFF00]" : "text-gray-400 group-hover:text-white"
                  }`}
                >
                  {preset.label}
                </span>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
