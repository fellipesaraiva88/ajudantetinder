/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { JourneyStep } from '../App';
import { CheckIcon, CopyIcon, DownloadIcon, MessageIcon, PawIcon, RevertIcon, SparklesIcon, StarIcon, TinderFlameIcon } from './icons';
import Spinner from './Spinner';

interface JourneyUIProps {
    step: JourneyStep;
    isLoading: boolean;
    imageUrl: string;
    onGenerate: (type: any, detail?: string) => void;
    onSkip: () => void;
    onReset: () => void;
    // Final step props
    generatedBio: string | null;
    isBioLoading: boolean;
    onGenerateBio: () => void;
    profileVibe: { score: number; vibe: string; } | null;
    isVibeLoading: boolean;
    onGenerateVibe: () => void;
    icebreakers: string[] | null;
    isIcebreakersLoading: boolean;
    onGenerateIcebreakers: () => void;
}

const AURA_OPTIONS = [
    { name: 'Mais Jovem e Energético(a)', prompt: 'Rejuvenesça sutilmente a pessoa na foto para parecer cerca de 5 anos mais jovem. Suavize linhas finas, melhore o brilho da pele e ilumine levemente os olhos, mantendo um resultado extremamente fotorrealista e indetectável.' },
    { name: 'Mais Confiante e Misterioso(a)', prompt: 'Ajuste a iluminação e as sombras no rosto da pessoa para criar um visual mais dramático, confiante e misterioso, no estilo "CEO". Adicione um toque de um sorriso confiante, se possível, de forma fotorrealista.' },
];

const FASHION_OPTIONS = [
    { name: 'Casual Chic', prompt: 'calça jeans moderna, camiseta branca básica e um blazer elegante' },
    { name: 'Executivo Moderno', prompt: 'terno de corte moderno em tom neutro com uma camisa social' },
    { name: 'Esportivo de Luxo', prompt: 'conjunto de moletom de alta qualidade de uma marca de grife' },
];

const PET_OPTIONS = [
    { name: 'Golden Retriever Fofo', prompt: 'um adorável e feliz filhote de Golden Retriever' },
    { name: 'Gato Misterioso', prompt: 'um elegante gato preto com olhos verdes penetrantes' },
    { name: 'Capivara Exótica', prompt: 'uma capivara calma e amigável, em pose relaxada' },
];

const BACKGROUND_OPTIONS = [
    { name: 'Viagem a Paris', prompt: 'uma rua charmosa em Paris com a Torre Eiffel ao fundo' },
    { name: 'Jato Particular', prompt: 'dentro de um jato particular luxuoso, olhando pela janela' },
    { name: 'Praia nas Maldivas', prompt: 'em uma praia de areia branca nas Maldivas, com água azul-turquesa' },
];


const JourneyStepWrapper: React.FC<{title: string, subtitle: string, children: React.ReactNode, icon?: React.ReactNode}> = ({ title, subtitle, children, icon }) => (
    <div className="w-full bg-white border border-gray-200/90 rounded-xl p-6 flex flex-col gap-4 animate-fade-in shadow-xl shadow-gray-400/10">
        <div className="text-center">
            {icon && <div className="flex justify-center mb-3">{icon}</div>}
            <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
            <p className="text-md text-gray-500 mt-1">{subtitle}</p>
        </div>
        {children}
    </div>
);


const JourneyUI: React.FC<JourneyUIProps> = (props) => {
    const { 
        step, isLoading, imageUrl, onGenerate, onSkip, onReset,
        generatedBio, isBioLoading, onGenerateBio,
        profileVibe, isVibeLoading, onGenerateVibe,
        icebreakers, isIcebreakersLoading, onGenerateIcebreakers
     } = props;

    const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `perfil-de-sucesso-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedStates(prev => ({ ...prev, [id]: true }));
        setTimeout(() => {
            setCopiedStates(prev => ({ ...prev, [id]: false }));
        }, 2000);
    };


    switch (step) {
        case 'SMILE':
            return (
                <JourneyStepWrapper
                    title="Passo 1: O Sorriso que dá Match"
                    subtitle="Um sorriso feio espanta o crush. Vamos dar um jeito nisso."
                    icon={<SparklesIcon className="w-8 h-8 text-pink-500" />}
                >
                    <button
                        onClick={() => onGenerate('SMILE')}
                        disabled={isLoading}
                        className="w-full mt-2 bg-tinder-gradient text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                    >
                        Simular Sorriso de Influencer
                    </button>
                    <button
                        onClick={onSkip}
                        disabled={isLoading}
                        className="w-full text-gray-600 font-semibold py-2 transition-colors hover:text-pink-600 disabled:opacity-50"
                    >
                        Pular (e continuar com o sorriso que Deus te deu)
                    </button>
                </JourneyStepWrapper>
            );
        
        case 'AURA':
            return (
                <JourneyStepWrapper
                    title="Passo 2: A 'Vibe' Perfeita"
                    subtitle="Qual energia você quer transmitir? Escolha sua aura."
                    icon={<StarIcon className="w-8 h-8 text-pink-500" />}
                >
                    <div className="grid grid-cols-1 gap-3 mt-2">
                        {AURA_OPTIONS.map(opt => (
                            <button
                                key={opt.name}
                                onClick={() => onGenerate('AURA', opt.prompt)}
                                disabled={isLoading}
                                className="w-full text-left bg-white border border-gray-200 text-gray-800 p-4 rounded-lg transition-all duration-200 ease-in-out hover:border-pink-400 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                <p className="font-semibold group-hover:text-pink-600 transition-colors">{opt.name}</p>
                            </button>
                        ))}
                    </div>
                     <button
                        onClick={onSkip}
                        disabled={isLoading}
                        className="w-full text-gray-600 font-semibold py-2 transition-colors hover:text-pink-600 disabled:opacity-50 mt-2"
                    >
                        Pular (minha aura já é impecável)
                    </button>
                </JourneyStepWrapper>
            );
        
        case 'FASHION':
             return (
                <JourneyStepWrapper
                    title="Passo 3: O 'Look' da Riqueza"
                    subtitle="Ninguém quer sair com gente mal vestida. Escolha um look que parece caro."
                    icon={<TinderFlameIcon className="w-8 h-8 text-pink-500" />}
                >
                    <div className="grid grid-cols-1 gap-3 mt-2">
                        {FASHION_OPTIONS.map(opt => (
                            <button
                                key={opt.name}
                                onClick={() => onGenerate('FASHION', opt.prompt)}
                                disabled={isLoading}
                                className="w-full text-left bg-white border border-gray-200 text-gray-800 p-4 rounded-lg transition-all duration-200 ease-in-out hover:border-pink-400 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                <p className="font-semibold group-hover:text-pink-600 transition-colors">{opt.name}</p>
                            </button>
                        ))}
                    </div>
                     <button
                        onClick={onSkip}
                        disabled={isLoading}
                        className="w-full text-gray-600 font-semibold py-2 transition-colors hover:text-pink-600 disabled:opacity-50 mt-2"
                    >
                        Pular (o meu estilo é único)
                    </button>
                </JourneyStepWrapper>
            );
        
        case 'PET':
             return (
                <JourneyStepWrapper
                    title="Passo 4: Wingman Animal"
                    subtitle="Uma foto com um pet aumenta os matches em 300% (fonte: nossa IA)."
                    icon={<PawIcon className="w-8 h-8 text-pink-500" />}
                >
                    <div className="grid grid-cols-1 gap-3 mt-2">
                        {PET_OPTIONS.map(opt => (
                            <button
                                key={opt.name}
                                onClick={() => onGenerate('PET', opt.prompt)}
                                disabled={isLoading}
                                className="w-full text-left bg-white border border-gray-200 text-gray-800 p-4 rounded-lg transition-all duration-200 ease-in-out hover:border-pink-400 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                <p className="font-semibold group-hover:text-pink-600 transition-colors">{opt.name}</p>
                            </button>
                        ))}
                    </div>
                     <button
                        onClick={onSkip}
                        disabled={isLoading}
                        className="w-full text-gray-600 font-semibold py-2 transition-colors hover:text-pink-600 disabled:opacity-50 mt-2"
                    >
                        Pular (sou alérgico a sucesso)
                    </button>
                </JourneyStepWrapper>
            );

        case 'BACKGROUND':
             return (
                <JourneyStepWrapper
                    title="Passo 5: Ostentação"
                    subtitle="Mostre que você tem uma vida interessante (mesmo que seja mentira)."
                    icon={<DownloadIcon className="w-8 h-8 text-pink-500 -rotate-90" />}
                >
                    <div className="grid grid-cols-1 gap-3 mt-2">
                        {BACKGROUND_OPTIONS.map(opt => (
                            <button
                                key={opt.name}
                                onClick={() => onGenerate('BACKGROUND', opt.prompt)}
                                disabled={isLoading}
                                className="w-full text-left bg-white border border-gray-200 text-gray-800 p-4 rounded-lg transition-all duration-200 ease-in-out hover:border-pink-400 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                <p className="font-semibold group-hover:text-pink-600 transition-colors">{opt.name}</p>
                            </button>
                        ))}
                    </div>
                     <button
                        onClick={onSkip}
                        disabled={isLoading}
                        className="w-full text-gray-600 font-semibold py-2 transition-colors hover:text-pink-600 disabled:opacity-50 mt-2"
                    >
                        Pular (prefiro o fundo da minha casa mesmo)
                    </button>
                </JourneyStepWrapper>
            );

        case 'FINAL':
             return (
                <div className="w-full bg-white border border-gray-200/90 rounded-xl p-6 flex flex-col gap-4 animate-fade-in shadow-xl shadow-gray-400/10">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-800">Perfil Atualizado com Sucesso!</h3>
                        <p className="text-md text-gray-500 mt-1">Agora sim! Prepare-se para os matches.</p>
                    </div>

                    <div className="flex flex-col gap-3 mt-2">
                        <button onClick={handleDownload} className="w-full bg-tinder-gradient text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base flex items-center justify-center gap-2">
                            <DownloadIcon className="w-5 h-5" />
                            Baixar para o Perfil
                        </button>
                        <button onClick={onReset} className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2.5 px-6 rounded-full hover:bg-gray-100 hover:border-gray-400 transition-all flex items-center justify-center gap-2 active:scale-95">
                            <RevertIcon className="w-5 h-5" />
                            Começar de Novo
                        </button>
                    </div>

                    {/* Bonus Features Dashboard */}
                    <div className="mt-4 pt-4 border-t-2 border-dashed">
                        <h4 className="font-bold text-center text-lg text-gray-700">⭐ Bônus: Complete seu Perfil ⭐</h4>
                        
                        {/* Bio Generator */}
                        <div className="mt-4">
                            {!generatedBio && !isBioLoading && (
                                <button onClick={onGenerateBio} className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2.5 px-4 rounded-lg transition-colors">Gerar Bio para o Tinder</button>
                            )}
                            {isBioLoading && <div className="p-4 bg-gray-100 rounded-lg text-center"><Spinner /></div>}
                            {generatedBio && (
                                <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
                                    <p className="font-semibold text-gray-800">Sua nova bio:</p>
                                    <p className="text-gray-700 mt-1 italic">"{generatedBio}"</p>
                                    <div className="flex justify-end gap-2 mt-2">
                                        <button onClick={() => handleCopy(generatedBio, 'bio')} className="text-xs bg-white border rounded-full px-3 py-1 font-semibold hover:bg-gray-50 flex items-center gap-1">
                                            {copiedStates['bio'] ? <CheckIcon className="w-3 h-3 text-green-500" /> : <CopyIcon className="w-3 h-3" />}
                                            {copiedStates['bio'] ? 'Copiado!' : 'Copiar'}
                                        </button>
                                        <button onClick={onGenerateBio} disabled={isBioLoading} className="text-xs bg-white border rounded-full px-3 py-1 font-semibold hover:bg-gray-50">Gerar Outra</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Vibe Check */}
                        {generatedBio && (
                            <div className="mt-3">
                                {!profileVibe && !isVibeLoading && (
                                     <button onClick={onGenerateVibe} disabled={isVibeLoading} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2.5 px-4 rounded-lg transition-colors">Fazer Vibe Check</button>
                                )}
                                {isVibeLoading && <div className="p-4 bg-gray-100 rounded-lg text-center"><Spinner /></div>}
                                {profileVibe && (
                                     <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
                                        <p className="font-semibold text-gray-800">Vibe Check:</p>
                                        <p className="text-2xl font-bold text-center my-2 text-tinder-gradient">{profileVibe.score}/10 Potencial de Match</p>
                                        <p className="text-gray-700 mt-1 italic text-center">"{profileVibe.vibe}"</p>
                                        <div className="flex justify-end mt-2">
                                           <button onClick={onGenerateVibe} disabled={isVibeLoading} className="text-xs bg-white border rounded-full px-3 py-1 font-semibold hover:bg-gray-50">Analisar Novamente</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                         {/* Icebreakers */}
                        {profileVibe && (
                            <div className="mt-3">
                                {!icebreakers && !isIcebreakersLoading && (
                                     <button onClick={onGenerateIcebreakers} disabled={isIcebreakersLoading} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                                        <MessageIcon className="w-4 h-4"/> Gerar Puxadores de Assunto
                                     </button>
                                )}
                                {isIcebreakersLoading && <div className="p-4 bg-gray-100 rounded-lg text-center"><Spinner /></div>}
                                {icebreakers && (
                                     <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
                                        <p className="font-semibold text-gray-800">Puxadores de Assunto:</p>
                                        <ul className="mt-2 space-y-2">
                                            {icebreakers.map((ice, index) => (
                                                <li key={index} className="text-sm text-gray-700 bg-white p-2 rounded flex justify-between items-center">
                                                    <span className="italic">"{ice}"</span>
                                                    <button onClick={() => handleCopy(ice, `ice${index}`)} className="text-xs bg-gray-100 border rounded-full px-2 py-0.5 font-semibold hover:bg-gray-200 flex items-center gap-1 flex-shrink-0 ml-2">
                                                        {copiedStates[`ice${index}`] ? <CheckIcon className="w-3 h-3 text-green-500" /> : <CopyIcon className="w-3 h-3" />}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex justify-end mt-2">
                                           <button onClick={onGenerateIcebreakers} disabled={isIcebreakersLoading} className="text-xs bg-white border rounded-full px-3 py-1 font-semibold hover:bg-gray-50">Gerar Mais</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            );

        default:
            return null;
    }
}

export default JourneyUI;