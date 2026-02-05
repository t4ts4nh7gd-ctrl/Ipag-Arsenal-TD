import React from 'react';
import { CanvasItem } from '../types';

interface CanvasCardProps {
  data: CanvasItem;
  className?: string;
  onClick: () => void;
  isActive: boolean;
}

export const CanvasCard: React.FC<CanvasCardProps> = ({ data, className, onClick, isActive }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative p-4 border border-slate-200 bg-white shadow-sm transition-all duration-300 cursor-pointer overflow-hidden group hover:shadow-md ${className} ${isActive ? 'ring-2 ring-red-800 ring-offset-2' : ''}`}
    >
      <div className={`absolute top-0 left-0 w-1 h-full ${data.color}`}></div>
      
      <div className="flex items-center gap-2 mb-3">
        <div className={`text-${data.color.replace('bg-', '')} text-xl`}>
          {data.icon}
        </div>
        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">{data.title}</h3>
      </div>

      <ul className="space-y-2">
        {data.items.slice(0, 4).map((item, idx) => (
          <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
            <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
            {item}
          </li>
        ))}
        {data.items.length > 4 && (
          <li className="text-xs text-slate-400 italic">... et {data.items.length - 4} autres</li>
        )}
      </ul>
      
      {isActive && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm p-4 z-10 flex flex-col justify-center animate-in fade-in duration-200">
          <h4 className="font-bold text-red-900 mb-2">{data.title}</h4>
          <p className="text-sm text-slate-700 leading-relaxed">{data.description}</p>
          <div className="mt-4 text-xs text-slate-500 text-right">Cliquez pour fermer</div>
        </div>
      )}
    </div>
  );
};