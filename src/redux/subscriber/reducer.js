const initialState = {
  aside: { which: '', data: {} },
  token: null,
  user: {},
};

export default function applicationReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case 'OPEN_ASIDE':
      const aside = { ...state, aside: payload };
      return aside;
    case 'LOGIN':
      const user = { ...state, ...payload };
      return user;
    default:
      return state;
  }
}
