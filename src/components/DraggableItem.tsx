import React from 'react';
import { NumberItem } from '../types/game';

interface DraggableItemProps {
  item: NumberItem;
  onDoubleClick: () => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, onDoubleClick }) => {
  return (
    <div
      onDoubleClick={onDoubleClick}
      className="cursor-pointer transform hover:scale-110 transition-transform duration-200"
    >
      <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg border-2 border-gray-200 hover:border-blue-400">
        <span className="text-3xl" role="img" aria-label="animal">
          {item.animal}
        </span>
      </div>
    </div>
  );
};

export default DraggableItem;