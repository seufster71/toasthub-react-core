export default function appMenuReducer(state = {}, action) {
  switch(action.type) {
    case 'LOAD_MENUS': {
      let myState = {};
      if (action.responseJson != null && action.responseJson.params != null) {
        if (action.responseJson.params.MENUS != null) {
          myState.menus = {};
          if (action.responseJson.params.MENUS.PUBLIC_MENU_RIGHT != null) {
            myState.menus.PUBLIC_MENU_RIGHT = action.responseJson.params.MENUS.PUBLIC_MENU_RIGHT;
          }
          if (action.responseJson.params.MENUS.PUBLIC_MENU_LEFT != null) {
            myState.menus.PUBLIC_MENU_LEFT = action.responseJson.params.MENUS.PUBLIC_MENU_LEFT;
          }
        }
        return Object.assign({}, state, myState);
      } else {
        return state;
      }

    }
    default:
      return state;
  }
}
