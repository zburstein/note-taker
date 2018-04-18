import React, { Component } from 'react';

class NotePreview extends Component {
	render() {
		var d = new Date(this.props.note.created_at);
		const date = (d.getMonth() + 1).toString() + "/" + d.getDate().toString() + "/" + d.getFullYear().toString();
		return(
			<div className="row navigator-row" onClick={() => this.props.chooseNote(this.props.note)}>
				<div className="col-12">
					<h2 className="note-title">{this.props.note.title ? this.props.note.title : "No Title"}</h2>
					<div>
						<span className="note-date">{date}</span>
						<span className="note-content-preview">{this.props.note.content? this.props.note.content : "No Content"}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default NotePreview