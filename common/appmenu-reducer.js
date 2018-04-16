export default function appMenuReducer(state = {}, action) {
  let myState = {};
  switch(action.type) {
    case 'LOAD_INIT_PUBLIC': {
      return processInit(state,action);
    }
    case 'LOAD_INIT_MEMBER':{
      return processInit(state,action);
    }
    case 'LOAD_INIT_ADMIN':{
      return processInit(state,action);
    }
    case 'TEST': {
      return state;
    }
    default: {
      return state;
    }
  }
}

const processInit = (state,action) => {
  if (action.responseJson != null && action.responseJson.params != null && action.responseJson.params.MENUS != null) {
    let myState = {};
    const menus = action.responseJson.params.MENUS;
    for (let key in menus) {
      myState[key] = menus[key];
    }
    return Object.assign({}, state, myState);
  } else {
    return state;
  }
};
