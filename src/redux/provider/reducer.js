const initialState = {
  user: [],
  verified: false
};

export default function applicationReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case 'FIND_USER':
      const FIND_USER = { ...state, user: payload };
      return FIND_USER;
    case 'VERIFY_OTP':
      const VERIFY_OTP = { ...state, ...payload };
      return VERIFY_OTP;
    default:
      return state;
  }
}
