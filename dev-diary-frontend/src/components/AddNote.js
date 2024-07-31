import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../slices/noteSlice';

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default form submission behavior
    dispatch(addNote({ title, content })); // dispatch addNote action with the note data
    setTitle(''); 
    setContent(''); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNote;
