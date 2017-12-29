import callService from '../api/Api';

// actions
export function initLogin(params) {
  return { type:'INIT_LOGIN', params };
}
export function saveLang() {
  return { type:'SAVE_LANG' };
}

export function saveAuthentication(responseJson) {
  return { type:'SAVE_AUTHENTICATION', responseJson };
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
      dispatch(saveAuthentication(responseJson));
    }).catch(error => {
      throw(error);
    });

  };
}
