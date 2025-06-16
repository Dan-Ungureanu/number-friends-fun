
import React from 'react';
import { useDrag } from 'react-dnd';

interface DraggableItemProps {
  id: string;
  value: number;
  shape: string;
  color: string;
  isInTray: boolean;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  value,
  shape,
  color,
  isInTray
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'item',
    item: { id, value },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const getShapeElement = () => {
    const baseClasses = `w-12 h-12 flex items-center justify-center text-white font-bold text-lg transition-all duration-200 ${
      isDragging ? 'scale-110 rotate-3' : 'hover:scale-105'
    }`;

    switch (shape) {
      case 'circle':
        return (
          <div className={`${baseClasses} rounded-full`} style={{ backgroundColor: color }}>
            {value}
          </div>
        );
      case 'square':
        return (
          <div className={`${baseClasses} rounded-lg`} style={{ backgroundColor: color }}>
            {value}
          </div>
        );
      case 'triangle':
        return (
          <div 
            className={`${baseClasses} clip-triangle`} 
            style={{ backgroundColor: color }}
          >
            {value}
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} rounded-full`} style={{ backgroundColor: color }}>
            {value}
          </div>
        );
    }
  };

  return (
    <div
      ref={drag}
      className={`cursor-move transform transition-all duration-300 ${
        isDragging ? 'opacity-50 scale-110' : 'opacity-100'
      } ${isInTray ? '' : 'hover:shadow-lg'}`}
    >
      {getShapeElement()}
    </div>
  );
};

export default DraggableItem;
