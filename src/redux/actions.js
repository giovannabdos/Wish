export const setUser = user => ({type: 'setUser', user});
export const setToken = token => ({type: 'setToken', token});
export const setMyDesires = myDesires => ({type: 'setMyDesires', myDesires});
export const setOtherDesires = otherDesires => ({
  type: 'setOtherDesires',
  otherDesires,
});
export const clearAll = () => ({type: 'clearAll'});
