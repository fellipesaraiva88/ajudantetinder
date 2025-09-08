/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { TinderFlameIcon } from './icons';


const Header: React.FC = () => {
  return (
    <header className="w-full py-3 px-6 border-b border-gray-200/80 bg-white/95 backdrop-blur-lg sticky top-0 z-50">
      <div className="flex items-center justify-center gap-2 max-w-7xl mx-auto">
          <TinderFlameIcon className="w-6 h-6" />
          <h1 className="text-xl font-bold tracking-tight text-gray-800">
            Perfil de Sucesso <span className="font-light">AI</span>
          </h1>
      </div>
    </header>
  );
};

export default Header;