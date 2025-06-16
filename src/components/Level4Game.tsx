
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Level4GameProps {
  language: string;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}

const Level4Game: React.FC<Level4GameProps> = ({
  language,
  onCorrectAnswer,
  onWrongAnswer
}) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<'even' | 'odd' | null>(null);
  const [selectedQuadrant, setSelectedQuadrant] = useState<string | null>(null);

  useEffect(() => {
    generateNewNumber();
  }, []);

  const generateNewNumber = () => {
    const num = Math.floor(Math.random() * 999000000) + 1000; // 1000-999999999
    setCurrentNumber(num);
    setUserAnswer(null);
    setSelectedQuadrant(null);
  };

  const handleQuadrantSelect = (quadrant: string, type: 'even' | 'odd') => {
    setSelectedQuadrant(quadrant);
    setUserAnswer(type);
    
    const isEven = currentNumber % 2 === 0;
    const correct = (isEven && type === 'even') || (!isEven && type === 'odd');
    
    if (correct) {
      onCorrectAnswer();
      setTimeout(generateNewNumber, 2000);
    } else {
      onWrongAnswer();
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('ro-RO');
  };

  const getNumberClasses = (num: number) => {
    const str = num.toString();
    const length = str.length;
    
    let millions = 0;
    let thousands = 0;
    let units = 0;

    if (length > 6) {
      millions = Math.floor(num / 1000000);
      thousands = Math.floor((num % 1000000) / 1000);
      units = num % 1000;
    } else if (length > 3) {
      thousands = Math.floor(num / 1000);
      units = num % 1000;
    } else {
      units = num;
    }

    return { millions, thousands, units };
  };

  const { millions, thousands, units } = getNumberClasses(currentNumber);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Game Instructions */}
      <div className="text-center bg-gradient-to-r from-red-500 to-purple-600 text-white p-6 rounded-xl">
        <h2 className="text-3xl font-bold mb-2">
          Nivel 4 - Pro - {formatNumber(currentNumber)}
        </h2>
        <p className="text-lg opacity-90">
          Clasifică numerele mari în cadranele Par/Impar folosind analiza claselor
        </p>
      </div>

      {/* Number Analysis Table */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Tabelul Claselor pentru {formatNumber(currentNumber)}
        </h3>

        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border-2 border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-2 border-gray-300 p-3 text-sm font-bold text-purple-600">
                  CLASA MILIOANELOR
                </th>
                <th className="border-2 border-gray-300 p-3 text-sm font-bold text-blue-600">
                  CLASA MIILOR
                </th>
                <th className="border-2 border-gray-300 p-3 text-sm font-bold text-green-600">
                  CLASA UNITĂȚILOR
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-gray-300 p-4">
                  <div className="text-3xl font-bold text-purple-600 bg-purple-50 p-4 rounded-lg">
                    {millions > 0 ? formatNumber(millions) : '0'}
                  </div>
                </td>
                <td className="border-2 border-gray-300 p-4">
                  <div className="text-3xl font-bold text-blue-600 bg-blue-50 p-4 rounded-lg">
                    {thousands > 0 ? formatNumber(thousands) : '0'}
                  </div>
                </td>
                <td className="border-2 border-gray-300 p-4">
                  <div className="text-3xl font-bold text-green-600 bg-green-50 p-4 rounded-lg border-4 border-green-300">
                    {formatNumber(units)}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Analysis Helper */}
        <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200 mb-8">
          <p className="text-center text-yellow-800 font-bold">
            🔍 Ultima cifră este <span className="text-2xl text-red-600">{currentNumber % 10}</span> 
            - aceasta determină paritatea întregului număr!
          </p>
        </div>
      </div>

      {/* Classification Quadrants */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Even Quadrant */}
        <div 
          className={`p-8 rounded-xl border-4 cursor-pointer transition-all duration-300 ${
            selectedQuadrant === 'even' 
              ? 'border-blue-500 bg-blue-100 scale-105 shadow-xl' 
              : 'border-blue-300 bg-blue-50 hover:border-blue-400 hover:bg-blue-100'
          }`}
          onClick={() => handleQuadrantSelect('even', 'even')}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-3xl font-bold text-blue-600 mb-4">PAR</h3>
            <div className="space-y-2 text-blue-700">
              <p className="font-semibold">Ultima cifră:</p>
              <div className="flex justify-center flex-wrap gap-2">
                {[0, 2, 4, 6, 8].map(digit => (
                  <span key={digit} className="bg-blue-200 px-3 py-1 rounded-full text-lg font-bold">
                    {digit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Odd Quadrant */}
        <div 
          className={`p-8 rounded-xl border-4 cursor-pointer transition-all duration-300 ${
            selectedQuadrant === 'odd' 
              ? 'border-orange-500 bg-orange-100 scale-105 shadow-xl' 
              : 'border-orange-300 bg-orange-50 hover:border-orange-400 hover:bg-orange-100'
          }`}
          onClick={() => handleQuadrantSelect('odd', 'odd')}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-3xl font-bold text-orange-600 mb-4">IMPAR</h3>
            <div className="space-y-2 text-orange-700">
              <p className="font-semibold">Ultima cifră:</p>
              <div className="flex justify-center flex-wrap gap-2">
                {[1, 3, 5, 7, 9].map(digit => (
                  <span key={digit} className="bg-orange-200 px-3 py-1 rounded-full text-lg font-bold">
                    {digit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level4Game;
