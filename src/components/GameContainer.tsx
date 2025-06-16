
import React, { useState, useEffect } from 'react';
import GameHeader from './GameHeader';
import LevelSelector from './LevelSelector';
import Level1Game from './Level1Game';
import Level2Game from './Level2Game';
import Level3Game from './Level3Game';
import Level4Game from './Level4Game';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { GameState } from '../types/game';

interface GameContainerProps {
  language: string;
  onBackToHome: () => void;
}

const GameContainer: React.FC<GameContainerProps> = ({
  language,
  onBackToHome
}) => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    score: 0,
    lives: 3,
    timer: 0,
    language,
    isGameActive: true,
    progress: 0
  });

  useEffect(() => {
    if (gameState.isGameActive) {
      const interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timer: prev.timer + 1
        }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameState.isGameActive]);

  const handleCorrectAnswer = () => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + 100,
      progress: Math.min(prev.progress + 10, 100)
    }));
  };

  const handleWrongAnswer = () => {
    setGameState(prev => {
      const newLives = prev.lives - 1;
      return {
        ...prev,
        lives: newLives,
        isGameActive: newLives > 0
      };
    });
  };

  const handleLevelChange = (level: number) => {
    setGameState(prev => ({
      ...prev,
      currentLevel: level
    }));
  };

  const renderCurrentLevel = () => {
    switch (gameState.currentLevel) {
      case 1:
        return (
          <Level1Game
            language={language}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
          />
        );
      case 2:
        return (
          <Level2Game
            language={language}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
          />
        );
      case 3:
        return (
          <Level3Game
            language={language}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
          />
        );
      case 4:
        return (
          <Level4Game
            language={language}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
          />
        );
      default:
        return (
          <div className="text-center p-12">
            <h3 className="text-2xl font-bold text-gray-600 mb-4">
              Nivelul {gameState.currentLevel} în dezvoltare
            </h3>
            <p className="text-gray-500">
              Acest nivel va fi disponibil în curând!
            </p>
          </div>
        );
    }
  };

  if (!gameState.isGameActive && gameState.lives === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-pink-600 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 text-center shadow-2xl max-w-md">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Jocul s-a terminat!
          </h2>
          <p className="text-gray-600 mb-6">
            Scor final: {gameState.score}
          </p>
          <Button
            onClick={onBackToHome}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl"
          >
            Încearcă din nou
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <GameHeader
        lives={gameState.lives}
        score={gameState.score}
        timer={gameState.timer}
        language={language}
        progress={gameState.progress}
      />
      
      <div className="pb-8">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="outline"
            onClick={onBackToHome}
            className="flex items-center gap-2 bg-white/90 hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi
          </Button>
        </div>

        <LevelSelector
          selectedLevel={gameState.currentLevel}
          onLevelChange={handleLevelChange}
          language={language}
        />

        <div className="px-4">
          {renderCurrentLevel()}
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
