export default function loginReducer(state = [], action) {
  switch(action.type) {
    case 'INIT_LOGIN':
      break;
    case 'SAVE_AUTHENTICATION': {
      let myState = {};

      return Object.assign({}, state, myState);
    }  
    default:
      return state;
  }
}
