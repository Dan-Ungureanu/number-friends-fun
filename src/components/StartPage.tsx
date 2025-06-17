import React from 'react';
import { getTranslation } from '../data/translations';

interface StartPageProps {
  onLanguageSelect: (language: string) => void;
  currentLanguage: string;
}

const StartPage: React.FC<StartPageProps> = ({ onLanguageSelect, currentLanguage }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ro', name: 'Română' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'nl', name: 'Nederlands' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {getTranslation('select_language', currentLanguage)}
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageSelect(lang.code)}
              className="p-4 text-center rounded-lg bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-400 transition-colors duration-200"
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartPage; 