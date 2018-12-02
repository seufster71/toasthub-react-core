export default function appPrefReducer(state = {}, action) {
  let myState = {};
  switch(action.type) {
    case 'USER_PREF_CHANGE': {
      return processUserPref(state,action);
    }
    default:
      return state;
  }
}

const processUserPref= (state,action) => {
  let key = "unknown";
  if (action.userPrefChange != null && action.userPrefChange.page != null) {
    key = action.userPrefChange.page;
    let myPrefs = {};
    if (action.userPrefChange.pageState != null) {
      myPrefs.pageState = action.userPrefChange.pageState;
    }
    if (action.userPrefChange.pageLimit != null) {
      myPrefs.pageLimit = action.userPrefChange.pageLimit;
    }
    if (action.userPrefChange.orderCriteria != null) {
        myPrefs.orderCriteria = action.userPrefChange.orderCriteria;
    }

    return Object.assign({}, state, {
      [key]: Object.assign({}, state[key], myPrefs),
    });
  } else {
    return state;
  }
};
