const initialState = {
	form: {},
	user: JSON.parse(window.localStorage.getItem('user')) || {},
	token: window.localStorage.getItem('token') || null,
	computation: {
		Plan: null,
		Pricing: null,
	}
};

export default function authenticationReducer(state = initialState, { type, payload }) {
	switch (type) {
		case 'HANDLE_CHANGE':
			 const form = { ...state, form: { ...state.form, ...payload}}
			return form;
		case 'LOGIN':
			 const login = { ...state, ...payload}
			return login;
		case 'SAVE_USER':
			 const SAVE_USER = { ...state, ...payload}
			return SAVE_USER;
		case 'SUBMIT_FOR_COMPUTATION':
			 const SUBMIT_FOR_COMPUTATION = { ...state, ...payload}
			return SUBMIT_FOR_COMPUTATION;
		default:
			return state;
	}
}