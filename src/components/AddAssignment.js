import React, { Component } from 'react';
import {SERVER_URL} from '../constants.js'
import Cookies from 'js-cookie';

export default class AddAssignment extends Component {

	constructor(properties) {
		super(properties);

		this.state = { name: '', dueDate: '', course: ''};

		this.onSubmit = this.onSubmit.bind(this);
	}

	render() {
		return(
			<div>
				<h3>Add Assignment</h3>
				<form onSubmit={this.onSubmit}>
					<label style={{ display: 'block' }}>
						Name: <input id="name" type="text"></input>
					</label>
					<label style={{ display: 'block' }}>
						Due Date: <input id="dueDate" type="date"></input>
					</label>
					<label style={{ display: 'block' }}>
						Course: <input id="course" type="text"></input>
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
		)
	}

	onSubmit(event) {
		event.preventDefault();
		this.state.name = event.target.name.value;
		this.state.dueDate = event.target.dueDate.value;
		this.state.course = event.target.course.value;
		this.postAssignment();
	}

	postAssignment = () => {
		const token = Cookies.get('XSRF-TOKEN');
		fetch(`${SERVER_URL}/gradebook/addAssignment`,
		  {
			 method: 'POST',
			 headers: {
				'X-XSRF-TOKEN': token,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			 },
			 body: JSON.stringify({
				'assignmentName': this.state.name,
				'dueDate': this.state.dueDate
			 })
		  }).then((response) => response.json())
		  .then((responseData) => {
			 console.log(responseData);
			 this.setState({ ...this.state, redirect: true });
		  }).catch(err => console.error(err));
	 };
}