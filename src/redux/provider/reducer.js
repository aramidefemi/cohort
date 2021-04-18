const initialState = {
  users: [],
};

export default function applicationReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case 'FIND_USER':
      const FIND_USER = { ...state, users: payload };
      return FIND_USER;
    default:
      return state;
  }
}
