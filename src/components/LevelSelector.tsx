
import React from 'react';
import { Button } from '@/components/ui/button';
import { gameLevels } from '../data/levels';
import { getTranslation } from '../data/translations';

interface LevelSelectorProps {
  selectedLevel: number;
  onLevelChange: (level: number) => void;
  language: string;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({
  selectedLevel,
  onLevelChange,
  language
}) => {
  const levelColors = [
    'from-green-400 to-green-600',
    'from-blue-400 to-blue-600', 
    'from-purple-400 to-purple-600',
    'from-red-400 to-red-600'
  ];

  return (
    <div className="w-full py-6">
      <div className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide">
        {gameLevels.map((level, index) => (
          <Button
            key={level.id}
            variant="outline"
            className={`min-w-48 h-24 rounded-xl border-2 transition-all duration-300 ${
              selectedLevel === level.id
                ? `bg-gradient-to-r ${levelColors[index]} text-white border-white shadow-xl transform scale-105`
                : 'bg-white hover:bg-gray-50 border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => onLevelChange(level.id)}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-bold">
                {level.id}
              </div>
              <div className="text-sm font-medium">
                {getTranslation(level.name, language)}
              </div>
              <div className="text-xs opacity-75">
                {level.range[0]}–{level.range[1]}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;
