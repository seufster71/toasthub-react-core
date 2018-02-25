export default function navReducer(state = {}, action) {
  switch(action.type) {
    case 'PROCESS_NAV_CHANGE': {
      let myState = {};
      if(action.params != null) {
        myState.currentPage = action.params.currentPage;
      }
      return Object.assign({}, state, myState);
    }
    default:
      return state;
  }
}
