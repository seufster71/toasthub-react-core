import callService from '../api/api';

// actions
export function initLogin(params) {
  return { type:'INIT_LOGIN', params };
}
export function saveLang() {
  return { type:'SAVE_LANG' };
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
      let params = {};
      if (responseJson != null && responseJson.params != null && responseJson.params.status != null) {
        if (responseJson.params.status.error != null) {
          dispatch({type:'SHOW_STATUS_ERROR',error:responseJson.params.status.error});
        } else if (responseJson.params.status.info != null) {
          let status = responseJson.params.status.info;
          for (let i = 0; i < status.length; i++) {
            if (status[i].code === "success") {
              params.currentPage = "member";
            }
          }
          dispatch({type:'PROCESS_NAV_CHANGE',params});
          dispatch({type:'SHOW_STATUS',info:responseJson.params.status.info});
        }
      }

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
      let params = {};
      if (responseJson != null && responseJson.params != null && responseJson.params.status != null) {
        if (responseJson.params.status.error != null) {
          dispatch({type:'SHOW_STATUS_ERROR',error:responseJson.params.status.error});
        } else if (responseJson.params.status.info != null) {
          let status = responseJson.params.status.info;
          for (let i = 0; i < status.length; i++) {
            if (status[i].code === "success") {
              params.currentPage = "login";
            }
          }
          dispatch({type:'PROCESS_NAV_CHANGE',params});
          dispatch({type:'SHOW_STATUS',info:responseJson.params.status.info});
        }
      }

    }).catch(error => {
      throw(error);
    });

  };
}

export function forgotPassword(inputFields) {
  return function(dispatch) {
    let requestParams = {};
    requestParams.action = "FORGOTPASSWORD";
    requestParams.service = "LOGIN_SVC";
    requestParams.appForms = ["FORGOTPASSWORD_FORM"];
    requestParams.inputFields = inputFields;
    let params = {};
    params.requestParams = requestParams;
    params.URI = '/api/login/callService';

    return callService(params).then( (responseJson) => {
      let params = {};
      if (responseJson != null && responseJson.params != null && responseJson.params.status != null) {
        if (responseJson.params.status.error != null) {
          dispatch({type:'SHOW_STATUS_ERROR',error:responseJson.params.status.error});
        } else if (responseJson.params.status.info != null) {
          let status = responseJson.params.status.info;
          for (let i = 0; i < status.length; i++) {
            if (status[i].code === "success") {
              params.currentPage = "login";
            }
          }
          dispatch({type:'PROCESS_NAV_CHANGE',params});
          dispatch({type:'SHOW_STATUS',info:responseJson.params.status.info});
        }
      }

    }).catch(error => {
      throw(error);
    });

  };
}
