
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateTrainingModule(topic: string): Promise<string> {
    const systemInstruction = `אתה מומחה בכיר לבטיחות בעבודה, עם התמחות עמוקה בחוקים ובתקנות של מדינת ישראל. תפקידך הוא ליצור חומרי הדרכה מקיפים, ברורים ומדויקים. עליך להתבסס אך ורק על חקיקה ישראלית רלוונטית (כגון פקודת הבטיחות בעבודה, חוק ארגון הפיקוח על העבודה, ותקנות ספציפיות לנושא).`;

    const prompt = `
    צור הדרכת בטיחות מפורטת ומקצועית בנושא: "${topic}".
    ההדרכה צריכה להיות כתובה בעברית רהוטה ומקצועית, ומיועדת לעובדים.
    השתמש בפורמט Markdown פשוט.

    כלול את הסעיפים הבאים באופן ברור:

    # ${topic}: מדריך בטיחות לעובד

    ## 1. מבוא והגדרות יסוד
    - הסבר קצר על חשיבות הבטיחות בנושא זה.
    - הגדרות מפתח רלוונטיות מהתקנות הישראליות.

    ## 2. זיהוי סיכונים עיקריים
    - רשימת הסיכונים המרכזיים הכרוכים בעבודה בנושא זה.
    - דוגמאות למצבים מסוכנים נפוצים.

    ## 3. דרישות החוק והתקנות בישראל
    - סקירה תמציתית של חובות המעסיק והעובד על פי החוק בישראל.
    - ציון שמות של תקנות רלוונטיות (לדוגמה: "תקנות הבטיחות בעבודה (עבודה בגובה), התשס"ז-2007").

    ## 4. ציוד מגן אישי (צמ"א) וציוד עבודה
    - פירוט ציוד המגן האישי הנדרש.
    - דגשים לגבי בדיקה ושימוש נכון בציוד.
    - פירוט ציוד עבודה בטיחותי נדרש.

    ## 5. כללי "עשה" ו"אל תעשה"
    - רשימה ברורה של פעולות חובה (עשה).
    - רשימה ברורה של פעולות אסורות (אל תעשה).

    ## 6. נהלי חירום
    - הנחיות בסיסיות למקרה של תאונה או מצב חירום.

    ודא שהתוכן מדויק, מעשי, וקל להבנה עבור כל עובד.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            systemInstruction: systemInstruction,
            generationConfig: {
                temperature: 0.5,
            }
        });

        if (response && response.text) {
            return response.text;
        } else {
            throw new Error("No content received from Gemini API.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate training module from Gemini API.");
    }
}
