import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, deleteNote  } from '../slices/noteSlice';
import AddNote from './AddNote';

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const loading = useSelector((state) => state.notes.loading);
  const error = useSelector((state) => state.notes.error);

  // need to use useEffect hook to synchornize component with external system (Redux)
  // this calls dispatch to start the process of communicating with the API (see fetchNotes in noteSlice)
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  if (loading){
    return <p>Loading...</p>;
  } 
  if (error){
    return <p>Error: {error}</p>;
  } 

  // using jsx here to map notes to a list
  return (
    <div>
      <h1>Notes</h1>
      <AddNote /> {/* Add the AddNote component here */}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>Category: {note.category_name}</p>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
