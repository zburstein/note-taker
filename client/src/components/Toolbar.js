import React, { Component } from 'react';

class Toolbar extends Component {

	render() {
		return(
			<div className="row toolbar">
				<div className="col-8">
					<input id="noteSearch" className="form-control" type="search" placeholder="Search" aria-label="Search" value={this.props.searchValue} onChange={this.props.searchForNote}/>
				</div>
				<div className="col-2">
					<i className="fa fa-plus fa-2x clickable" aria-hidden="true" onClick={this.props.addNote}></i>
				</div>
				<div className="col-2">
					<i className="fa fa-trash fa-2x clickable" aria-hidden="true" onClick={this.props.deleteNote}></i>
				</div>
			</div>
		);
	}
}

export default Toolbar