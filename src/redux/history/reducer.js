const initialState = {
  history: [],
};

export default function applicationReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case 'FETCH_HISTORY':
      return { history: payload };
    default:
      return state;
  }
}
