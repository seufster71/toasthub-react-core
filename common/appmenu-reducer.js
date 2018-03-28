export default function appMenuReducer(state = {}, action) {
  let myState = {};
  switch(action.type) {
    case 'LOAD_INIT_PUBLIC': {
      if (action.responseJson != null && action.responseJson.params != null) {
        if (action.responseJson.params.MENUS != null) {
          if (action.responseJson.params.MENUS.PUBLIC_MENU_RIGHT != null) {
            myState.PUBLIC_MENU_RIGHT = action.responseJson.params.MENUS.PUBLIC_MENU_RIGHT;
          }
          if (action.responseJson.params.MENUS.PUBLIC_MENU_LEFT != null) {
            myState.PUBLIC_MENU_LEFT = action.responseJson.params.MENUS.PUBLIC_MENU_LEFT;
          }
        }
        return Object.assign({}, state, myState);
      } else {
        return state;
      }
    }
    case 'LOAD_INIT_MEMBER': {
      if (action.responseJson != null && action.responseJson.params != null) {
        if (action.responseJson.params.MENUS != null) {
          const menus = action.responseJson.params.MENUS;
          for (let key in menus) {
            myState[key] = menus[key];
          }
          /*if (action.responseJson.params.MENUS.MEMBER_MENU_RIGHT != null) {
            initMemberState.MEMBER_MENU_RIGHT = action.responseJson.params.MENUS.MEMBER_MENU_RIGHT;
          }
          if (action.responseJson.params.MENUS.MEMBER_MENU_LEFT != null) {
            initMemberState.MEMBER_MENU_LEFT = action.responseJson.params.MENUS.MEMEBER_MENU_LEFT;
          }
          if (action.responseJson.params.MENUS.MEMBER_MENU_TOP != null) {
            initMemberState.MEMBER_MENU_TOP = action.responseJson.params.MENUS.MEMEBER_MENU_TOP;
          }*/
        }
        return Object.assign({}, state, myState);
      } else {
        return state;
      }
    }
    case 'LOAD_MENUS': {
      if (action.responseJson != null && action.responseJson.params != null) {
        if (action.responseJson.params.MENUS != null) {

          if (action.responseJson.params.MENUS.PUBLIC_MENU_RIGHT != null) {
            myState.PUBLIC_MENU_RIGHT = action.responseJson.params.MENUS.PUBLIC_MENU_RIGHT;
          }
          if (action.responseJson.params.MENUS.PUBLIC_MENU_LEFT != null) {
            myState.PUBLIC_MENU_LEFT = action.responseJson.params.MENUS.PUBLIC_MENU_LEFT;
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
