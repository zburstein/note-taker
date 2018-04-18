import React, { Component } from 'react';
import '../Draft.css';
import {Editor, EditorState} from 'draft-js';



class NoteEditor extends Component {
/*
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
    return (
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
    );
  }
*/


	render() {
		const id = this.props.currentNote.id;
		return(
			<div className="note-editor">
				<div className="form-group">
					<label>Title</label>
					<input name="title" className="title-editor form-control" placeholder="Title" value={this.props.currentNote.title} onChange={this.props.handleChange} onBlur={() => this.props.updateNote(this.props.currentNote)}/>
				</div>
				<div className="form-group">
					<label>Content</label>
					<textarea name="content"className="content-editor form-control" placeholder="Content" value={this.props.currentNote.content} onChange={this.props.handleChange} onBlur={() => this.props.updateNote(this.props.currentNote)}/>
				</div>
			</div>
		);
	}

}

export default NoteEditor