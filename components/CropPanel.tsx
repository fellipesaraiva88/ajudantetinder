/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

interface CropPanelProps {
  onApplyCrop: () => void;
  onSetAspect: (aspect: number | undefined) => void;
  isLoading: boolean;
  isCropping: boolean;
}

type AspectRatio = 'Livre' | '1:1' | '16:9';

const CropPanel: React.FC<CropPanelProps> = ({ onApplyCrop, onSetAspect, isLoading, isCropping }) => {
  const [activeAspect, setActiveAspect] = useState<AspectRatio>('Livre');
  
  const handleAspectChange = (aspect: AspectRatio, value: number | undefined) => {
    setActiveAspect(aspect);
    onSetAspect(value);
  }

  const aspects: { name: AspectRatio, value: number | undefined }[] = [
    { name: 'Livre', value: undefined },
    { name: '1:1', value: 1 / 1 },
    { name: '16:9', value: 16 / 9 },
  ];

  return (
    <div className="w-full bg-white/80 border border-gray-200/90 rounded-xl p-6 flex flex-col items-center gap-4 animate-fade-in backdrop-blur-md shadow-sm">
       <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800">Recortar Imagem</h3>
        <p className="text-sm text-gray-500 mt-1">Clique e arraste na imagem para selecionar a área.</p>
      </div>
      
      <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full">
        {aspects.map(({ name, value }) => (
          <button
            key={name}
            onClick={() => handleAspectChange(name, value)}
            disabled={isLoading}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 ${
              activeAspect === name 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'bg-transparent hover:bg-white/50 text-gray-600'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <button
        onClick={onApplyCrop}
        disabled={isLoading || !isCropping}
        className="w-full max-w-xs mt-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base disabled:bg-blue-300 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
      >
        Aplicar Recorte
      </button>
    </div>
  );
};

export default CropPanel;
