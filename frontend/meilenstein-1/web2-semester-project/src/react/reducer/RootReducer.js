// import * as authenticationActions from '../actions/AuthenticationActions';

// const initialState = {
//     user: null,
//     loginPending: false,
//     showLoginDialog: false,
//     error: null
// };

// function rootReducer(state = initialState, action) {

//     switch (action.type) {
//         case authenticationActions.SHOW_LOGIN_DIALOG:
//             return {
//                 ...state,
//                 showLoginDialog: true,
//                 error: null
//             }
//         case authenticationActions.HIDE_LOGIN_DIALOG:
//             return {
//                 ...state,
//                 showLoginDialog: false,
//                 error: null
//             }
//         case authenticationActions.AUTHENTICATION_PENDING:
//             return {
//                 ...state,
//                 pending: true,
//                 error: null
//             }
//         case authenticationActions.AUTHENTICATION_SUCCESS:
//             {
//                 return {
//                     ...state,
//                     showLoginDialog: false,
//                     pending: false,
//                     user: action.user,
//                     accessToken: action.accessToken
//                 }
//             }
//         case authenticationActions.AUTHENTICATION_ERROR:
//             {
//                 return {
//                     ...state,
//                     pending: false,
//                     error: "Authentication failed"
//                 }
//             }
//         // von vasi
//         case authenticationActions.AUTHENTICATION_LOGOUT:
//             {
//                 return{
//                     ...state,
//                     user: null,
//                     accessToken: null
//                 }
//             }
//         default:
//             return state;
//     }
// };

// export default rootReducer;

import { SHOW_LOGIN_DIALOG, HIDE_LOGIN_DIALOG, AUTHENTICATION_PENDING, AUTHENTICATION_SUCCESS, AUTHENTICATION_ERROR, AUTHENTICATION_LOGOUT } from '../actions/AuthenticationActions';

const initialState = {
	user: null,
	loginPending: false,
	showLoginDialog: false,
	error: null,
};

function rootReducer(state = initialState, action) {
	// Don't delete. Shows action type in console.
	console.log('Bin im Reducer: ' + action.type);
	switch (action.type) {
		case SHOW_LOGIN_DIALOG:
			return {
				...state,
				showLoginDialog: true,
				error: null,
			};
		case HIDE_LOGIN_DIALOG:
			return {
				...state,
				showLoginDialog: false,
				error: null,
			};
		case AUTHENTICATION_PENDING:
			return {
				...state,
				loginPending: true,
				error: null,
			};
		case AUTHENTICATION_SUCCESS:
			return {
				...state,
				showLoginDialog: false,
				loginPending: false,
				user: action.user,
				accessToken: action.accessToken,
			};
		case AUTHENTICATION_ERROR:
			return {
				...state,
				loginPending: false,
				error: 'Authentication failed',
			};
		case AUTHENTICATION_LOGOUT:
			return {
				...state,
				user: null,
				accessToken: null,
			};
		default:
			return state;
	}
}

export default rootReducer;
