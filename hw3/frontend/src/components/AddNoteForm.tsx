import React, { useState } from 'react';
import axios from 'axios';

interface AddNoteFormProps {
  onAddNote: (note: { id: number; title: string; author: { name: string; email: string } | null; content: string }) => void;
  user: { name: string; email: string; username: string; token: string } | null;
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ onAddNote, user }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      alert('You must be logged in to add a note.');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        'http://localhost:3001/notes',
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log('New note added:', response.data);

      // Clear the form fields after successful submission
      setTitle('');
      setContent('');
      setIsAdding(false);

      // Pass the new note back to the parent component
      onAddNote(response.data);
    } catch (error) {
      console.error('Failed to add note:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setIsAdding(false);
  };

  return (
    <div>
      {isAdding ? (
        <form onSubmit={handleAddNote}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              name="text_title_new_note"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              name="text_input_new_note"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button name="text_input_save_new_note" type="submit" disabled={loading}>Save</button>
          <button name="text_input_cancel_new_note" type="button" onClick={handleCancel} disabled={loading}>Cancel</button>
        </form>
      ) : (
        <button name="add_new_note" type="button" onClick={() => setIsAdding(true)}>Add New Note</button>
      )}
    </div>
  );
};

export default AddNoteForm;
