/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { procedures, Procedure } from '../procedures';
import { SparklesIcon } from './icons';

interface DentalPanelProps {
  onSimulate: (procedure: Procedure) => void;
  isLoading: boolean;
}

const DentalPanel: React.FC<DentalPanelProps> = ({ onSimulate, isLoading }) => {
  const dentalPresets = procedures.filter(p => p.tipo === 'dental');

  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') return price;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="w-full bg-white/80 border border-gray-200/90 rounded-xl p-6 flex flex-col gap-4 animate-fade-in backdrop-blur-md shadow-sm">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800">Design de Sorriso</h3>
        <p className="text-sm text-gray-500 mt-1">Selecione para simular lentes de porcelana ou clareamento.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {dentalPresets.map(preset => (
          <button
            key={preset.nome}
            onClick={() => onSimulate(preset)}
            disabled={isLoading}
            className={`w-full text-left bg-white border border-gray-200 text-gray-800 p-4 rounded-lg transition-all duration-200 ease-in-out hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between group`}
          >
            <div>
              <p className="font-semibold group-hover:text-blue-600 transition-colors">{preset.nome}</p>
              <p className="text-sm font-normal text-gray-500">A partir de {formatPrice(preset.preco)}</p>
            </div>
            <div className="bg-gray-100 text-gray-400 rounded-full p-2 transition-all duration-300 group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110">
                <SparklesIcon className="w-5 h-5"/>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DentalPanel;
