
import React from 'react';

interface TrainingDisplayProps {
  content: string;
}

const SimpleMarkdownParser: React.FC<{ text: string }> = ({ text }) => {
    const lines = text.split('\n');
    // FIX: Changed JSX.Element to React.ReactElement to fix "Cannot find namespace 'JSX'" error.
    const elements: React.ReactElement[] = [];
    let listItems: string[] = [];
  
    const renderList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-2 mb-4 pr-5">
            {listItems.map((item, index) => (
              <li key={`li-${index}`} dangerouslySetInnerHTML={{ __html: formatBold(item) }}></li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const formatBold = (line: string) => {
        return line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-primary">$1</strong>');
    };
  
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
  
      if (trimmedLine.startsWith('### ')) {
        renderList();
        elements.push(<h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-secondary" dangerouslySetInnerHTML={{ __html: formatBold(trimmedLine.substring(4)) }} />);
      } else if (trimmedLine.startsWith('## ')) {
        renderList();
        elements.push(<h2 key={index} className="text-2xl font-bold mt-8 mb-4 pb-2 border-b-2 border-light text-primary" dangerouslySetInnerHTML={{ __html: formatBold(trimmedLine.substring(3)) }} />);
      } else if (trimmedLine.startsWith('# ')) {
        renderList();
        elements.push(<h1 key={index} className="text-3xl font-extrabold mt-4 mb-6 text-dark" dangerouslySetInnerHTML={{ __html: formatBold(trimmedLine.substring(2)) }} />);
      } else if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
        listItems.push(trimmedLine.substring(2));
      } else if (trimmedLine.length > 0) {
        renderList();
        elements.push(<p key={index} className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formatBold(trimmedLine) }} />);
      } else {
        renderList();
      }
    });
  
    renderList(); // Render any remaining list items
  
    return <>{elements}</>;
};

export const TrainingDisplay: React.FC<TrainingDisplayProps> = ({ content }) => {
  return (
    <div className="prose prose-lg max-w-none bg-gray-50 p-6 rounded-lg border border-gray-200">
      <SimpleMarkdownParser text={content} />
    </div>
  );
};
