import React, { Component } from "react";
import { render } from "react-dom";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: "Type to search"
  };

  addNote = () => {
    let newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    this.setState({ notes: [newNote, ...this.state.notes] });
  };

  onType = (editId, updatedKey, updatedValue) => {
    // editId == id of the note that is edited
    // updatedKey == either the title or description field
    // updatedValue == new value of the title or description

    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if (!newSearchText) {
        //if no text in search bar, all notes should be displayed
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        //does title include what is being searched for -- match?
        const titleMatch = title.includes(newSearchText); //is T or F
        const descriptionMatch = description.includes(newSearchText); //is T or F
        /* if(titleMatch || descriptionMatch) {
          note.doesMatchSearch = true; //if included in title OR description, will be T
        } else {
          note.doesMatchSearch = false;
        }
        */
        const hasMatch = titleMatch || descriptionMatch; // will be equal to whatever it evaluates to -- T or F
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    this.setState({
      notes: updatedNotes,
      searchText: newSearchText
    });
  };

  deleteNote = (deletedId) => {
    const keptNotes = this.state.notes.filter((note) => note.id !== deletedId);
    this.setState({ notes: keptNotes });
  };

  componentDidUpdate() {
    const stateString = JSON.stringify(this.state);
    localStorage.setItem("stateString", stateString);
  }

  componentDidMount() {
    const stateString = localStorage.getItem("stateString");
    if (stateString) {
      const savedState = JSON.parse(stateString);
      this.setState(savedState);
    }
  }

  render() {
    return (
      <div>
        <Header
          searchText={this.state.searchText}
          addNote={this.addNote}
          onSearch={this.onSearch}
        />
        <NotesList
          notes={this.state.notes}
          onType={this.onType}
          deleteNote={this.deleteNote}
        />
      </div>
    );
  }
}

export default App;
