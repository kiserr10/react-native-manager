import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
	EMPLOYEE_UPDATE,
	EMPLOYEE_CREATE,
	EMPLOYEE_FETCH_SUCCESS,
	EMPLOYEE_SAVE_SUCCESS
} from './types';

export const employeeUpdate = ({ prop, value }) => {
	return {
		type: EMPLOYEE_UPDATE,
		payload: { prop, value }
	};
};

export const employeeCreate = ({ name, phone, shift }) => {
	const { currentUser } = firebase.auth();
	//Has uid property of current user//
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees`)
			.push({ name, phone, shift })
			.then(() => {
				dispatch({ type: EMPLOYEE_CREATE });
				Actions.employeeList({ type: 'reset' });
			});
	};
};

export const employeeFetch = () => {
	const { currentUser } = firebase.auth();
	return(dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees`)
			.on('value', snapshot => {
				dispatch({ type: EMPLOYEE_FETCH_SUCCESS, payload: snapshot.val() });
			});
	};
};

export const employeeSave = ({ name, phone, shift, uid }) => {
	const { currentUser } = firebase.auth();
	return(dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
			.set({ name, phone, shift })
			.then(() => {
				dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
				Actions.employeeList({ type: 'reset' });
			});
	};
};





/* Redux Thunk middleware allows you to write action creators that return a
function instead of an action. The thunk can be used to delay the dispatch
of an action, or to dispatch only if a certain condition is met.
The inner function receives the store methods dispatch and getState
as parameters. */
