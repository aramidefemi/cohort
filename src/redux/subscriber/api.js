

const api = (store) => (next) => async (action)  => {
  let response;
  switch (action.type) {
    default:
      return next(action);
  }
};

export default  api;