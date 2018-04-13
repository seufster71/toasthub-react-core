export default function appMenuReducer(state = {}, action) {
  let myState = {};
  switch(action.type) {
    case 'TEST': {
      return state;
    }
    default: {
      if (action.responseJson != null && action.responseJson.params != null && action.responseJson.params.MENUS != null) {
        const menus = action.responseJson.params.MENUS;
        for (let key in menus) {
          myState[key] = menus[key];
        }
        return Object.assign({}, state, myState);
      } else {
        return state;
      }
    }
  }
}
