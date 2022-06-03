import callService from '../api/api-call';
import fuLogger from '../common/fu-logger';

// action
export function loadMenus(responseJson) {
  return { type: "LOAD_MENUS", responseJson };
}

// thunk
export function getMenus() {
	return function(dispatch) {
	    let requestParams = {};
	    requestParams.action = "INIT_MENU";
	    requestParams.service = "PUBLIC_SVC";
	    requestParams.menuNames = new Array("PUBLIC_MENU_RIGHT");
	    let params = {};
	    params.requestParams = requestParams;
	    params.URI = '/api/public/callService';

    	return callService(params).then( (responseJson) => {
			fuLogger.log({level:'TRACE',loc:'PUBLIC_SVC::INIT_MENU::getMenus',msg:"Request "+JSON.stringify(responseJson)});
      		dispatch(loadMenus(responseJson));
		}).catch(error => {
			throw(error);
		});
  	};
}
