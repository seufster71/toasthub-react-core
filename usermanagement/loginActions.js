import callService from '../api/Api';

// actions
export function initLogin(params) {
  return { type:'INIT_LOGIN', params };
}
export function saveLang() {
  return { type:'SAVE_LANG' };
}

export function saveAuthentication(params) {
  return { type:'SAVE_NAV_CHANGE', params };
}

// thunks
export function authenticate(inputFields) {
  return function(dispatch) {
    let requestParams = {};
    requestParams.action = "LOGINAUTHENTICATE";
    requestParams.service = "LOGIN_SVC";
    requestParams.appForms = ["LOGIN_FORM"];
    requestParams.inputFields = inputFields;
    let params = {};
    params.requestParams = requestParams;
    params.URI = '/api/login/authenticate';

    return callService(params).then( (responseJson) => {
      let currentPage = "";
      if (responseJson != null && responseJson.params != null && responseJson.params.status != null
      && responseJson.params.status.info != null) {
        let status = responseJson.params.status.info;
        for (var i = 0; i < status.length; i++) {
          if (status[i].code === "success") {
            currentPage = "member";
          }
        }
      }
      dispatch(saveAuthentication({currentPage:currentPage}));
    }).catch(error => {
      throw(error);
    });

  };
}
