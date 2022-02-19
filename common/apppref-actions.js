import callService from '../api/api-call';

// action

// thunk
export function initPublic() {
  return function(dispatch) {
    let requestParams = {};
    requestParams.action = "INIT";
    requestParams.service = "PUBLIC_SVC";
    requestParams.prefFormKeys = new Array("LOGIN_FORM","REGISTRATION_FORM","FORGOTPASSWORD_FORM","PASSWORD_CHANGE_FORM");
    requestParams.prefTextKeys = new Array("GLOBAL_PAGE","LOGIN_FORM","REGISTRATION_FORM","FORGOTPASSWORD_FORM","PASSWORD_CHANGE_FORM");
    requestParams.prefLabelKeys = new Array("LOGIN_FORM","REGISTRATION_FORM","FORGOTPASSWORD_FORM");
    requestParams.prefOptionKeys = new Array("REGISTRATION_FORM","GLOBAL_PAGE");
    requestParams.prefGlobal = new Array("LANGUAGES");
    requestParams.menuNames = new Array("PUBLIC_MENU_RIGHT");
    let params = {};
    params.requestParams = requestParams;
    params.URI = '/api/public/callService';

    return callService(params).then( (responseJson) => {
      dispatch({ type: "GLOBAL_INIT", responseJson });
    }).catch(error => {
      throw(error);
    });

  };
}
