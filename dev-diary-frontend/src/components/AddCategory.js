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
    <form onSubmit={handleSubmit} id="add-category-form">
      <div className="form-group">
        <label htmlFor="categoryName">Category Name</label>
        <input
          type="text"
          className="form-control"
          id="categoryName"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ display: 'none' }}>Add Category</button>
    </form>
  );
};

export default AddCategory;
