import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from './DraggableItem';
import DropTray from './DropTray';
import { Button } from '@/components/ui/button';
import { getTranslation, happyAnimals } from '../data/translations';
import { NumberItem } from '../types/game';

interface Level1GameProps {
  language: string;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}

const Level1Game: React.FC<Level1GameProps> = ({
  language,
  onCorrectAnswer,
  onWrongAnswer
}) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [items, setItems] = useState<NumberItem[]>([]);
  const [tray1Items, setTray1Items] = useState<NumberItem[]>([]);
  const [tray2Items, setTray2Items] = useState<NumberItem[]>([]);
  const [showValidation, setShowValidation] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [validationType, setValidationType] = useState('info');

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
  const shapes = ['circle', 'square', 'triangle'];

  useEffect(() => {
    generateNewNumber();
  }, []);

  const generateNewNumber = () => {
    const newNumber = Math.floor(Math.random() * 11); // 0-10
    const items: NumberItem[] = Array.from({ length: newNumber }, (_, index) => ({
      id: `item-${index}`,
      value: newNumber,
      shape: 'animal',
      color: 'happy',
      isInTray: false,
      animal: happyAnimals[Math.floor(Math.random() * happyAnimals.length)],
      x: 0,
      y: 0
    }));
    
    setCurrentNumber(newNumber);
    setItems(items);
    setTray1Items([]);
    setTray2Items([]);
    setShowValidation(false);
    setValidationMessage('');
    setValidationType('info');
  };

  const handleItemClick = (item: NumberItem) => {
    // Verificăm dacă elementul este în lista de elemente disponibile
    const itemIndex = items.findIndex(i => i.id === item.id);
    if (itemIndex === -1) return;

    // Determinăm în care grupă să punem elementul
    // Dacă numărul este impar și este ultimul element disponibil, îl punem în grupa 2
    const isLastItem = items.length === 1;
    const isOddNumber = currentNumber % 2 === 1;
    
    const targetGroup = (isLastItem && isOddNumber) ? 'tray2' : 'tray1';
    
    // Actualizăm starea
    setItems(prev => prev.filter(i => i.id !== item.id));
    
    if (targetGroup === 'tray1') {
      setTray1Items(prev => [...prev, { ...item, isInTray: true, trayId: 'tray1' }]);
    } else {
      setTray2Items(prev => [...prev, { ...item, isInTray: true, trayId: 'tray2' }]);
    }

    // Verificăm dacă toate elementele au fost distribuite
    if (items.length === 1) {
      setShowValidation(true);
      setValidationMessage(getTranslation('single_item_message', language));
      setValidationType('info');
    }
  };

  const checkAnswer = () => {
    const isEven = currentNumber % 2 === 0;
    const canFormPairs = Math.abs(tray1Items.length - tray2Items.length) <= 1;
    
    if (isEven && tray1Items.length === tray2Items.length) {
      onCorrectAnswer();
      setTimeout(generateNewNumber, 2000);
    } else if (!isEven && canFormPairs && Math.abs(tray1Items.length - tray2Items.length) === 1) {
      onCorrectAnswer();
      setTimeout(generateNewNumber, 2000);
    } else {
      onWrongAnswer();
    }
  };

  // Calculate pairs for each tray
  const tray1Pairs = Math.floor(tray1Items.length / 2);
  const tray2Pairs = Math.floor(tray2Items.length / 2);
  const totalPairs = tray1Pairs + tray2Pairs;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Game Instructions */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl">
          <h2 className="text-3xl font-bold mb-2">
            {getTranslation('game_title', language)} - {currentNumber}
          </h2>
          <p className="text-lg opacity-90">
            {getTranslation('drag_items', language)}
          </p>
          {currentNumber % 2 === 1 ? (
            <p className="text-sm mt-2 text-orange-200">
              {getTranslation('odd_number_message', language)}
            </p>
          ) : (
            <p className="text-sm mt-2 text-green-200">
              {getTranslation('even_number_message', language)}
            </p>
          )}
          
          {/* Pairs Counter */}
          {totalPairs > 0 && (
            <div className="mt-4 bg-white/20 rounded-lg p-3">
              <div className="text-lg font-bold">
                🎯 {totalPairs === 1 ? 'O pereche formată' : `${totalPairs} perechi formate`}
              </div>
              {tray1Pairs > 0 && (
                <div className="text-sm opacity-90">
                  Grupa 1: {tray1Pairs} {tray1Pairs === 1 ? 'pereche' : 'perechi'}
                </div>
              )}
              {tray2Pairs > 0 && (
                <div className="text-sm opacity-90">
                  Grupa 2: {tray2Pairs} {tray2Pairs === 1 ? 'pereche' : 'perechi'}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Available Items */}
        {items.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-center mb-4 text-gray-700">
              Elemente disponibile ({items.length})
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {items.map((item, index) => (
                <DraggableItem
                  key={`${item.id}-${index}`}
                  item={item}
                  onDoubleClick={() => handleItemClick(item)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Drop Trays */}
        <div className="grid md:grid-cols-2 gap-8">
          <DropTray
            id="tray1"
            title="group_1"
            items={tray1Items}
            onItemClick={handleItemClick}
            language={language}
            pairsCount={tray1Pairs}
          />

          <DropTray
            id="tray2"
            title="group_2"
            items={tray2Items}
            onItemClick={handleItemClick}
            language={language}
            pairsCount={tray2Pairs}
            showSingleItemMessage={currentNumber % 2 === 1 && tray2Items.length === 1}
          />
        </div>

        {/* Validation */}
        {showValidation && (
          <div className="text-center animate-fade-in space-y-4">
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => {
                  const isEven = currentNumber % 2 === 0;
                  if (isEven) {
                    onCorrectAnswer();
                    setTimeout(generateNewNumber, 2000);
                  } else {
                    onWrongAnswer();
                  }
                }}
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white text-xl px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Par
              </Button>

              <Button
                onClick={() => {
                  const isEven = currentNumber % 2 === 0;
                  if (!isEven) {
                    onCorrectAnswer();
                    setTimeout(generateNewNumber, 2000);
                  } else {
                    onWrongAnswer();
                  }
                }}
                size="lg"
                className="bg-purple-500 hover:bg-purple-600 text-white text-xl px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Impar
              </Button>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default Level1Game;
