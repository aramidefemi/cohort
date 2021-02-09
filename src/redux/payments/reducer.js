const initialState = {
  balance: 0
};

export default function applicationReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'GET_BALANCE':
      const balance = { ...state, ...payload };
      return balance; 
    default:
      return state;
  }
}
