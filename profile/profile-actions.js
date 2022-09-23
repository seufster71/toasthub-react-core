/*
 * Copyright (C) 2020 The ToastHub Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import callService from '../api/api-call';
import actionUtils from '../common/action-utils';

// action helpers



// thunks
export function init({lang}) {
  return function(dispatch) {
    let requestParams = {};
    requestParams.action = "INIT_PROFILE";
    requestParams.service = "MEMBER_SVC";
    requestParams.prefFormKeys = new Array("MEMBER_PROFILE_FORM");
    requestParams.prefTextKeys = new Array("MEMBER_PROFILE_PAGE");
    requestParams.prefLabelKeys = new Array("MEMBER_PROFILE_PAGE");
    requestParams.lang = lang;
    let params = {};
    params.requestParams = requestParams;
    params.URI = '/api/member/callService';

    return callService(params).then( (responseJson) => {
    	if (responseJson != null && responseJson.protocalError == null){
    		dispatch({ type: "LOAD_INIT_MEMBER_PROFILE", responseJson });
		} else {
			actionUtils.checkConnectivity(responseJson,dispatch);
		}
    }).catch(error => {
      throw(error);
    });

  };
}


export function saveItem({state}) {
	return function(dispatch) {
		let requestParams = {};
	    requestParams.action = "SAVE_PROFILE";
	    requestParams.service = "MEMBER_SVC";
	    requestParams.inputFields = state.inputFields;

	    let params = {};
	    params.requestParams = requestParams;
	    params.URI = '/api/member/callService';

	    return callService(params).then( (responseJson) => {
	    	if (responseJson != null && responseJson.protocalError == null){
	    		if(responseJson != null && responseJson.status != null && responseJson.status == "SUCCESS"){  
	    			dispatch({type:'MEMBER_PROFILE_UPDATE',memberState:state});
	    			dispatch({type:'SHOW_STATUS',info:responseJson.infos});
	    		} else if (responseJson != null && responseJson.status != null && responseJson.status == "ACTIONFAILED") {
	    			dispatch({type:'SHOW_STATUS',error:responseJson.errors});
	    		}
	    	} else {
	    		actionUtils.checkConnectivity(responseJson,dispatch);
	    	}
	    }).catch(error => {
	    	throw(error);
	    });
	};
}

export function modifyItem({id,appPrefs}) {
	return function(dispatch) {
	    let requestParams = {};
	    requestParams.action = "ITEM";
	    requestParams.service = "MEMBER_PROFILE_SVC";
	    requestParams.prefFormKeys = new Array("MEMBER_PROFILE_FORM");
	    if (id != null) {
	    	requestParams.itemId = id;
	    }
	    let params = {};
	    params.requestParams = requestParams;
	    params.URI = '/api/member/callService';

	    return callService(params).then( (responseJson) => {
	    	if (responseJson != null && responseJson.protocalError == null){
	    		dispatch({ type: 'MEMBER_PROFILE_ITEM',responseJson,appPrefs});
	    	} else {
	    		actionUtils.checkConnectivity(responseJson,dispatch);
	    	}
	    }).catch(error => {
	    	throw(error);
	    });
	};
}

export function inputChange(field,value) {
	 return function(dispatch) {
		 let params = {};
		 params.field = field;
		 params.value = value;
		 dispatch({ type:"MEMBER_PROFILE_INPUT_CHANGE",params});
	 };
}

export function selectChange({field,value}) {
	return function(dispatch) {
		let params = {};
		params.field = field;
		params.value = value;
		dispatch({ type:"MEMBER_PROFILE_INPUT_CHANGE",params});
	 };
}

export function orderBy({state,orderCriteria}) {
	 return function(dispatch) {
		 dispatch({ type:"MEMBER_PROFILE_ORDERBY",orderCriteria});
		 dispatch(list({state,orderCriteria}));
	 };
}

export function clearItem() {
	return function(dispatch) {
		dispatch({ type:"MEMBER_PROFILE_CLEAR_ITEM"});
	};
}

export function clearField(field) {
	return function(dispatch) {
		let params = {};
		 params.field = field;
		dispatch({ type:"MEMBER_PROFILE_CLEAR_FIELD",params});
	};
}
export function setErrors({errors}) {
	 return function(dispatch) {
		 dispatch({ type:"MEMBER_PROFILE_SET_ERRORS",errors});
	 };
}

export function openDeleteModal({item}) {
	 return function(dispatch) {
		 dispatch({type:"MEMBER_PROFILE_OPEN_DELETE_MODAL",item});
	 };
}

export function closeDeleteModal() {
	 return function(dispatch) {
		 dispatch({type:"MEMBER_PROFILE_CLOSE_DELETE_MODAL"});
	 };
}