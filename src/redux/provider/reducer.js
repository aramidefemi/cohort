const initialState = {
  user: {},
  found: false,
  verified: false
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
    default:
      return state;
  }
}
