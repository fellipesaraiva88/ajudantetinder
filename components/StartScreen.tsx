/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { CameraIcon, TinderFlameIcon } from './icons';
import Spinner from './Spinner';

interface StartScreenProps {
  onImageSelect: (file: File) => void;
}

const PRESET_IMAGE = {
    name: 'Homem Sorrindo',
    url: 'https://st4.depositphotos.com/23658156/29521/i/450/depositphotos_295218872-stock-photo-expression-asian-toothless-funny-guy.jpg',
    filename: 'preset-guy-1.jpg'
};


const StartScreen: React.FC<StartScreenProps> = ({ onImageSelect }) => {
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePresetClick = async () => {
    if (loadingImage) return;
    setLoadingImage(true);
    setError(null);
    
    const { url, filename } = PRESET_IMAGE;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) {
            throw new Error(`Falha ao buscar imagem via proxy: ${response.statusText}`);
        }
        const blob = await response.blob();
        
        const fileExtension = filename.split('.').pop()?.toLowerCase();
        let mimeType = blob.type;
        if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'jfif') {
            mimeType = 'image/jpeg';
        } else if (fileExtension === 'png') {
            mimeType = 'image/png';
        }

        const file = new File([blob], filename, { type: mimeType });
        onImageSelect(file);
    } catch (e) {
        console.error("Error fetching preset image:", e);
        setError("Não foi possível carregar a imagem de exemplo. Tente enviar sua própria foto.");
        setLoadingImage(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      onImageSelect(file);
    }
  };


  return (
    <div className="w-full max-w-4xl mx-auto text-center p-8 transition-all duration-300">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <TinderFlameIcon className="w-16 h-16 text-pink-500 mb-2" />
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Nenhuma mulher quer um cara <span className="text-tinder-gradient">feio e pobre</span>.
        </h1>
        <p className="max-w-2xl text-lg text-gray-500 md:text-xl">
          Vamos dar um jeito nisso. Escolha uma opção para começar a transformação.
        </p>
        {error && <p className="text-red-500 font-semibold mt-4">{error}</p>}
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
            {/* Option 1: Use Preset */}
            <div className="flex flex-col items-center">
                <h2 className="text-lg font-semibold text-gray-600 mb-4">Opção 1: Transforme o Exemplo</h2>
                <div className="relative group w-full">
                    <button
                        onClick={handlePresetClick}
                        disabled={loadingImage}
                        className="w-full h-80 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-wait"
                    >
                        <img src={PRESET_IMAGE.url} alt={PRESET_IMAGE.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-end justify-center p-4">
                            <span className="text-white text-lg font-bold drop-shadow-md">Transformar este Perfil</span>
                        </div>
                    </button>
                    {loadingImage && (
                        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
                            <Spinner />
                        </div>
                    )}
                </div>
            </div>

            {/* Option 2: Upload Own Photo */}
             <div className="flex flex-col items-center">
                <h2 className="text-lg font-semibold text-gray-600 mb-4">Opção 2: Envie Sua Foto</h2>
                 <label className="w-full h-80 cursor-pointer bg-white border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center transition-all duration-300 hover:border-pink-400 hover:bg-pink-50 hover:shadow-lg">
                    <div className="text-center">
                        <CameraIcon className="w-12 h-12 mx-auto text-gray-400" />
                        <span className="mt-2 block font-bold text-gray-700">Tirar ou Enviar Foto</span>
                        <span className="mt-1 block text-sm text-gray-500">Comece com sua própria imagem</span>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg, image/webp"
                        capture="user"
                        onChange={handleFileSelect}
                    />
                </label>
            </div>
        </div>

      </div>
    </div>
  );
};

export default StartScreen;