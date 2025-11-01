
import React, { useState } from 'react';
import { QuizQuestion } from '../services/geminiService';

interface QuizDisplayProps {
  questions: QuizQuestion[];
}

export const QuizDisplay: React.FC<QuizDisplayProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  if (showResults) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-4xl mx-auto mt-8">
        <h3 className="text-2xl font-bold text-primary mb-4 text-center">תוצאות הבוחן</h3>
        <p className="text-xl text-center">
          הציון שלך: {calculateScore()} מתוך {questions.length}
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-4xl mx-auto mt-8">
      <h3 className="text-xl font-bold text-primary mb-4">{currentQuestion.question}</h3>
      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className={`w-full text-right p-4 border rounded-lg transition-colors
              ${selectedAnswers[currentQuestionIndex] === option
                ? 'bg-secondary text-white'
                : 'bg-light hover:bg-gray-200'
              }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNextQuestion} className="bg-primary hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg">
            השאלה הבאה
          </button>
        ) : (
          <button onClick={handleShowResults} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
            סיים וצפה בתוצאות
          </button>
        )}
      </div>
    </div>
  );
};
