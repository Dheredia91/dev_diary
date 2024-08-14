import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../slices/noteSlice';

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories); 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNote({ title, content, category }));
    setTitle('');
    setContent('');
    setCategory('');

  };

  return (
    <form id="add-note-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Note Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Note Description</label>
        <textarea
          className="form-control"
          placeholder="Description"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>Category</label>
        <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default AddNote;
