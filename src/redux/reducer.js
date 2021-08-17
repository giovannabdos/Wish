import initialState from './initialState';

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
    case 'setMyDesires':
      return {
        ...currentState,
        myDesires: action.myDesires,
      };
    case 'setOtherDesires':
      return {
        ...currentState,
        otherDesires: action.otherDesires,
      };
    case 'clearAll':
      return {
        ...initialState,
      };
    default:
      return currentState;
  }
};
