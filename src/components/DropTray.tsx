import React from 'react';
import { useDrop } from 'react-dnd';
import { NumberItem } from '../types/game';
import { getTranslation } from '../data/translations';
import DraggableItem from './DraggableItem';

interface DropTrayProps {
  id: string;
  title: string;
  items: NumberItem[];
  onItemClick: (item: NumberItem, targetGroup?: 'tray1' | 'tray2') => void;
  language: string;
  pairsCount?: number;
  showSingleItemMessage?: boolean;
}

const DropTray: React.FC<DropTrayProps> = ({
  id,
  title,
  items,
  onItemClick,
  language,
  pairsCount = 0,
  showSingleItemMessage = false
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item: NumberItem) => onItemClick(item, id as 'tray1' | 'tray2'),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  // Grupăm elementele în perechi
  const pairedItems = items.reduce((acc, item, index) => {
    if (index % 2 === 0) {
      acc.push([item]);
    } else {
      acc[acc.length - 1].push(item);
    }
    return acc;
  }, [] as NumberItem[][]);

  return (
    <div 
      ref={drop}
      className={`min-h-48 p-6 rounded-xl border-4 border-dashed ${
        isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'
      } hover:border-gray-400 transition-colors duration-200`}
    >
      <h3 className="text-xl font-bold text-center mb-4 text-gray-700">
        {getTranslation(title, language)}
      </h3>
      
      <div className="flex flex-col gap-4">
        {pairedItems.map((pair, pairIndex) => (
          <div key={pairIndex} className="flex justify-center gap-4">
            {pair.map((item, itemIndex) => (
              <DraggableItem
                key={`${item.id}-${itemIndex}`}
                item={item}
                onDoubleClick={() => onItemClick(item)}
              />
            ))}
            {/* Adăugăm un spațiu gol pentru perechile incomplete */}
            {pair.length === 1 && (
              <div className="w-16 h-16" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center space-y-2">
        {items.length > 0 && (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {items.length} {items.length === 1 ? 'element' : 'elemente'}
          </span>
        )}
        
        {pairsCount > 0 && (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
            🎯 {pairsCount} {pairsCount === 1 ? 'pereche' : 'perechi'}
          </div>
        )}

        {showSingleItemMessage && (
          <div className="text-orange-600 text-sm font-medium">
            {getTranslation('single_item_message', language)}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropTray;
