import React from 'react';

const NoteModal = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onCancel,
  onAddNote,
}) => {
  return (
    <div className="w-full sm:w-2/3 lg:w-1/3 mx-auto rounded p-4 sm:p-6 shadow-xl bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg sm:text-xl text-indigo-500 font-bold">Add Note</h3>
        <button
          className="bg-red-500 hover:bg-red-600 transition-colors text-white font-bold text-sm sm:text-lg px-3 py-1 rounded"
          onClick={onCancel}
          aria-label="Close modal"
        >
          X
        </button>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-indigo-500"
          placeholder="Title..."
          value={title}
          onChange={onTitleChange}
        />
        <textarea
          rows={4}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-indigo-500"
          placeholder="Description..."
          value={description}
          onChange={onDescriptionChange}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          className="bg-slate-100 hover:bg-slate-200 text-sm sm:text-base font-semibold px-3 py-2 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-indigo-500 text-white hover:bg-indigo-600 text-sm sm:text-base font-semibold px-3 py-2 rounded"
          onClick={onAddNote}
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default NoteModal;
