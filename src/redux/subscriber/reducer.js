const initialState = {
  subscription: {
    active: false,
  },
  plan: null
};

export default function applicationReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case 'GET_SUBSCRIPTION':
      const GET_SUBSCRIPTION = { ...state, ...payload };
      return GET_SUBSCRIPTION;
    default:
      return state;
  }
}
