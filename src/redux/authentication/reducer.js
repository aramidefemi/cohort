const initialState = {
	form: {},
	user: JSON.parse(window.localStorage.getItem('user')) || {},
	token: window.localStorage.getItem('token') || null
};

export default function authenticationReducer(state = initialState, { type, payload }) {
	switch (type) {
		case 'HANDLE_CHANGE':
			 const form = { ...state, form: { ...state.form, ...payload}}
			return form;
		case 'LOGIN':
			 const login = { ...state, ...payload}
			return login;
		default:
			return state;
	}
}