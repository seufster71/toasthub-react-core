export default function statusReducer(state = {}, action) {
  switch(action.type) {
    case 'SHOW_STATUS': {
      let myState = {};
      if(action.info != null) {
        myState.info = action.info;
      }
      return Object.assign({}, state, myState);
    }
    case 'SHOW_STATUS_ERROR': {
      let myState = {};
      if(action.error != null) {
        myState.error = action.error;
      }
      return Object.assign({}, state, myState);
    }
    default:
      return state;
  }
}
