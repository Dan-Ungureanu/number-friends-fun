import React from 'react';
import { NumberItem } from '../types/game';
import { getTranslation } from '../data/translations';
import DraggableItem from './DraggableItem';

interface DropTrayProps {
  id: string;
  title: string;
  items: NumberItem[];
  onItemClick: (item: NumberItem) => void;
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
  return (
    <div className="min-h-48 p-6 rounded-xl border-4 border-dashed border-gray-300 bg-gray-50 hover:border-gray-400">
      <h3 className="text-xl font-bold text-center mb-4 text-gray-700">
        {getTranslation(title, language)}
      </h3>
      
      <div className="flex flex-wrap gap-4 justify-center">
        {items.map((item, index) => (
          <DraggableItem
            key={`${item.id}-${index}`}
            item={item}
            onDoubleClick={() => onItemClick(item)}
          />
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
