import React, { Component } from 'react';
import NoteNavigator from './components/NoteNavigator';
import NoteEditor from './components/NoteEditor';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props){
    super(props);
    this.chooseNote = this.chooseNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.searchForNote = this.searchForNote.bind(this);

    this.state = {
      notes: [],
      currentNote: null,
      isSearching: false,
      searchValue: "",
      searchNotes: []
    };
  }

  searchForNote(event){
    var searchValue = event.target.value;
    var isSearching = !!searchValue;
    var previousSearch = this.state.searchValue;

    //if removing have to do it within whole notes
    if(isSearching){
      var regExp = new RegExp(searchValue, "i"); //establish reg expression for search

      //for faster search can use existing searchNote list if refining search 
      var searchNotes = (searchValue.length > previousSearch.length && previousSearch !== "") ? this.noteFilter(this.state.searchNotes, regExp) : this.noteFilter(this.state.notes, regExp);      
      var currentNote = searchNotes[0];
    }
    //if not searching then empty searchNotes
    else{
      var searchNotes = [];
      var currentNote = this.state.notes[0];
    }

    this.setState({
      isSearching: isSearching,
      searchValue: searchValue,
      searchNotes: searchNotes,
      currentNote: currentNote
    });

  }

  noteFilter(list, regExp){
    var searchNotes = list.filter(function(note){
      if(note.title.search(regExp) !== -1 || note.content.search(regExp) !== -1){
        return note;
      }
    });
    return searchNotes;
  }

  componentDidMount(){
    axios.get('https://obscure-ridge-10015.herokuapp.com/notes')
    .then(response => {
      console.log(response);
      this.setState({
        notes: response.data,
        currentNote: response.data[0] //mutable*****************
      });
    })
    .catch(error => console.log(error));
  }

  addNote(){
    var notes = this.state.notes.slice();
    axios.post(
      'https://obscure-ridge-10015.herokuapp.com/notes',
      {
        note:
          {
            title: '',
            content: ''
          }
      })
    .then(response => {
      console.log(response.data);
      const newNote = response.data;
      notes.unshift(newNote); //mutable
      this.setState({
        notes: notes,
        currentNote: newNote,
        searchValue: "",
        isSearching: false,
        searchNotes: []
      });
    })
    .catch(error => console.log(error));
  }

  chooseNote(note){
    //mutable
    this.setState({currentNote: note});
  }

  editNote(event){
    var currentNote = this.state.currentNote; //mutable***********
    currentNote[event.target.name] = event.target.value;
    this.setState({currentNote: currentNote});
  }

  //this is infinithe looping for some reason
  updateNote(note){
      //a check to see if its changed before putting in the request. this requires immutability i think
    //mutable****************
    axios.put(
      `https://obscure-ridge-10015.herokuapp.com/notes/${note.id}`,
      {
        note: note
      })
    .then(response => {
      console.log(response);
      //should i take the response and update the note? Or is that redundant
    })
    .catch(error => console.log(error));
    
  }

  //what if delete on search
  deleteNote(){
    const noteToDelete = this.state.currentNote;
    var notes = this.state.notes.slice();

    axios.delete(
      `https://obscure-ridge-10015.herokuapp.com/notes/${noteToDelete.id}`,
      {
        note: noteToDelete
      })
    .then(response => {
      //if deleted note while searching
      if(this.state.isSearching){
        var searchNotes = this.state.searchNotes;

        //have to remove from search notes and from total notes
        const newNotes = notes.filter(function(x){
          return x.id != noteToDelete.id; 
        });
        const searchNotes = searchNotes.filter(function(x){
          return x.id != noteToDelete.id;
        })

        //set the new note
        const currentNote = searchNotes.length ? searchNotes[0] : null;

        //set state
        this.setState({
          notes: newNotes,
          searchNotes: searchNotes,
          currentNote: currentNote
        })
      }

      //if deleted while not searching just remove from notes
      else{
        const newNotes = notes.filter(function(x){
          return x.id != noteToDelete.id; 
        });

        //set the current note
        const currentNote = newNotes.length ? newNotes[0] : null;
        this.setState({
          notes: newNotes,
          currentNote: currentNote
        });
      }




    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <NoteNavigator notes={this.state.isSearching ? this.state.searchNotes : this.state.notes} searchValue={this.state.searchValue} chooseNote={this.chooseNote} addNote={this.addNote} deleteNote={this.deleteNote} searchForNote={this.searchForNote}/>
            </div>
            <div className="col-9">
              { this.state.currentNote &&
                <NoteEditor currentNote={this.state.currentNote} handleChange={this.editNote} updateNote={this.updateNote}/>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
