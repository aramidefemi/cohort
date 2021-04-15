const initialState = {
  subscription: {
    active: false,
  }
};

export default function applicationReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case 'GET_SUBSCRIPTION':
      const GET_SUBSCRIPTION = { ...state, subscription: payload };
      return GET_SUBSCRIPTION;
    default:
      return state;
  }
}
