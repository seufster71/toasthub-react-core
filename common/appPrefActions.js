import callService from '../api/api';

// action
export function loadInitPublic(responseJson) {
  return { type: "LOAD_INIT_PUBLIC", responseJson };
}

export function loadInitMember(responseJson) {
  return { type: "LOAD_INIT_MEMBER", responseJson };
}

// thunk
export function initPublic() {
  return function(dispatch) {
    let requestParams = {};
    requestParams.action = "INIT";
    requestParams.service = "PUBLIC_SVC";
    requestParams.appForms = new Array("LOGIN_FORM","REGISTRATION_FORM","FORGOTPASSWORD_FORM","PASSWORD_CHANGE_FORM");
    requestParams.appTexts = new Array("GLOBAL_PAGE","LOGIN_FORM","REGISTRATION_FORM","FORGOTPASSWORD_FORM","PASSWORD_CHANGE_FORM");
    requestParams.appLabels = new Array("LOGIN_FORM","REGISTRATION_FORM","FORGOTPASSWORD_FORM");
    requestParams.appOptions = new Array("REGISTRATION_FORM");
    requestParams.appGlobal = new Array("LANGUAGES");
    requestParams.menuNames = new Array("PUBLIC_MENU_RIGHT");
    let params = {};
    params.requestParams = requestParams;
    params.URI = '/api/public/callService';

    return callService(params).then( (responseJson) => {
      dispatch(loadInitPublic(responseJson));
    }).catch(error => {
      throw(error);
    });

  };
}

export function initMember() {
  return function(dispatch) {
    let requestParams = {};
    requestParams.action = "INIT";
    requestParams.service = "MEMBER_SVC";
    //requestParams.appForms = new Array("LOGIN_FORM","REGISTRATION_FORM","FORGOTPASSWORD_FORM","PASSWORD_CHANGE_FORM");
    requestParams.appTexts = new Array("MEMBER_PAGE");
    requestParams.menuNames = new Array("MEMBER_MENU_TOP");
    let params = {};
    params.requestParams = requestParams;
    params.URI = '/api/member/callService';

    return callService(params).then( (responseJson) => {
      dispatch(loadInitMember(responseJson));
    }).catch(error => {
      throw(error);
    });

  };
}
