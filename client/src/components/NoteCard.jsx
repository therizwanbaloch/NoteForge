import axios from 'axios';
import React from 'react';

const NoteCard = ({ note, onDelete, onEdit }) => {
  const createdAt = new Date(note.createdAt);
  const formattedDate = `${createdAt.getDate().toString().padStart(2, '0')}-${(createdAt.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${createdAt.getFullYear()}`;

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

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-2">
        <p className="text-gray-500 text-xs sm:text-sm whitespace-nowrap">
          Created on: {formattedDate}
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white text-xs sm:text-sm px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
