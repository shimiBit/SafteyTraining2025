import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
// @ts-ignore
import App from '@/App'; // ייבוא של הקומפוננטה שלך
// @ts-ignore
import { SAFETY_TOPICS } from '@/constants'; // ייבוא של הנושאים

// --- זה החלק החשוב ---
// אנחנו אומרים ל-Vitest ליירט את הייבוא של 'geminiService'
// ולהחליף את הפונקציה 'generateTrainingModule' בהדמיה (mock)
const mockGenerateTraining = vi.fn();
// עדכון: שימוש בכינוי הנתיב המוגדר ב-vite.config.ts
vi.mock('@/services/geminiService', () => ({
  generateTrainingModule: mockGenerateTraining,
}));
// ---------------------

describe('App Component', () => {

  // נאפס את המוקים לפני כל בדיקה
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the main title', () => {
    render(<App />);
    expect(screen.getByText('מחולל הדרכות בטיחות מבוסס AI')).toBeInTheDocument();
  });

  it('should generate training content successfully', async () => {
    const mockContent = "זוהי הדרכת בטיחות מדומה בנושא עבודה בגובה.";
    
    // הגדרה: כשיקראו לפונקציה, תחזיר את התוכן הזה
    mockGenerateTraining.mockResolvedValue(mockContent);

    render(<App />);

    // 1. מצא את הכפתור של הנושא (לדוגמה, הראשון ברשימה)
    // הערה: נצטרך לשנות את "עבודה בגובה" לשם המדויק של הנושא הראשון שלך
    const topicButton = screen.getByText(SAFETY_TOPICS[0].title);
    
    // 2. מצא את כפתור "צור הדרכה"
    const generateButton = screen.getByRole('button', { name: 'צור הדרכה' });

    // פעולה: בחר נושא
    await act(async () => {
      fireEvent.click(topicButton);
    });

    // פעולה: לחץ על "צור הדרכה"
    await act(async () => {
      fireEvent.click(generateButton);
    });

    // בדיקה: ודא שמצב הטעינה הופיע
    expect(screen.getByText('יוצר הדרכה...')).toBeInTheDocument();

    // בדיקה: חכה שהתוכן יופיע (לאחר סיום הטעינה)
    const trainingContent = await screen.findByText(mockContent);
    expect(trainingContent).toBeInTheDocument();

    // בדיקה: ודא שקראנו ל-API עם הנושא הנכון
    expect(mockGenerateTraining).toHaveBeenCalledWith(SAFETY_TOPICS[0].title);
  });

  it('should display an error message if generation fails', async () => {
    // הגדרה: הפעם, גרם לפונקציה להיכשל
    mockGenerateTraining.mockRejectedValue(new Error('Test API Error'));

    render(<App />);

    // 1. בחר נושא
    const topicButton = screen.getByText(SAFETY_TOPICS[0].title);
    await act(async () => {
      fireEvent.click(topicButton);
    });

    // 2. לחץ "צור הדרכה"
    const generateButton = screen.getByRole('button', { name: 'צור הדרכה' });
    await act(async () => {
      fireEvent.click(generateButton);
    });

    // בדיקה: ודא שהודעת השגיאה הנכונה מוצגת
    const errorMessage = await screen.findByText('אירעה שגיאה בעת יצירת ההדרכה. אנא נסה שוב מאוחר יותר.');
    expect(errorMessage).toBeInTheDocument();
  });
});
