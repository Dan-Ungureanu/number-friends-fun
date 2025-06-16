
import React from 'react';
import { Heart, Clock, Trophy } from 'lucide-react';
import { getTranslation } from '../data/translations';

interface GameHeaderProps {
  lives: number;
  score: number;
  timer: number;
  language: string;
  progress: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  lives,
  score,
  timer,
  language,
  progress
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border-b-2 border-blue-200 p-4 shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Lives */}
        <div className="flex items-center gap-2 bg-red-50 rounded-full px-4 py-2">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className={`w-6 h-6 ${
                  i < lives 
                    ? 'text-red-500 fill-red-500' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 mx-8">
          <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white drop-shadow-sm">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>

        {/* Score and Timer */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-yellow-50 rounded-full px-4 py-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span className="font-bold text-yellow-800">{score}</span>
          </div>
          
          <div className="flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="font-mono text-blue-800">{formatTime(timer)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
