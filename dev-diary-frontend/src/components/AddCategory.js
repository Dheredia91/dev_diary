import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../slices/categorySlice';

const AddCategory = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategory({ name }));
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategory;
