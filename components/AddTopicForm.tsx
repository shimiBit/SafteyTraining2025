
import React, { useState } from 'react';
import { SafetyTopic } from '../constants';
import { PlusCircleIcon } from './IconComponents'; // Assuming you have a PlusCircleIcon

interface AddTopicFormProps {
  onAddTopic: (topic: SafetyTopic) => void;
}

export const AddTopicForm: React.FC<AddTopicFormProps> = ({ onAddTopic }) => {
  const [newTopicTitle, setNewTopicTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTopicTitle.trim() === '') return;

    const newTopic: SafetyTopic = {
      id: newTopicTitle.toLowerCase().replace(/\s+/g, '-'),
      title: newTopicTitle,
      icon: PlusCircleIcon, // Using a default icon for new topics
    };

    onAddTopic(newTopic);
    setNewTopicTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        value={newTopicTitle}
        onChange={(e) => setNewTopicTitle(e.target.value)}
        placeholder="הוסף נושא חדש..."
        className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
      />
      <button
        type="submit"
        className="bg-primary hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
      >
        הוסף
      </button>
    </form>
  );
};
