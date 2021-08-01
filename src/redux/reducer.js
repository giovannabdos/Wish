export default (currentState, action) => {
  switch (action.type) {
    case 'setUser':
      return {
        ...currentState,
        user: action.user,
      };
    case 'setToken':
      return {
        ...currentState,
        token: action.token,
      };
    default:
      return currentState;
  }
};
