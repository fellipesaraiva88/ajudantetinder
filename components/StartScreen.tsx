/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { TinderFlameIcon } from './icons';
import Spinner from './Spinner';

interface StartScreenProps {
  onImageSelect: (file: File) => void;
}

const PRESET_IMAGES = [
    {
        name: 'Homem Sorrindo',
        url: 'https://st4.depositphotos.com/23658156/29521/i/450/depositphotos_295218872-stock-photo-expression-asian-toothless-funny-guy.jpg',
        filename: 'preset-guy-1.jpg'
    }
];


const StartScreen: React.FC<StartScreenProps> = ({ onImageSelect }) => {
  const [loadingImage, setLoadingImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageClick = async (url: string, filename: string) => {
    if (loadingImage) return;
    setLoadingImage(url);
    setError(null);
    
    // Use a CORS proxy to bypass browser restrictions on fetching cross-origin images.
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) {
            throw new Error(`Falha ao buscar imagem via proxy: ${response.statusText}`);
        }
        const blob = await response.blob();
        
        // Proxies can sometimes alter the MIME type, so we'll infer it from the filename.
        const fileExtension = filename.split('.').pop()?.toLowerCase();
        let mimeType = blob.type; // Use blob's type as a fallback.
        if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'jfif') {
            mimeType = 'image/jpeg';
        } else if (fileExtension === 'png') {
            mimeType = 'image/png';
        }

        const file = new File([blob], filename, { type: mimeType });
        onImageSelect(file);
    } catch (e) {
        console.error("Error fetching preset image:", e);
        setError("Não foi possível carregar a imagem. Verifique sua conexão ou tente novamente mais tarde.");
        setLoadingImage(null);
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
          Vamos dar um jeito nisso. Clique no perfil para começar a transformação.
        </p>
        {error && <p className="text-red-500 font-semibold mt-4">{error}</p>}
        <div className="mt-6 flex justify-center w-full max-w-md">
          {PRESET_IMAGES.map(({ name, url, filename }) => (
            <div key={url} className="relative group">
                <button
                    onClick={() => handleImageClick(url, filename)}
                    disabled={!!loadingImage}
                    className="w-full rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-wait"
                >
                    <img src={url} alt={name} className="w-full h-80 object-cover" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-end justify-center p-4">
                        <span className="text-white text-lg font-bold drop-shadow-md">Transformar este</span>
                    </div>
                </button>
                {loadingImage === url && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
                        <Spinner />
                    </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartScreen;