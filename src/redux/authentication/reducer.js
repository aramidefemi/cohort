const initialState = {
	form: {

	}
};

export default function authenticationReducer(state = initialState, { type, payload }) {
	switch (type) {
		case 'HANDLE_CHANGE':
			 const form = { ...state, form: { ...state.form, ...payload}}
			return form;
		default:
			return state;
	}
}