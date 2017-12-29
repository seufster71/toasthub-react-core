export default function appMenuReducer(state = {}, action) {
  switch(action.type) {
    case 'LOAD_INIT_PUBLIC': {
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
    case 'LOAD_INIT_MEMBER': {
      let myState = {};
      if (action.responseJson != null && action.responseJson.params != null) {
        if (action.responseJson.params.MENUS != null) {
          myState.menus = {};
          if (action.responseJson.params.MENUS.MEMBER_MENU_RIGHT != null) {
            myState.menus.MEMBER_MENU_RIGHT = action.responseJson.params.MENUS.MEMBER_MENU_RIGHT;
          }
          if (action.responseJson.params.MENUS.MEMBER_MENU_LEFT != null) {
            myState.menus.MEMBER_MENU_LEFT = action.responseJson.params.MENUS.MEMEBER_MENU_LEFT;
          }
        }
        return Object.assign({}, state, myState);
      } else {
        return state;
      }
    }
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
