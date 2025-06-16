
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getTranslation } from '../data/translations';

interface Level2GameProps {
  language: string;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}

const Level2Game: React.FC<Level2GameProps> = ({
  language,
  onCorrectAnswer,
  onWrongAnswer
}) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [tens, setTens] = useState(0);
  const [units, setUnits] = useState(0);
  const [userAnswer, setUserAnswer] = useState<'even' | 'odd' | null>(null);

  useEffect(() => {
    generateNewNumber();
  }, []);

  const generateNewNumber = () => {
    const num = Math.floor(Math.random() * 21) + 11; // 11-31
    setCurrentNumber(num);
    setTens(Math.floor(num / 10));
    setUnits(num % 10);
    setUserAnswer(null);
  };

  const handleAnswer = (answer: 'even' | 'odd') => {
    setUserAnswer(answer);
    const isEven = currentNumber % 2 === 0;
    const correct = (isEven && answer === 'even') || (!isEven && answer === 'odd');
    
    if (correct) {
      onCorrectAnswer();
      setTimeout(generateNewNumber, 2000);
    } else {
      onWrongAnswer();
    }
  };

  const renderTens = () => {
    const tensRods = [];
    for (let i = 0; i < tens; i++) {
      tensRods.push(
        <div key={`tens-${i}`} className="w-4 h-20 bg-blue-500 rounded-sm mx-1 flex flex-col">
          {[...Array(10)].map((_, j) => (
            <div key={j} className="flex-1 border-b border-blue-400" />
          ))}
        </div>
      );
    }
    return tensRods;
  };

  const renderUnits = () => {
    const unitDots = [];
    for (let i = 0; i < units; i++) {
      unitDots.push(
        <div 
          key={`unit-${i}`} 
          className="w-6 h-6 bg-green-500 rounded-full mx-1 mb-1 flex items-center justify-center text-white text-xs font-bold"
        >
          {i + 1}
        </div>
      );
    }
    return unitDots;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Game Instructions */}
      <div className="text-center bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-xl">
        <h2 className="text-3xl font-bold mb-2">
          Nivel 2 - Interactiv - {currentNumber}
        </h2>
        <p className="text-lg opacity-90">
          Analizează zecile și unitățile pentru a determina dacă numărul este par sau impar
        </p>
      </div>

      {/* Number Decomposition */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-700">
          {currentNumber} = {tens} zeci + {units} unități
        </h3>

        <div className="flex justify-center items-end space-x-8 mb-8">
          {/* Tens */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4 text-blue-600">
              {tens} Zeci
            </h4>
            <div className="flex justify-center items-end">
              {renderTens()}
            </div>
          </div>

          {/* Plus Sign */}
          <div className="text-4xl font-bold text-gray-500 mb-10">+</div>

          {/* Units */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4 text-green-600">
              {units} Unități
            </h4>
            <div className="flex flex-wrap justify-center max-w-48">
              {renderUnits()}
            </div>
          </div>
        </div>

        {/* Answer Buttons */}
        <div className="flex justify-center space-x-6">
          <Button
            onClick={() => handleAnswer('even')}
            size="lg"
            className={`px-8 py-4 text-xl rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 ${
              userAnswer === 'even' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            📊 PAR
          </Button>
          
          <Button
            onClick={() => handleAnswer('odd')}
            size="lg"
            className={`px-8 py-4 text-xl rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 ${
              userAnswer === 'odd' 
                ? 'bg-orange-600 hover:bg-orange-700' 
                : 'bg-orange-500 hover:bg-orange-600'
            } text-white`}
          >
            🎯 IMPAR
          </Button>
        </div>

        {/* Analysis Help */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            💡 Sfat: Pentru a afla dacă un număr este par sau impar, uită-te la ultima cifră!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Level2Game;
