import React from "react";

interface Emotion {
  id: string;
  label: string;
}

interface ShotType {
  id: string;
  label: string;
}

interface FineTuneSectionProps {
  emotions: Emotion[];
  shotTypes: ShotType[];
  selectedEmotions: string[];
  setSelectedEmotions: React.Dispatch<React.SetStateAction<string[]>>;
  selectedShotType: string;
  setSelectedShotType: (type: string) => void;
  theme: {
    border: string;
    activeItem: string;
  };
}

export const FineTuneSection: React.FC<FineTuneSectionProps> = ({
  emotions,
  shotTypes,
  selectedEmotions,
  setSelectedEmotions,
  selectedShotType,
  setSelectedShotType,
  theme,
}) => {
  const toggleSelection = (id: string) => {
    setSelectedEmotions(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className={`p-4 border-t ${theme.border} bg-black/20 shrink-0`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center text-xs font-bold">
          3
        </div>
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Fine Tune (Optional)</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <select
          value={selectedShotType}
          onChange={e => setSelectedShotType(e.target.value)}
          className={`bg-black border ${theme.border} text-xs rounded-lg px-3 py-1.5 text-gray-300 outline-none focus:border-[#CCFF00]`}
        >
          {shotTypes.map(s => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        {emotions.slice(1, 10).map(e => (
          <button
            key={e.id}
            onClick={() => toggleSelection(e.id)}
            className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
              selectedEmotions.includes(e.id)
                ? theme.activeItem
                : `border-transparent bg-white/5 text-gray-500 hover:text-white`
            }`}
          >
            {e.label}
          </button>
        ))}
      </div>
    </div>
  );
};
