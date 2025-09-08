/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

// Helper function to convert a File object to a Gemini API Part
const fileToPart = async (file: File): Promise<{ inlineData: { mimeType: string; data: string; } }> => {
    const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
    
    const arr = dataUrl.split(',');
    if (arr.length < 2) throw new Error("Invalid data URL");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch || !mimeMatch[1]) throw new Error("Could not parse MIME type from data URL");
    
    const mimeType = mimeMatch[1];
    const data = arr[1];
    return { inlineData: { mimeType, data } };
};

const handleApiResponse = (
    response: GenerateContentResponse,
    context: string
): { imageUrl: string; description: string } => {
    if (response.promptFeedback?.blockReason) {
        const { blockReason, blockReasonMessage } = response.promptFeedback;
        const errorMessage = `A solicitação foi bloqueada. Motivo: ${blockReason}. ${blockReasonMessage || ''}`;
        console.error(errorMessage, { response });
        throw new Error(errorMessage);
    }

    const candidate = response.candidates?.[0];
    if (!candidate) {
        throw new Error("Nenhuma resposta válida recebida do modelo.");
    }

    const imagePart = candidate.content?.parts?.find(part => part.inlineData);
    const textPart = candidate.content?.parts?.find(part => part.text);

    if (imagePart?.inlineData) {
        const { mimeType, data } = imagePart.inlineData;
        const imageUrl = `data:${mimeType};base64,${data}`;
        const description = textPart?.text || "A simulação foi concluída com sucesso.";
        
        console.log(`Received image for ${context}`);
        return { imageUrl, description };
    }

    const finishReason = candidate.finishReason;
    if (finishReason && finishReason !== 'STOP') {
        const errorMessage = `A geração de imagem parou inesperadamente. Motivo: ${finishReason}. Isso geralmente está relacionado às configurações de segurança.`;
        console.error(errorMessage, { response });
        throw new Error(errorMessage);
    }
    
    const textFeedback = response.text?.trim();
    const errorMessage = `O modelo de IA não retornou uma imagem. ` + 
        (textFeedback 
            ? `O modelo respondeu com texto: "${textFeedback}"`
            : "Isso pode acontecer devido a filtros de segurança. Tente uma imagem ou comando diferente.");

    console.error(`Model response did not contain an image part for ${context}.`, { response });
    throw new Error(errorMessage);
};

export interface ModificationRequest {
    type: 'SMILE' | 'AURA' | 'FASHION' | 'PET' | 'BACKGROUND';
    detail?: string;
}

const generatePrompt = (request: ModificationRequest): string => {
    const baseInstruction = `Sua tarefa é realizar uma simulação fotorrealista e de aparência natural na imagem fornecida, com base na solicitação. O resultado DEVE ser fotorrealista e plausível. O restante da imagem (fora da área de edição imediata) deve permanecer idêntico ao original.`;

    switch (request.type) {
        case 'SMILE':
            return `${baseInstruction} Simule um aprimoramento de sorriso para a pessoa na imagem. Aplique um clareamento dental visível e faça pequenos alinhamentos para um resultado estético e natural, como se tivessem sido aplicadas lentes de resina. Apenas os dentes devem ser alterados.`;
        case 'AURA':
            return `${baseInstruction} ${request.detail}`;
        case 'FASHION':
            return `${baseInstruction} Altere a roupa da pessoa na imagem para um estilo '${request.detail}'. Mantenha o rosto, cabelo e corpo da pessoa idênticos, alterando apenas as vestimentas de forma fotorrealista. O resultado deve ser estiloso e coerente.`;
        case 'PET':
             return `${baseInstruction} Adicione de forma fotorrealista ${request.detail} ao lado da pessoa na foto. O animal deve parecer natural na cena, com iluminação e proporções corretas. Faça com que pareça que o animal de estimação pertence à pessoa.`;
        case 'BACKGROUND':
            return `${baseInstruction} Recorte a pessoa em primeiro plano e coloque-a em um novo cenário: '${request.detail}'. A iluminação na pessoa deve ser ajustada para combinar com o novo ambiente de forma fotorrealista. O resultado deve ser uma composição crível e de alta qualidade.`;
        default:
            throw new Error('Tipo de modificação desconhecido.');
    }
}


/**
 * Generates a modified image based on a creative prompt.
 * @param originalImage The original image file.
 * @param request The modification request details.
 * @returns A promise that resolves to an object containing the image data URL and a description.
 */
export const runImageModification = async (
    originalImage: File,
    request: ModificationRequest,
): Promise<{ imageUrl: string; description: string }> => {
    const context = `${request.type}${request.detail ? `: ${request.detail}`: ''}`;
    console.log('Starting image modification:', context);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    
    const originalImagePart = await fileToPart(originalImage);
    const prompt = generatePrompt(request);
    const textPart = { text: prompt };

    console.log('Sending request to the model...');
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: { parts: [originalImagePart, textPart] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });
    console.log('Received response from model.', response);

    // For this app, we only return the image. The description part is ignored.
    return handleApiResponse(response, context);
};

const generateTextPrompt = (mode: 'bio' | 'vibe' | 'icebreakers', bio?: string): string => {
    switch (mode) {
        case 'bio':
            return `Você é um especialista em perfis de namoro engraçado e criativo. Com base na pessoa e no cenário da imagem, crie uma bio curta (1-2 frases), espirituosa e um pouco exagerada para o Tinder. A bio deve ser magnética e engraçada. Responda APENAS com um objeto JSON no formato: {"bio": "sua bio aqui"}`;
        case 'vibe':
            return `Você é um especialista em Tinder brutalmente honesto. Analise a foto e a bio a seguir: "${bio}". Qual é a "vibe" geral deste perfil? Dê uma nota de "Potencial de Match" de 0 a 10 e um resumo curto e hilário da vibe. Responda APENAS com um objeto JSON no formato: {"score": 8, "vibe": "sua análise aqui"}`;
        case 'icebreakers':
            return `Você é um mestre da conversa no Tinder. Com base na foto e na bio a seguir: "${bio}", crie 3 mensagens curtas, únicas e engraçadas para iniciar uma conversa (icebreakers) que esta pessoa poderia enviar. Responda APENAS com um objeto JSON no formato: {"icebreakers": ["mensagem 1", "mensagem 2", "mensagem 3"]}`;
        default:
             throw new Error("Modo de geração de texto inválido.");
    }
};


export const generateTextFromImage = async (
    image: File,
    mode: 'bio' | 'vibe' | 'icebreakers',
    bio?: string
): Promise<any> => {
    console.log(`Generating text for mode: ${mode}`);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

    const imagePart = await fileToPart(image);
    const prompt = generateTextPrompt(mode, bio);
    const textPart = { text: prompt };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
    });

    try {
        const jsonString = response.text.trim().replace(/^```json\s*|```\s*$/g, '');
        const data = JSON.parse(jsonString);
        console.log(`Successfully parsed JSON for mode ${mode}:`, data);
        return data;
    } catch (e) {
        console.error("Failed to parse JSON from model response:", response.text);
        throw new Error("A IA retornou uma resposta em um formato inesperado. Tente novamente.");
    }
};