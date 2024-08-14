import React, { useState, useEffect } from 'react';
import AddNote from './AddNote';
import AddCategory from './AddCategory';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { deleteNote, toggleFavorite, fetchNotes } from '../slices/noteSlice';
import { deleteCategory, fetchCategories } from '../slices/categorySlice';

const Dashboard = () => {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const notes = useSelector((state) => state.notes.notes);
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotes());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleShowNoteModal = () => setShowNoteModal(true);
  const handleCloseNoteModal = () => setShowNoteModal(false);

  const handleShowCategoryModal = () => setShowCategoryModal(true);
  const handleCloseCategoryModal = () => setShowCategoryModal(false);

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteCategory(categoryId));
    setSelectedCategory('all'); // Reset to "All Notes" after deletion
  };

  const filteredNotes = selectedCategory === 'all' ? notes : notes.filter(note => note.category_name.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="page-content container note-has-grid">
      <ul className="nav nav-pills p-3 bg-white mb-3 rounded-pill align-items-center">
        <li className="nav-item">
          <Button
            onClick={() => handleCategoryClick('all')}
            className={`nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 ${selectedCategory === 'all' ? 'active' : ''}`}
          >
            <i className="icon-layers mr-1"></i><span className="d-none d-md-block">All Notes</span>
          </Button>
        </li>
        {categories.map((category) => (
          <li className="nav-item" key={category.id}>
            <Button
              onClick={() => handleCategoryClick(category.name)}
              className={`nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 ${selectedCategory === category.name ? 'active' : ''}`}
            >
              <i className={`icon-${category.icon} mr-1`}></i><span className="d-none d-md-block">{category.name}</span>
            </Button>
          </li>
        ))}
        <li className="nav-item ml-auto">
          <Button onClick={handleShowNoteModal} className="nav-link btn-primary rounded-pill d-flex align-items-center px-3" id="add-notes">
            <i className="icon-note m-1"></i><span className="d-none d-md-block font-14">Add Notes</span>
          </Button>
        </li>
        <li className="nav-item">
          <Button onClick={handleShowCategoryModal} className="nav-link btn-primary rounded-pill d-flex align-items-center px-3" id="add-category">
            <i className="icon-note m-1"></i><span className="d-none d-md-block font-14">Add Category</span>
          </Button>
        </li>
        {selectedCategory !== 'all' && (
          <li className="nav-item">
            <Button onClick={() => handleDeleteCategory(categories.find(cat => cat.name === selectedCategory).id)} className="nav-link btn-danger rounded-pill d-flex align-items-center px-3">
              <i className="icon-trash m-1"></i><span className="d-none d-md-block font-14">Delete Category</span>
            </Button>
          </li>
        )}
      </ul>

      <div className="tab-content bg-transparent">
        <div id="note-full-container" className="note-has-grid row">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`col-md-4 single-note-item all-category note-${note.category_name.toLowerCase()} ${note.isFavorite ? 'note-favorite' : ''}`}
            >
              <div className="card card-body">
                <span className="side-stick"></span>
                <div className="note-title-date">
                  <h5 className="note-title text-truncate mb-0">{note.title}</h5>
                  <p className="note-date font-12 text-muted">{new Date(note.created_at).toLocaleDateString()}</p>
                </div>
                <div className="note-content">
                  <p className="note-inner-content text-muted">{note.content}</p>
                </div>
                <div className="d-flex align-items-center">
                  <span className="mr-1">
                    <i
                      className={`fa fa-star favorite-note ${note.isFavorite ? 'text-warning' : ''}`}
                      onClick={() => handleToggleFavorite(note.id)}
                    ></i>
                  </span>
                  <span className="mr-1">
                    <i className="fa fa-trash remove-note" onClick={() => handleDeleteNote(note.id)} style={{ color: 'red' }}></i>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding Notes */}
      <Modal show={showNoteModal} onHide={handleCloseNoteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddNote />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNoteModal}>Discard</Button>
          <Button form="add-note-form" type="submit" variant="info" onClick={handleCloseNoteModal}>Add</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Adding Categories */}
      <Modal show={showCategoryModal} onHide={handleCloseCategoryModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCategory />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCategoryModal}>Discard</Button>
          <Button form="add-category-form" type="submit" variant="info" onClick={handleCloseCategoryModal}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
