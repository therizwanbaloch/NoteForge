import React, { useState, useEffect } from 'react';
import NoteSection from '../components/NoteSection';
import NoteModal from '../components/NoteModal';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/notes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotes(data.notes);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const handleAddNote = async () => {
    if (!title.trim() || !description.trim()) {
      alert('Please fill both fields');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/notes/add',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setModalOpen(false);
      setTitle('');
      setDescription('');
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Failed to add note, please try again.');
    }
  };

  const handleUpdateNote = async () => {
    if (!title.trim() || !description.trim()) {
      alert('Please fill both fields');
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/notes/${editNoteId}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setModalOpen(false);
      setTitle('');
      setDescription('');
      setEditNoteId(null);
      fetchNotes();
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Failed to update note, please try again.');
    }
  };

  const handleDelete = (deletedNoteId) => {
    setNotes((prevNotes) => prevNotes.filter(note => note._id !== deletedNoteId));
  };

  const handleEditClick = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setEditNoteId(note._id);
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setTitle('');
    setDescription('');
    setEditNoteId(null);
  };

  return (
    <>
      {user ? (
        <div className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-6">
          {notes.length > 0 ? (
            <NoteSection notes={notes} onDelete={handleDelete} onEdit={handleEditClick} />
          ) : (
            <div className="flex justify-center items-center h-[60vh]">
              <p className="text-center text-gray-400 text-lg sm:text-xl font-medium">
                📝 No notes found. <br />Click on "Add Notes" to create one.
              </p>
            </div>
          )}

          <button
            onClick={() => {
              setEditNoteId(null);
              setTitle('');
              setDescription('');
              setModalOpen(true);
            }}
            className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg px-5 py-3 text-sm sm:text-base"
            aria-label="Add note"
          >
            Add Notes
          </button>

          {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
              <NoteModal
                title={title}
                description={description}
                onTitleChange={(e) => setTitle(e.target.value)}
                onDescriptionChange={(e) => setDescription(e.target.value)}
                onCancel={handleCancel}
                onAddNote={editNoteId ? handleUpdateNote : handleAddNote}
                buttonLabel={editNoteId ? "Update" : "Add Note"}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen text-center px-4">
          <p className="text-lg text-gray-600">
            Please{' '}
            <Link to="/login" className="font-semibold text-indigo-600 underline">
              log in
            </Link>{' '}
            to view or add notes.
          </p>
        </div>
      )}
    </>
  );
};

export default Home;
