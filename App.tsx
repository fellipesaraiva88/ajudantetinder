/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { runImageModification, ModificationRequest, generateTextFromImage } from './services/geminiService';
import Header from './components/Header';
import Spinner from './components/Spinner';
import JourneyUI from './components/JourneyUI';
import { UploadIcon, RevertIcon } from './components/icons';
import StartScreen from './components/StartScreen';

// Helper to convert a data URL string to a File object
const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',');
    if (arr.length < 2) throw new Error("Invalid data URL");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch || !mimeMatch[1]) throw new Error("Could not parse MIME type from data URL");

    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

export type JourneyStep = 'SMILE' | 'AURA' | 'FASHION' | 'PET' | 'BACKGROUND' | 'FINAL';

const LOADING_MESSAGES = [
    'Um instante, estamos preparando sua melhor versão...',
    'Lapidando cada pixel para brilhar...',
    'A IA está encontrando o seu ângulo mais irresistível...',
    'Criando um visual que vale o match...',
    'Quase lá! Seu novo perfil está chegando.',
];

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [journeyStep, setJourneyStep] = useState<JourneyStep>('SMILE');
  
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>(LOADING_MESSAGES[0]);
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  // State for final bonus features
  const [generatedBio, setGeneratedBio] = useState<string | null>(null);
  const [isBioLoading, setIsBioLoading] = useState(false);
  const [profileVibe, setProfileVibe] = useState<{ score: number; vibe: string; } | null>(null);
  const [isVibeLoading, setIsVibeLoading] = useState(false);
  const [icebreakers, setIcebreakers] = useState<string[] | null>(null);
  const [isIcebreakersLoading, setIsIcebreakersLoading] = useState(false);


  useEffect(() => {
    if (currentImage) {
      const url = URL.createObjectURL(currentImage);
      setCurrentImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setCurrentImageUrl(null);
    }
  }, [currentImage]);
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isLoading) {
        setLoadingMessage(LOADING_MESSAGES[0]);
        let i = 0;
        interval = setInterval(() => {
            i = (i + 1) % LOADING_MESSAGES.length;
            setLoadingMessage(LOADING_MESSAGES[i]);
        }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleImageUpload = useCallback((file: File) => {
    setError(null);
    setOriginalImage(file);
    setCurrentImage(file);
    setJourneyStep('SMILE');
    setShowWelcome(true);
    // Hide welcome message after a few seconds
    setTimeout(() => setShowWelcome(false), 4000);
  }, []);

  const handleGenerate = useCallback(async (type: ModificationRequest['type'], detail?: string) => {
    if (!currentImage) {
      setError('Nenhuma imagem carregada para editar.');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
        const { imageUrl } = await runImageModification(currentImage, { type, detail });
        const newImageFile = dataURLtoFile(imageUrl, `${type}-${Date.now()}.png`);
        setCurrentImage(newImageFile);

        // Advance to the next step
        if (journeyStep === 'SMILE') setJourneyStep('AURA');
        else if (journeyStep === 'AURA') setJourneyStep('FASHION');
        else if (journeyStep === 'FASHION') setJourneyStep('PET');
        else if (journeyStep === 'PET') setJourneyStep('BACKGROUND');
        else if (journeyStep === 'BACKGROUND') setJourneyStep('FINAL');

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
        setError(`Falha ao gerar a imagem. ${errorMessage}`);
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  }, [currentImage, journeyStep]);

  const handleSkip = useCallback(() => {
    if (journeyStep === 'SMILE') setJourneyStep('AURA');
    else if (journeyStep === 'AURA') setJourneyStep('FASHION');
    else if (journeyStep === 'FASHION') setJourneyStep('PET');
    else if (journeyStep === 'PET') setJourneyStep('BACKGROUND');
    else if (journeyStep === 'BACKGROUND') setJourneyStep('FINAL');
  }, [journeyStep]);
  
  const handleReset = useCallback(() => {
      setOriginalImage(null);
      setCurrentImage(null);
      setError(null);
      setJourneyStep('SMILE');
      setShowWelcome(false);
      setGeneratedBio(null);
      setProfileVibe(null);
      setIcebreakers(null);
  }, []);

  const handleRevert = useCallback(() => {
    if (originalImage) {
      setCurrentImage(originalImage);
      setJourneyStep('SMILE');
      setError(null);
      setGeneratedBio(null);
      setProfileVibe(null);
      setIcebreakers(null);
    }
  }, [originalImage]);
  
  const handleGenerateBio = useCallback(async () => {
    if (!currentImage) return;
    setIsBioLoading(true);
    setError(null);
    try {
        const { bio } = await generateTextFromImage(currentImage, 'bio');
        setGeneratedBio(bio);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
        setError(`Falha ao gerar a bio. ${errorMessage}`);
    } finally {
        setIsBioLoading(false);
    }
  }, [currentImage]);

  const handleGenerateVibe = useCallback(async () => {
    if (!currentImage || !generatedBio) return;
    setIsVibeLoading(true);
    setError(null);
    try {
        const { score, vibe } = await generateTextFromImage(currentImage, 'vibe', generatedBio);
        setProfileVibe({ score, vibe });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
        setError(`Falha ao gerar o Vibe Check. ${errorMessage}`);
    } finally {
        setIsVibeLoading(false);
    }
  }, [currentImage, generatedBio]);

  const handleGenerateIcebreakers = useCallback(async () => {
    if (!currentImage || !generatedBio) return;
    setIsIcebreakersLoading(true);
    setError(null);
    try {
        const { icebreakers } = await generateTextFromImage(currentImage, 'icebreakers', generatedBio);
        setIcebreakers(icebreakers);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
        setError(`Falha ao gerar os icebreakers. ${errorMessage}`);
    } finally {
        setIsIcebreakersLoading(false);
    }
  }, [currentImage, generatedBio]);


  const renderContent = () => {
    if (error) {
       return (
           <div className="text-center animate-fade-in bg-pink-50 border border-pink-200 p-8 rounded-lg max-w-2xl mx-auto flex flex-col items-center gap-4 shadow-lg">
            <h2 className="text-2xl font-bold text-pink-700">Oops, deu ruim!</h2>
            <p className="text-md text-pink-600">{error}</p>
            <button
                onClick={() => setError(null)}
                className="bg-tinder-gradient hover:opacity-90 text-white font-bold py-2 px-6 rounded-full text-md transition-opacity"
              >
                Tentar Novamente
            </button>
          </div>
        );
    }
    
    if (!currentImageUrl) {
      return <StartScreen onImageSelect={handleImageUpload} />;
    }
    
    return (
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 animate-fade-in">
        <div className="w-full max-w-xl lg:w-1/2 flex-shrink-0">
          <div className="relative w-full shadow-2xl rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              {isLoading && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center gap-4 animate-fade-in">
                      <Spinner />
                      <p className="text-gray-600 font-medium">{loadingMessage}</p>
                  </div>
              )}
               {showWelcome && (
                  <div className="absolute inset-0 bg-tinder-gradient opacity-90 z-20 flex items-center justify-center p-4">
                      <p className="text-white text-3xl font-extrabold text-center animate-fade-in drop-shadow-lg">PRONTO PARA VIRAR DESTAQUE NO TINDER? DEIXE A IA TRABALHAR.</p>
                  </div>
                )}
              <img
                  key={currentImageUrl}
                  src={currentImageUrl}
                  alt="Sua foto"
                  className={`w-full h-auto object-contain rounded-xl transition-all duration-300`}
              />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 w-full">
              <button 
                  onClick={handleRevert}
                  disabled={currentImage === originalImage || isLoading}
                  className="flex items-center justify-center text-center bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-100 hover:border-gray-400 active:scale-95 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  <RevertIcon className="w-4 h-4 mr-2" />
                  Voltar ao Original
              </button>
              <button 
                  onClick={handleReset}
                  className="flex items-center justify-center text-center bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-100 hover:border-gray-400 active:scale-95 text-sm"
              >
                  <UploadIcon className="w-4 h-4 mr-2" />
                  Carregar Nova Imagem
              </button>
          </div>
        </div>

        <div className="w-full max-w-xl lg:w-1/2 lg:mt-0">
            <JourneyUI 
              step={journeyStep}
              onGenerate={handleGenerate}
              onSkip={handleSkip}
              onReset={handleReset}
              isLoading={isLoading}
              imageUrl={currentImageUrl}
              // Final step props
              generatedBio={generatedBio}
              isBioLoading={isBioLoading}
              onGenerateBio={handleGenerateBio}
              profileVibe={profileVibe}
              isVibeLoading={isVibeLoading}
              onGenerateVibe={handleGenerateVibe}
              icebreakers={icebreakers}
              isIcebreakersLoading={isIcebreakersLoading}
              onGenerateIcebreakers={handleGenerateIcebreakers}
            />
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen text-gray-800 flex flex-col">
      <Header />
      <main className={`flex-grow w-full max-w-[1600px] mx-auto p-4 md:p-8 flex justify-center items-center`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;