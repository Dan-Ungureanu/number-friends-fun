
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import LanguageSelector from '../components/LanguageSelector';
import GameContainer from '../components/GameContainer';
import { getTranslation } from '../data/translations';

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('ro');
  const [isGameStarted, setIsGameStarted] = useState(false);

  if (isGameStarted) {
    return (
      <GameContainer
        language={selectedLanguage}
        onBackToHome={() => setIsGameStarted(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-4xl text-center">
        {/* Game Title */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {getTranslation('game_title', selectedLanguage)}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
            {getTranslation('game_subtitle', selectedLanguage)}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un joc educațional interactiv pentru învățarea numerelor pare și impare prin joc și distracție!
          </p>
        </div>

        {/* Mascot Characters */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center animate-bounce">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-4xl mb-2 shadow-lg">
              😊
            </div>
            <p className="text-sm font-medium text-blue-600">Par</p>
          </div>
          <div className="text-center animate-bounce" style={{ animationDelay: '0.2s' }}>
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-4xl mb-2 shadow-lg">
              😄
            </div>
            <p className="text-sm font-medium text-green-600">Impar</p>
          </div>
        </div>

        {/* Language Selection */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            {getTranslation('choose_language', selectedLanguage)}
          </h3>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>

        {/* Start Game Button */}
        <Button
          onClick={() => setIsGameStarted(true)}
          size="lg"
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white text-2xl px-12 py-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 font-bold"
        >
          ✨ {getTranslation('start_game', selectedLanguage)} ✨
        </Button>

        {/* Game Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-sm">
          <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl">
            <div className="text-3xl mb-2">🎯</div>
            <h4 className="font-semibold text-blue-800 mb-1">4 Niveluri</h4>
            <p className="text-blue-600 text-center">De la începător la profesionist</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-green-50 rounded-xl">
            <div className="text-3xl mb-2">🌍</div>
            <h4 className="font-semibold text-green-800 mb-1">8 Limbi</h4>
            <p className="text-green-600 text-center">Suport multilingv complet</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-purple-50 rounded-xl">
            <div className="text-3xl mb-2">🎮</div>
            <h4 className="font-semibold text-purple-800 mb-1">Interactiv</h4>
            <p className="text-purple-600 text-center">Drag & drop și animații</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
