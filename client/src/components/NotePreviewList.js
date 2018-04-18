import React, { Component } from 'react';
import NotePreview from './NotePreview';
import 'whatwg-fetch';

class NotePreviewList extends Component {

	render() {
		return(
			<div>
				{this.props.notes.map((note) => {
					return(
						<NotePreview key={note.id} note={note} chooseNote={this.props.chooseNote}/>	
					);
				})}		
			</div>
		)
	}
}

export default NotePreviewList