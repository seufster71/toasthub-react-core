import callService from '../api/api-call';

// action

// thunk
export function initPublic() {
  return function(dispatch) {
    let requestParams = {};
    requestParams.action = "INIT";
    requestParams.service = "PUBLIC_SVC";
    requestParams.prefFormKeys = new Array("LOGIN_PAGE","REGISTRATION_PAGE","FORGOTPASSWORD_PAGE","PASSWORD_CHANGE_PAGE");
    requestParams.prefTextKeys = new Array("GLOBAL_PAGE","LOGIN_PAGE","REGISTRATION_PAGE","FORGOTPASSWORD_PAGE","PASSWORD_CHANGE_PAGE");
    requestParams.prefLabelKeys = new Array("LOGIN_PAGE","REGISTRATION_PAGE","FORGOTPASSWORD_PAGE");
    requestParams.prefOptionKeys = new Array("REGISTRATION_PAGE","GLOBAL_PAGE");
    requestParams.prefGlobal = new Array("LANGUAGES");
    requestParams.menuNames = new Array("PUBLIC_MENU_RIGHT");
    let params = {};
    params.requestParams = requestParams;
    params.URI = '/api/public/callService';

    return callService(params).then( (responseJson) => {
      dispatch({ type: "LOAD_INIT", responseJson });
    }).catch(error => {
      throw(error);
    });

  };
}
