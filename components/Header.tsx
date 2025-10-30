
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white shadow-md w-full">
      <div className="container mx-auto p-4 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm-1 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
        <h1 className="text-xl md:text-2xl font-bold">
          תוכנת הדרכות בטיחות
        </h1>
      </div>
    </header>
  );
};
