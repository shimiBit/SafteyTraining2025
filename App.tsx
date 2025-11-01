
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { TopicSelector } from './components/TopicSelector';
import { AddTopicForm } from './components/AddTopicForm';
import { TrainingDisplay } from './components/TrainingDisplay';
import { QuizDisplay } from './components/QuizDisplay';
import { Loader } from './components/Loader';
import { generateTrainingModule, generateQuiz, QuizQuestion } from './services/geminiService';
import { SAFETY_TOPICS, SafetyTopic } from './constants';
import { WelcomeSplash } from './components/WelcomeSplash';

const App: React.FC = () => {
  const [safetyTopics, setSafetyTopics] = useState<SafetyTopic[]>(SAFETY_TOPICS);
  const [selectedTopic, setSelectedTopic] = useState<SafetyTopic | null>(null);
  const [trainingContent, setTrainingContent] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateTraining = useCallback(async () => {
    if (!selectedTopic) {
      setError("אנא בחר נושא הדרכה.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setTrainingContent(null);
    setQuizQuestions([]);

    try {
      const content = await generateTrainingModule(selectedTopic.title);
      setTrainingContent(content);
      const quiz = await generateQuiz(content);
      setQuizQuestions(quiz);
    } catch (err) {
      setError("אירעה שגיאה בעת יצירת ההדרכה או הבוחן. אנא נסה שוב מאוחר יותר.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedTopic]);

  const handleAddTopic = (newTopic: SafetyTopic) => {
    setSafetyTopics((prevTopics) => [...prevTopics, newTopic]);
  };

  return (
    <div className="min-h-screen bg-light text-dark font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
            מחולל הדרכות בטיחות מבוסס AI
          </h2>
          <div className="space-y-6">
            <TopicSelector
              topics={safetyTopics}
              selectedTopic={selectedTopic}
              onSelectTopic={setSelectedTopic}
            />
            <AddTopicForm onAddTopic={handleAddTopic} />
            <div className="flex justify-center">
              <button
                onClick={handleGenerateTraining}
                disabled={!selectedTopic || isLoading}
                className="w-full md:w-auto bg-primary hover:bg-blue-800 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
              >
                {isLoading ? "יוצר הדרכה..." : "צור הדרכה"}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="mt-8 bg-red-100 border-r-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
              <p className="font-bold">שגיאה</p>
              <p>{error}</p>
            </div>
          )}

          <div className="mt-8">
            {isLoading && <Loader />}
            {!isLoading && !trainingContent && <WelcomeSplash />}
            {trainingContent && (
              <>
                <TrainingDisplay content={trainingContent} />
                {quizQuestions.length > 0 && <QuizDisplay questions={quizQuestions} />}
              </>
            )}
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>נוצר באמצעות Gemini API. התוכן הוא למטרות הדרכה בלבד ואינו מהווה ייעוץ משפטי.</p>
        <p>&copy; {new Date().getFullYear()} Safety Training Israel</p>
      </footer>
    </div>
  );
};

export default App;
