import callService from '../api/api-call';

// actions
export function initLogin(params) {
  return { type:'INIT_LOGIN', params };
}
export function saveLang() {
  return { type:'SAVE_LANG' };
}

// thunks
export function authenticate(inputFields,lang) {
	return function(dispatch) {
		let requestParams = {};
		requestParams.action = "LOGINAUTHENTICATE";
		requestParams.service = "LOGIN_SVC";
		requestParams.prefFormKeys = ["LOGIN_FORM"];
		requestParams.lang = lang;
		let params = {};
		params.requestParams = requestParams;
		params.auth = Buffer.from(inputFields.LOGIN_FORM_USERNAME + ":" + inputFields.LOGIN_FORM_PASSWORD).toString('base64');
		params.URI = '/api/usermgmt/callService';

		return callService(params).then( (responseJson) => {
			let params = {};
			if (responseJson != null && responseJson.status != null && responseJson.status === "SUCCESS" && responseJson.protocalError == null && responseJson.errors == null) {
				dispatch({type:'SAVE_SESSION',responseJson});
				dispatch({type:'CLEAR_STATUS',responseJson});
			} else if (responseJson != null && responseJson.errors != null) {
				responseJson.status = "ERROR";
				dispatch({type:'SHOW_STATUS_ERROR', error:[responseJson.errors]});
				dispatch({type:'PROCESS_LOGOUT'});
			} else if (responseJson != null && responseJson.protocalError != null) {
				if (responseJson.protocalError >= 401) {
					dispatch({type:'SHOW_STATUS_ERROR',error:['User or password is incorrect.']});
				} else {
					dispatch({type:'SHOW_STATUS_ERROR',error:[responseJson.protocalError]});
				}
			}
		}).catch(error => {
			throw(error);
		});

	};
}

export function register(inputFields, lang) {
  return function(dispatch) {
    let requestParams = {};
    requestParams.action = "REGISTERFULL";
    requestParams.service = "LOGIN_SVC";
    requestParams.prefFormKeys = ["REGISTRATION_FORM"];
    requestParams.inputFields = inputFields;
    requestParams.lang = lang;
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
          //dispatch({type:'PROCESS_NAV_CHANGE',params});
          dispatch({type:'SHOW_STATUS',info:responseJson.params.status.info});
        }
      }

    }).catch(error => {
      throw(error);
    });

  };
}

export function forgotPassword(inputFields, lang) {
  return function(dispatch) {
    let requestParams = {};
    requestParams.action = "FORGOTPASSWORD";
    requestParams.service = "LOGIN_SVC";
    requestParams.prefFormKeys = ["FORGOTPASSWORD_FORM"];
    requestParams.inputFields = inputFields;
    requestParams.lang = lang;
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

export function logout() {
	return function(dispatch) {
		let requestParams = {};
		requestParams.action = "LOGOUT";
		requestParams.service = "MEMBER_SVC";
		let params = {};
		params.requestParams = requestParams;
		params.URI = '/api/member/callService';

		return callService(params).then( (responseJson) => {
			if (responseJson != null && responseJson.protocalError == null) {
				if (responseJson.status == "SUCCESS") {
					dispatch({ type: "PROCESS_LOGOUT", responseJson })
				} else if (responseJson.errors != null) {
					dispatch({type:'SHOW_STATUS_ERROR',errors:responseJson.errors});
				}
			}
		}).catch(error => {
			throw(error);
		});
	};

}
