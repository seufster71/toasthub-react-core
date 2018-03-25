export default function appMenuReducer(state = {}, action) {
  switch(action.type) {
    case 'LOAD_INIT_PUBLIC': {
      let initPublicState = {};
      if (action.responseJson != null && action.responseJson.params != null) {
        if (action.responseJson.params.MENUS != null) {
          if (action.responseJson.params.MENUS.PUBLIC_MENU_RIGHT != null) {
            initPublicState.PUBLIC_MENU_RIGHT = action.responseJson.params.MENUS.PUBLIC_MENU_RIGHT;
          }
          if (action.responseJson.params.MENUS.PUBLIC_MENU_LEFT != null) {
            initPublicState.PUBLIC_MENU_LEFT = action.responseJson.params.MENUS.PUBLIC_MENU_LEFT;
          }
        }
        return Object.assign({}, state, initPublicState);
      } else {
        return state;
      }
    }
    case 'LOAD_INIT_MEMBER': {
      if (action.responseJson != null && action.responseJson.params != null) {
        let initMemberState = {};
        if (action.responseJson.params.MENUS != null) {
          const menus = action.responseJson.params.MENUS;
          for (const key of Object.keys(menus)) {
            initMemberState[key] = menus[key];
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
        return Object.assign({}, state, initMemberState);
      } else {
        return state;
      }
    }
    case 'LOAD_MENUS': {
      let myState = {};
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
