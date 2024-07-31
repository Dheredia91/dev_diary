import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '../slices/noteSlice';

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
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
