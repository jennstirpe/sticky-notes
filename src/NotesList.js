import React from "react";
import Note from "./Note.js";

const NotesList = (props) => {
  const keepSearchMatches = (note) => note.doesMatchSearch; //will return any notes set to "true"
  const searchMatches = props.notes.filter(keepSearchMatches);

  const renderNote = (note) => (
    <Note
      note={note}
      key={note.id}
      onType={props.onType}
      deleteNote={props.deleteNote}
    />
  );
  const noteElements = searchMatches.map(renderNote);

  return <ul className="notes-list">{noteElements}</ul>;
};

export default NotesList;
