import callService from '../api/Api';

// actions
export function initLogin(params) {
  return { type:'INIT_LOGIN', params };
}
export function saveLang() {
  return { type:'SAVE_LANG' };
}

export function processAuthentication(params) {
  return { type:'SAVE_NAV_CHANGE', params };
}

export function processRegistration(params) {
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
      dispatch(processAuthentication({currentPage:currentPage}));
    }).catch(error => {
      throw(error);
    });

  };
}

export function register(inputFields) {
  return function(dispatch) {
    let requestParams = {};
    requestParams.action = "REGISTERFULL";
    requestParams.service = "LOGIN_SVC";
    requestParams.appForms = ["REGISTRATION_FORM"];
    requestParams.inputFields = inputFields;
    let params = {};
    params.requestParams = requestParams;
    params.URI = '/api/login/callService';

    return callService(params).then( (responseJson) => {
      let currentPage = "";
      if (responseJson != null && responseJson.params != null && responseJson.params.status != null
      && responseJson.params.status.info != null) {
        let status = responseJson.params.status.info;
        for (var i = 0; i < status.length; i++) {
          if (status[i].code === "success") {
            currentPage = "registerEmailCheck";
          } else {
            currentPage = "login";
          }
        }
      }
      dispatch(processRegistration({currentPage:currentPage}));
    }).catch(error => {
      throw(error);
    });

  };
}
