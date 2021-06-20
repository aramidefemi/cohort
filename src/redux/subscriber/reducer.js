const initialState = {
  subscription: {
    active: false,
  },
  plan: null,
  payment_history: null,
  group: null
};

export default function applicationReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case 'UPDATE_SUBSCRIBER_STATE': 
    console.log('payload',payload)
      const new_state = { ...state, ...payload };
      return new_state;
    default:
      return state;
  }
}
