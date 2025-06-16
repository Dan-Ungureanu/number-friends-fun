
import React from 'react';
import { useDrop } from 'react-dnd';
import { getTranslation } from '../data/translations';
import DraggableItem from './DraggableItem';

interface DropTrayProps {
  id: string;
  title: string;
  items: any[];
  onDrop: (item: any, trayId: string) => void;
  language: string;
}

const DropTray: React.FC<DropTrayProps> = ({
  id,
  title,
  items,
  onDrop,
  language
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'item',
    drop: (item) => onDrop(item, id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`min-h-48 p-6 rounded-xl border-4 border-dashed transition-all duration-300 ${
        isOver 
          ? 'border-blue-400 bg-blue-50 scale-105' 
          : 'border-gray-300 bg-gray-50 hover:border-gray-400'
      }`}
    >
      <h3 className="text-xl font-bold text-center mb-4 text-gray-700">
        {getTranslation(title, language)}
      </h3>
      
      <div className="grid grid-cols-4 gap-3 justify-items-center">
        {items.map((item, index) => (
          <div key={`${item.id}-${index}`} className="animate-fade-in">
            <DraggableItem
              id={item.id}
              value={item.value}
              shape={item.shape}
              color={item.color}
              isInTray={item.isInTray}
            />
          </div>
        ))}
      </div>
      
      {items.length > 0 && (
        <div className="mt-4 text-center">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {items.length} {items.length === 1 ? 'element' : 'elemente'}
          </span>
        </div>
      )}
    </div>
  );
};

export default DropTray;
