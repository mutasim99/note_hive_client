import { BookOpenIcon } from 'lucide-react';
import React from 'react';

const NoteCard = ({ title, content, course, uploader }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
    <div className="p-6">
      <div className="flex items-center gap-2 text-indigo-500 mb-2">
        <BookOpenIcon className="w-5 h-5" />
        <span className="text-sm font-semibold">{course}</span>
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">
        By <span className="font-medium">{uploader}</span>
      </p>
      {content && <p className="mt-4 text-sm text-gray-600 max-h-48 overflow-y-auto whitespace-pre-wrap pr-2">{content}</p>}
    </div>
  </div>
    );
};

export default NoteCard;