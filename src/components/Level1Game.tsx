
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
    console.log('Drop event:', { itemId: item.id, trayId });
    
    // Find the item in any of the three locations
    let foundItem: NumberItem | undefined;
    let sourceLocation: 'available' | 'tray1' | 'tray2' | null = null;
    
    // Check available items
    foundItem = items.find(i => i.id === item.id);
    if (foundItem) {
      sourceLocation = 'available';
    } else {
      // Check tray1
      foundItem = tray1Items.find(i => i.id === item.id);
      if (foundItem) {
        sourceLocation = 'tray1';
      } else {
        // Check tray2
        foundItem = tray2Items.find(i => i.id === item.id);
        if (foundItem) {
          sourceLocation = 'tray2';
        }
      }
    }

    if (!foundItem || !sourceLocation) {
      console.log('Item not found anywhere:', item.id);
      return;
    }

    console.log('Found item in:', sourceLocation, 'moving to:', trayId);

    // Remove from source location
    if (sourceLocation === 'available') {
      setItems(prev => prev.filter(i => i.id !== item.id));
    } else if (sourceLocation === 'tray1') {
      setTray1Items(prev => prev.filter(i => i.id !== item.id));
    } else if (sourceLocation === 'tray2') {
      setTray2Items(prev => prev.filter(i => i.id !== item.id));
    }

    // Add to target tray
    const updatedItem = { 
      ...foundItem, 
      isInTray: true, 
      trayId 
    };
    
    if (trayId === 'tray1') {
      setTray1Items(prev => [...prev, updatedItem]);
    } else if (trayId === 'tray2') {
      setTray2Items(prev => [...prev, updatedItem]);
    }

    // Check if all items are distributed
    setTimeout(() => {
      setItems(currentItems => {
        console.log('Remaining available items:', currentItems.length);
        if (currentItems.filter(i => i.id !== item.id).length === 0) {
          setShowValidation(true);
        }
        return currentItems;
      });
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
                  id={item.id}
                  value={item.value}
                  shape={item.shape || 'circle'}
                  color={item.color || '#FF6B6B'}
                  isInTray={item.isInTray}
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
            onDrop={handleDrop}
            language={language}
            pairsCount={tray1Pairs}
          />

          <DropTray
            id="tray2"
            title="group_2"
            items={tray2Items}
            onDrop={handleDrop}
            language={language}
            pairsCount={tray2Pairs}
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
