export default function loginReducer(state = {}, action) {
  switch(action.type) {
    case 'INIT_LOGIN':
      break;
    case 'SAVE_AUTHENTICATION': {
      let myState = {};
      debugger;
      if (action.responseJson != null && action.responseJson.params != null && action.responseJson.params.status != null
      && action.responseJson.params.status.info != null) {
        let status = action.responseJson.params.status.info;
        for (var i = 0; i < status.length; i++) {
          if (status[i].code === "success") {
            myState.currentPage = "member";
          }
        }
      }
      return Object.assign({}, state.appPrefs, myState);
    }
    
    default:
      return state;
  }
}
