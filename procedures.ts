/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Procedure {
    nome: string;
    prompt: string;
    preco: number | string;
    tipo: 'procedure' | 'skincare' | 'dental';
}

export const procedures: Procedure[] = [
    // Procedimentos Cirúrgicos e Injetáveis
    { 
        nome: 'Rinoplastia', 
        prompt: 'Simule uma rinoplastia sutil. Refine a forma do nariz, tornando a ponte ligeiramente mais estreita e a ponta mais definida, mantendo um resultado natural e fotorrealista.', 
        preco: 18000,
        tipo: 'procedure'
    },
    { 
        nome: 'Preenchimento Labial', 
        prompt: 'Simule um preenchimento labial. Adicione volume e definição de aparência natural aos lábios, tornando-os mais cheios, simétricos e hidratados.', 
        preco: 1500,
        tipo: 'procedure'
    },
    { 
        nome: 'Contorno Mandibular', 
        prompt: 'Simule um contorno mandibular com preenchedores. Crie uma linha da mandíbula mais definida e esculpida, acentuando sutilmente o ângulo para um perfil mais forte.', 
        preco: 2500,
        tipo: 'procedure'
    },
    { 
        nome: 'Preenchimento de Malar', 
        prompt: 'Simule um preenchimento nas maçãs do rosto (malar). Adicione volume à região das bochechas para um efeito de lifting, criando contornos suaves e uma aparência mais jovem.', 
        preco: 2200,
        tipo: 'procedure'
    },
     { 
        nome: 'Toxina Botulínica (Testa)', 
        prompt: 'Simule o efeito da toxina botulínica na testa. Suavize as linhas de expressão e rugas horizontais na testa, resultando em uma pele mais lisa e relaxada.', 
        preco: 800,
        tipo: 'procedure'
    },
    { 
        nome: 'Blefaroplastia (Pálpebras)', 
        prompt: 'Simule uma blefaroplastia. Remova o excesso de pele e as bolsas de gordura das pálpebras superiores e/ou inferiores para um olhar mais rejuvenescido e descansado.', 
        preco: 9500,
        tipo: 'procedure'
    },

    // Tratamentos de Pele
    { 
        nome: 'Efeito "Pele de Vidro"', 
        prompt: "Simule um efeito de 'pele de vidro' (glass skin). Deixe a pele excepcionalmente lisa, com tom uniforme e um brilho lustroso, como se estivesse úmida e perfeitamente hidratada.", 
        preco: 450,
        tipo: 'skincare'
    },
    { 
        nome: 'Remoção de Acne e Manchas', 
        prompt: 'Simule um tratamento para acne. Remova todas as manchas, espinhas, cravos e vermelhidão, deixando a pele com uma aparência limpa, clara e de textura suave.', 
        preco: 300,
        tipo: 'skincare'
    },
    { 
        nome: 'Suavização de Rugas Finas', 
        prompt: 'Simule um tratamento de rejuvenescimento. Suavize a aparência de linhas finas e rugas, especialmente ao redor dos olhos e da boca, para um visual geral mais jovem e fresco.', 
        preco: 500,
        tipo: 'skincare'
    },
    { 
        nome: 'Clareamento de Melasma', 
        prompt: 'Simule um tratamento para melasma. Clareie e uniformize as manchas escuras na pele, especialmente na testa, bochechas e buço, resultando em um tom de pele mais homogêneo.', 
        preco: 600,
        tipo: 'skincare'
    },
    { 
        nome: 'Peeling Químico', 
        prompt: 'Simule os resultados de um peeling químico médio. Melhore a textura geral da pele, reduza a aparência de poros, clareie manchas superficiais e dê um brilho renovado ao rosto.', 
        preco: 750,
        tipo: 'skincare'
    },
     { 
        nome: 'Microagulhamento', 
        prompt: 'Simule o efeito de uma sessão de microagulhamento. Melhore a firmeza da pele, suavize cicatrizes de acne e reduza a aparência de poros dilatados, conferindo um viço geral.', 
        preco: 650,
        tipo: 'skincare'
    },
    
    // Procedimentos Odontológicos
    { 
        nome: 'Lentes de Porcelana', 
        prompt: 'Simule a aplicação de lentes de contato dentais de porcelana com aparência natural. Corrija o alinhamento, formato e cor dos dentes visíveis no sorriso. O resultado deve ser um sorriso perfeitamente branco, alinhado e harmonioso, com aparência fotorrealista.', 
        preco: 25000,
        tipo: 'dental'
    },
    { 
        nome: 'Sorriso Hollywood', 
        prompt: "Simule um 'Sorriso Hollywood' com lentes de porcelana. Crie dentes perfeitamente alinhados, com formato impecável e uma cor branco-opaca super clara, característica de celebridades. O resultado deve ser impactante, glamoroso e fotorrealista.", 
        preco: 35000,
        tipo: 'dental'
    },
    { 
        nome: 'Clareamento a Laser', 
        prompt: 'Simule um clareamento dental a laser profissional. Torne os dentes visivelmente mais brancos e brilhantes, removendo manchas e amarelado, mantendo a translucidez e a aparência natural do esmalte dental. O resultado deve ser um sorriso limpo e rejuvenescido.', 
        preco: 2000,
        tipo: 'dental'
    },
];