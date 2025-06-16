
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Level3GameProps {
  language: string;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}

const Level3Game: React.FC<Level3GameProps> = ({
  language,
  onCorrectAnswer,
  onWrongAnswer
}) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [hundreds, setHundreds] = useState(0);
  const [tens, setTens] = useState(0);
  const [units, setUnits] = useState(0);
  const [userAnswer, setUserAnswer] = useState<'even' | 'odd' | null>(null);

  useEffect(() => {
    generateNewNumber();
  }, []);

  const generateNewNumber = () => {
    const num = Math.floor(Math.random() * 900) + 100; // 100-999
    setCurrentNumber(num);
    setHundreds(Math.floor(num / 100));
    setTens(Math.floor((num % 100) / 10));
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

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Game Instructions */}
      <div className="text-center bg-gradient-to-r from-purple-500 to-red-600 text-white p-6 rounded-xl">
        <h2 className="text-3xl font-bold mb-2">
          Nivel 3 - Avansat - {currentNumber}
        </h2>
        <p className="text-lg opacity-90">
          Analizează clasa și ordinele numerelor pentru a determina paritatea
        </p>
      </div>

      {/* Number Table */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Tabelul Claselor și Ordinelor
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-2 border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-2 border-gray-300 p-4 text-lg font-bold text-purple-600">
                  CLASA UNITĂȚILOR
                </th>
              </tr>
              <tr className="bg-gray-50">
                <td className="border-2 border-gray-300 p-2">
                  <div className="flex justify-center space-x-4">
                    <div className="text-sm font-semibold text-blue-600">Sute</div>
                    <div className="text-sm font-semibold text-green-600">Zeci</div>
                    <div className="text-sm font-semibold text-red-600">Unități</div>
                  </div>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-gray-300 p-4">
                  <div className="flex justify-center space-x-8">
                    <div className="text-4xl font-bold text-blue-600 bg-blue-50 p-4 rounded-lg min-w-20">
                      {hundreds}
                    </div>
                    <div className="text-4xl font-bold text-green-600 bg-green-50 p-4 rounded-lg min-w-20">
                      {tens}
                    </div>
                    <div className="text-4xl font-bold text-red-600 bg-red-50 p-4 rounded-lg min-w-20 border-4 border-red-300">
                      {units}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Analysis */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-lg border-2 border-yellow-200">
          <h4 className="text-lg font-bold text-center mb-4 text-yellow-800">
            🔍 Analiza Parității
          </h4>
          <div className="text-center space-y-2">
            <p className="text-gray-700">
              Numărul <span className="font-bold text-2xl">{currentNumber}</span> se descompune în:
            </p>
            <p className="text-lg">
              <span className="text-blue-600 font-bold">{hundreds}</span> sute + 
              <span className="text-green-600 font-bold"> {tens}</span> zeci + 
              <span className="text-red-600 font-bold"> {units}</span> unități
            </p>
            <div className="mt-4 p-3 bg-red-100 rounded-lg border-2 border-red-300">
              <p className="text-red-800 font-bold">
                🎯 Pentru a determina paritatea, analizează doar ultima cifră: {units}
              </p>
            </div>
          </div>
        </div>

        {/* Answer Buttons */}
        <div className="flex justify-center space-x-6 mt-8">
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
      </div>
    </div>
  );
};

export default Level3Game;
