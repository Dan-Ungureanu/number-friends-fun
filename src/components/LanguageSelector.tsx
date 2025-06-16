
import React from 'react';
import { Button } from '@/components/ui/button';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages = [
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' }
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl">
      {languages.map((language) => (
        <Button
          key={language.code}
          variant={selectedLanguage === language.code ? "default" : "outline"}
          className={`h-16 text-sm font-medium transition-all duration-200 ${
            selectedLanguage === language.code 
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg transform scale-105' 
              : 'hover:bg-blue-50 hover:border-blue-300'
          }`}
          onClick={() => onLanguageChange(language.code)}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl">{language.flag}</span>
            <span className="text-xs">{language.name}</span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default LanguageSelector;
