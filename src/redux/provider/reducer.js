const initialState = {
  user: {},
  subscription: {},
  found: false,
  verified: false,
  history: null,
  benefits: []
};

export default function applicationReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case 'FIND_USER':
      const FIND_USER = { ...state, ...payload };
      return FIND_USER;
    case 'VERIFY_OTP':
      const VERIFY_OTP = { ...state, ...payload };
      return VERIFY_OTP;
    case 'SAVE_RECORDS':
      return payload;
    default:
      return state;
  }
}
