const initialState = {
  statistics: null,
  subscribers: null,
  subscriber: null,
  providers: null,
  provider: null,
  history: null
};

export default function applicationReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'UPDATE_ADMIN_STATE':
      const NEW_STATE = { ...state, ...payload };
      console.log('NEW_STATE',NEW_STATE)
      return NEW_STATE; 
    default:
      return state;
  }
}
