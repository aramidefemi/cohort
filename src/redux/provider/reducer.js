const initialState = {
  aside: { which: '', data: {} },
  token: window.localStorage.getItem('token') || null,
  user: JSON.parse(window.localStorage.getItem('user')) || {},
};

export default function applicationReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case 'OPEN_ASIDE':
      const aside = { ...state, aside: payload };
      return aside;
    case 'SIGN_IN':
      const user = { ...state, ...payload };
      return user;
    default:
      return state;
  }
}
