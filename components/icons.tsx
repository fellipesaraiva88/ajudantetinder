/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
);

export const VisionIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
    </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.455-2.456L12.75 18l1.178-.398a3.375 3.375 0 002.455-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456l1.178.398-1.178.398a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);

export const RevertIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
    </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

export const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
  </svg>
);

export const TinderFlameIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
        <title>Tinder icon</title>
        <path d="M21.192 9.916c-1.545-3.524-5.12-6.113-9.19-6.113-4.072 0-7.646 2.589-9.191 6.113-1.18 2.684-.75 5.86.974 8.019 1.488 1.87 3.633 3.208 6.014 3.862.562.155.938.694.938 1.272 0 .616-.41 1.144-.98 1.258a1.24 1.24 0 0 1-1.337-.922c-.23-.74-.82-1.28-1.57-1.42-1.07-.2-2.19.4-2.5 1.42-.31 1.03.4 2.15 1.42 2.45 1.58.46 3.19-.7 3.6-2.27.16-.62.24-1.27.24-1.92 0-2.34-1.52-4.39-3.69-5.25-2.07-.82-4.36-.4-6.13 1.1-2.05-2.65-1.5-6.32.93-8.52 1.9-1.72 4.4-2.8 7.2-2.8 2.79 0 5.3 1.08 7.2 2.8 2.43 2.2 2.98 5.87.93 8.52-1.77 1.5-4.06 1.92-6.13 1.1-2.17.86-3.69 2.91-3.69 5.25 0 .65.08 1.3.24 1.92.4 1.57 2.02 2.73 3.6 2.27 1.02-.3 1.73-1.42 1.42-2.45-.3-1.02-1.43-1.62-2.5-1.42-.75.14-1.34.68-1.57 1.42a1.24 1.24 0 0 1-1.337.922c-.57-.114-.98-.642-.98-1.258 0-.578.376-1.117.938-1.272 2.38-.654 4.526-1.992 6.014-3.862 1.725-2.16 2.155-5.335.975-8.02Z"/>
    </svg>
);

export const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
);

export const PawIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H7.5Zm.75 4.5a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-1.5 0V13.5a.75.75 0 0 1 .75-.75Zm-3 1.5a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H5.25Zm3.75 0a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H9Zm3-4.5a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm-1.5 4.5a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5h-.008Zm1.5 0a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5h-.008Zm-3-1.5a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-1.5 0V12a.75.75 0 0 1 .75-.75Zm3 0a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-1.5 0V12a.75.75 0 0 1 .75-.75Zm3-4.5a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H16.5Zm.75 4.5a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-1.5 0V13.5a.75.75 0 0 1 .75-.75Zm-3 1.5a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H15Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8.25 8.25 0 0 0 6.22-13.801-8.25 8.25 0 0 0-12.44 0A8.25 8.25 0 0 0 12 21Z" />
    </svg>
);

export const MessageIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 0 1-2.53-.388A5.887 5.887 0 0 1 5.34 18.11a5.869 5.869 0 0 0-.454-.454 5.887 5.887 0 0 0-2.318-1.57A9.76 9.76 0 0 1 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
    </svg>
);