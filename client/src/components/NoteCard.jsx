import axios from 'axios';
import React from 'react';

const NoteCard = ({ note, onDelete, onEdit }) => {
  const createdAt = note.createdAt ? new Date(note.createdAt) : null;

  const formattedDate = createdAt
    ? `${createdAt.toLocaleDateString('en-GB').replace(/\//g, '-')} ${createdAt.toLocaleTimeString('en-GB')}`
    : "Date not available";

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${note._id}`);
      onDelete(note._id);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="bg-white p-4 shadow-lg hover:shadow-2xl rounded h-auto flex flex-col justify-between transition-all duration-200">
      <h2 className="text-indigo-500 font-semibold text-base sm:text-lg break-words">
        {note.title}
      </h2>

      <p className="text-sm mt-2 text-black break-words whitespace-pre-wrap">
        {note.description}
      </p>

      <div className="flex items-center justify-between mt-4">
        <p className="text-gray-500 text-xs sm:text-sm whitespace-nowrap">
          Created on: {formattedDate}
        </p>

        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white text-xs sm:text-sm px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
