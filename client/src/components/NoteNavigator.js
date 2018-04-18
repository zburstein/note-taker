import React, { Component } from 'react';
import NotePreviewList from './NotePreviewList';
import Toolbar from  './Toolbar';


class NoteNavigator extends Component {

	render() {
		//alert("navigator render");
		return(
			<div>
				<Toolbar searchValue={this.props.searchValue} addNote={this.props.addNote} deleteNote={this.props.deleteNote} searchForNote={this.props.searchForNote}/>
				<div className="note-previews">
					<NotePreviewList notes={this.props.notes} chooseNote={this.props.chooseNote}/>
				</div>
			</div>
		);
	}
}

export default NoteNavigator