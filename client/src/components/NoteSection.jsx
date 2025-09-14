import React from 'react';
import NoteCard from './NoteCard';

const NoteSection = ({ notes, onDelete, onEdit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-4 gap-4 p-7">
      {notes.length > 0 ? (
        notes.map(note => (
          <NoteCard 
            key={note._id} 
            note={note} 
            onDelete={onDelete} 
            onEdit={onEdit}  // <-- Pass onEdit here!
          />
        ))
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
};

export default NoteSection;
