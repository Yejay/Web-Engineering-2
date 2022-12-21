import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import * as authenticationActions from '../actions/AuthenticationActions';
import { bindActionCreators } from 'redux';

import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const mapStateToProps = (state) => {
	return state;
};

class UserSessionWidget extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userID: '',
			password: '',
		};
		this.state = { show: false };
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleShow(event) {
		event.preventDefault();
		const { showLoginDialogAction } = this.props;
		showLoginDialogAction();
	}

	handleClose() {
		const { hideLoginDialogAction } = this.props;
		hideLoginDialogAction();
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	handleSubmit(event) {
		event.preventDefault();
		const { userID, password } = this.state;
		const { authenticateUserAction } = this.props;
		authenticateUserAction(userID, password);
		console.log('Pushed submit');
	}

	handleLogout(event) {
		event.preventDefault();
		const { logoutButton } = this.props;
		logoutButton();
	}

	render() {
		let showDialog = this.props.showLoginDialog;
		if (showDialog === undefined) {
			showDialog = false;
		}

		const authButton = () => {
			if (this.props.user) {
				return (
					<Button id='LogoutButton' variant='primary' onClick={this.handleLogout}>
						Logout{' '}
					</Button>
				);
			} else {
				return (
					<ButtonGroup>
						<Button id='OpenLoginDialogButton' variant='primary' onClick={this.handleShow}>
							Login
						</Button>
						{/* <Button id="RegisterDialog" variant="primary">Signup</Button> */}
					</ButtonGroup>
				);
			}
		};

		return (
			<div>
				{authButton()}
				<Modal id='LoginDialog' show={showDialog} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title> Login Information</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group className='Form'>
								<Form.Label>Username</Form.Label>
								<Form.Control id='LoginDialogUserIDText' type='text' placeholder='Enter username' name='userID' onChange={this.handleChange} />
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Password</Form.Label>
								<Form.Control id='LoginDialogPasswordText' type='password' placeholder='Enter Password' name='password' onChange={this.handleChange} />
							</Form.Group>
							<Button id='PerformLoginButton' variant='primary' type='submit' onClick={this.handleSubmit}>
								Login
							</Button>
						</Form>{' '}
					</Modal.Body>
					<Modal.Footer>Forgot password?</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
			hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
			authenticateUserAction: authenticationActions.authenticateUser,
			logoutButton: authenticationActions.getLogoutAction,
		},
		dispatch
	);

const ConnectedUserSessionWidget = connect(mapStateToProps, mapDispatchToProps)(UserSessionWidget);

export default ConnectedUserSessionWidget;
