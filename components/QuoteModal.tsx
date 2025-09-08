/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Procedure } from '../procedures';
import { CloseIcon } from './icons';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    procedure: Procedure;
    imageBeforeUrl: string;
    imageAfterUrl: string;
    description: string;
  };
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const { procedure, imageBeforeUrl, imageAfterUrl, description } = data;

  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') return price;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };
  
  const handleGenerateReport = () => {
    const reportHtml = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Relatório de Simulação Estética - ${procedure.nome}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body { font-family: 'Inter', sans-serif; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body class="bg-gray-100">
        <div class="container mx-auto max-w-4xl p-8 bg-white shadow-lg my-8">
          <header class="text-center border-b pb-4 mb-8">
            <h1 class="text-3xl font-bold text-gray-800">Aesthetix Vision</h1>
            <p class="text-md text-gray-500">Relatório de Simulação Estética</p>
          </header>
          <main>
            <h2 class="text-2xl font-semibold text-gray-700 mb-6 text-center">Procedimento: ${procedure.nome}</h2>
            <div class="grid grid-cols-2 gap-8 mb-8">
              <div class="text-center">
                <h3 class="text-lg font-semibold text-gray-600 mb-2">Antes</h3>
                <img src="${imageBeforeUrl}" alt="Antes" class="rounded-lg shadow-md w-full border">
              </div>
              <div class="text-center">
                <h3 class="text-lg font-semibold text-blue-600 mb-2">Resultado Simulado</h3>
                <img src="${imageAfterUrl}" alt="Depois" class="rounded-lg shadow-md w-full border border-blue-500">
              </div>
            </div>
            <div class="bg-gray-50 rounded-lg p-6 border">
              <h3 class="text-xl font-semibold text-gray-800 mb-3">Detalhes da Simulação</h3>
              <p class="text-gray-600 mb-4">${description}</p>
              <div class="mt-4 pt-4 border-t-2 border-dashed">
                <p class="text-2xl font-bold text-right text-gray-800">Investimento Estimado: <span class="text-blue-600">${formatPrice(procedure.preco)}</span></p>
                <p class="text-xs text-right text-gray-500 mt-1">*Este é um valor de referência. A confirmação ocorrerá após avaliação profissional.</p>
              </div>
            </div>
            <div class="mt-12">
              <h3 class="text-lg font-semibold text-gray-800">Anotações do Profissional:</h3>
              <div class="mt-2 w-full h-32 border-b-2 border-gray-300"></div>
            </div>
          </main>
          <footer class="text-center mt-12 pt-4 border-t">
            <p class="text-sm text-gray-500">Relatório gerado em ${new Date().toLocaleDateString('pt-BR')}. Simulação via Aesthetix Vision.</p>
          </footer>
        </div>
        <div class="text-center my-8 no-print">
          <button onclick="window.print()" class="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg">Imprimir Relatório</button>
        </div>
      </body>
      </html>
    `;
    const reportWindow = window.open('', '_blank');
    reportWindow?.document.write(reportHtml);
    reportWindow?.document.close();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
        
        {/* Image Comparison Section */}
        <div className="w-full md:w-2/3 p-6 lg:p-8 flex flex-col">
           <h2 className="text-2xl font-bold text-gray-800 mb-4">Prévia do Resultado</h2>
           <div className="grid grid-cols-2 gap-4 flex-grow">
              <div className="flex flex-col">
                <h3 className="text-center font-semibold text-gray-500 mb-2 text-sm">Antes</h3>
                <img src={imageBeforeUrl} alt="Antes" className="rounded-lg shadow-sm w-full object-cover h-full border" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-center font-bold text-blue-600 mb-2 text-sm">Resultado Simulado</h3>
                <img src={imageAfterUrl} alt="Depois" className="rounded-lg shadow-md w-full object-cover h-full border-2 border-blue-500" />
              </div>
           </div>
        </div>

        {/* Details and Quote Section */}
        <div className="w-full md:w-1/3 bg-gray-50/70 border-l border-gray-200/80 flex flex-col">
          <div className="p-6 lg:p-8 flex-grow overflow-y-auto">
              <h3 className="text-2xl font-bold text-gray-900">{procedure.nome}</h3>
              <p className="text-md text-gray-600 mt-2 mb-6">{description}</p>
              
              <div className="mt-4 pt-4 border-t border-dashed border-gray-300">
                <p className="text-sm text-gray-500">Investimento a partir de</p>
                <p className="text-4xl font-extrabold text-blue-600">{formatPrice(procedure.preco)}</p>
                <p className="text-xs text-gray-500 mt-1">*Valor de referência, sujeito a avaliação.</p>
              </div>
          </div>
          <footer className="p-6 bg-gray-100/80 border-t border-gray-200/80 flex flex-col gap-3">
              <button 
                onClick={() => alert('Em breve: Link para agendamento!')}
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:shadow-lg transition-all"
              >
                Agendar Consulta
              </button>
               <button 
                onClick={handleGenerateReport}
                className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2.5 px-6 rounded-full hover:bg-gray-100 hover:border-gray-400 transition-all"
              >
                Gerar Relatório
              </button>
          </footer>
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors bg-white/50 rounded-full p-1.5">
            <CloseIcon className="w-6 h-6" />
        </button>

      </div>
    </div>
  );
};

export default QuoteModal;
