
import React from 'react';

export const WelcomeSplash: React.FC = () => {
    return (
        <div className="text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-primary opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h3 className="mt-4 text-2xl font-bold text-gray-800">ברוכים הבאים למחולל הדרכות הבטיחות</h3>
            <p className="mt-2 text-md text-gray-600">
                כדי להתחיל, יש לבחור את נושא הבטיחות הרצוי מהרשימה למעלה,
                <br />
                ולאחר מכן ללחוץ על כפתור <strong>"צור הדרכה"</strong>.
            </p>
            <p className="mt-4 text-sm text-gray-500">
                המערכת תיצור עבורך תוכן הדרכה מקיף המבוסס על החוקים והתקנות בישראל.
            </p>
        </div>
    );
};
