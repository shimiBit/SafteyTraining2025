
import React from 'react';
import { SAFETY_TOPICS, SafetyTopic } from '../constants';

interface TopicSelectorProps {
  selectedTopic: SafetyTopic | null;
  onSelectTopic: (topic: SafetyTopic) => void;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({ selectedTopic, onSelectTopic }) => {
  return (
    <div>
      <label htmlFor="topic-selector" className="block text-lg font-medium text-gray-700 mb-4 text-center">
        בחר/י נושא להדרכה
      </label>
      <div id="topic-selector" className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {SAFETY_TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic)}
            className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg shadow-sm transition-all duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-opacity-50
              ${selectedTopic?.id === topic.id 
                ? 'bg-primary border-primary text-white' 
                : 'bg-white border-gray-200 text-dark hover:bg-light hover:border-secondary focus:ring-secondary'
              }`}
          >
            <topic.icon className="h-10 w-10 mb-2" />
            <span className="font-semibold text-center text-sm md:text-base">{topic.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
