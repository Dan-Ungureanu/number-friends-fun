
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from './DraggableItem';
import DropTray from './DropTray';
import { Button } from '@/components/ui/button';
import { getTranslation } from '../data/translations';
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

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
  const shapes = ['circle', 'square', 'triangle'];

  useEffect(() => {
    generateNewNumber();
  }, []);

  const generateNewNumber = () => {
    const num = Math.floor(Math.random() * 11); // 0-10
    setCurrentNumber(num);
    
    // Create items for the number
    const newItems: NumberItem[] = [];
    for (let i = 0; i < num; i++) {
      newItems.push({
        id: `item-${i}`,
        value: i + 1,
        x: 0,
        y: 0,
        isInTray: false,
        shape: shapes[i % shapes.length],
        color: colors[i % colors.length]
      });
    }
    
    setItems(newItems);
    setTray1Items([]);
    setTray2Items([]);
    setShowValidation(false);
  };

  const handleDrop = (item: any, trayId: string) => {
    const itemToMove = items.find(i => i.id === item.id) || 
                      tray1Items.find(i => i.id === item.id) || 
                      tray2Items.find(i => i.id === item.id);
    
    if (!itemToMove) return;

    // Remove from current location
    setItems(prev => prev.filter(i => i.id !== item.id));
    setTray1Items(prev => prev.filter(i => i.id !== item.id));
    setTray2Items(prev => prev.filter(i => i.id !== item.id));

    // Add to new tray
    const updatedItem = { ...itemToMove, isInTray: true, trayId };
    if (trayId === 'tray1') {
      setTray1Items(prev => [...prev, updatedItem]);
    } else {
      setTray2Items(prev => [...prev, updatedItem]);
    }

    // Check if all items are distributed
    setTimeout(() => {
      if (items.filter(i => i.id !== item.id).length === 0) {
        setShowValidation(true);
      }
    }, 100);
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

  const renderItem = (item: NumberItem, index: number) => (
    <DraggableItem
      key={`${item.id}-${index}`}
      id={item.id}
      value={item.value}
      shape={item.shape || 'circle'}
      color={item.color || '#FF6B6B'}
      isInTray={item.isInTray}
    />
  );

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
        </div>

        {/* Available Items */}
        {items.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-center mb-4 text-gray-700">
              Elemente disponibile
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {items.map((item, index) => renderItem(item, index))}
            </div>
          </div>
        )}

        {/* Drop Trays */}
        <div className="grid md:grid-cols-2 gap-8">
          <DropTray
            id="tray1"
            title="group_1"
            items={tray1Items}
            onDrop={handleDrop}
            language={language}
          />

          <DropTray
            id="tray2"
            title="group_2"
            items={tray2Items}
            onDrop={handleDrop}
            language={language}
          />
        </div>

        {/* Validation */}
        {showValidation && (
          <div className="text-center animate-fade-in">
            <Button
              onClick={checkAnswer}
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white text-xl px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              ✓ Verifică răspunsul
            </Button>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default Level1Game;
