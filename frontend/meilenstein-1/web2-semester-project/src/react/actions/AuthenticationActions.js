import base64 from 'base-64';
export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG';
export const HIDE_LOGIN_DIALOG = 'HIDE_LOGIN_DIALOG';
export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const AUTHENTICATION_LOGOUT = 'AUTHENTICATION_LOGOUT';

export function getShowLoginDialogAction() {
	return {
		type: SHOW_LOGIN_DIALOG,
	};
}

export function getHideLoginDialogAction() {
	return {
		type: HIDE_LOGIN_DIALOG,
	};
}

export function getAuthenticateUserPendingAction() {
	return {
		type: AUTHENTICATION_PENDING,
	};
}

export function getAuthenticationSuccessAction(userSession) {
	return {
		type: AUTHENTICATION_SUCCESS,
		user: userSession.user,
		accessToken: userSession.accessToken,
	};
}

export function getAuthenticationErrorAction(error) {
	return {
		type: AUTHENTICATION_ERROR,
		error: error,
	};
}

export function getLogoutAction() {
	return {
		type: AUTHENTICATION_LOGOUT,
	};
}

export function authenticateUser(userID, password) {
	return (dispatch) => {
		dispatch(getAuthenticateUserPendingAction());
		login(userID, password)
			.then(
				(userSession) => {
					const action = getAuthenticationSuccessAction(userSession);
					dispatch(action);
				},
				(error) => {
					dispatch(getAuthenticationErrorAction(error));
				}
			)
			.catch((error) => {
				dispatch(getAuthenticationErrorAction(error));
			});
	};
}

// Von Vasi
function login(userID, password) {
	const requestOptions = {
		method: 'GET',
		headers: {
			Authorization: 'Basic ' + base64.encode(userID + ':' + password),
		},
	};
	return fetch('https://localhost/api/authenticate', requestOptions)
		.then(handleResponse)
		.then((userSession) => {
			return userSession;
		});
}

function logout() {
	return (dispatch) => {
		dispatch(getLogoutAction());
	};
}

// Von Klinski
// function login(userIDm password) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userID, password })
//     };

//     return fetch('http://localhost:8080/login', requestOptions)
//         .then(handleResponse)
//         .then(userSession => {
//             return userSession;
//         })
// }

function handleResponse(response) {
	const authorizationHeader = response.headers.get('Authorization');

	return response.text().then((text) => {
		var data = text && JSON.parse(text);
		var token;
		if (authorizationHeader) {
			token = authorizationHeader.split(' ')[1];
		}

		if (!response.ok) {
			if (response.status === 401) {
				logout();
			}
			const error = (data && data.message) || response.status.text;
			return Promise.reject(error);
		} else {
			let userSession = {
				user: data,
				accessToken: token,
			};
			return userSession;
		}
	});
}

