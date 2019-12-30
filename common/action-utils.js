import fuLogger from './fu-logger';

const checkConnectivity = (responseJson,dispatch) => {
	if (responseJson != null && responseJson.protocalError != null && responseJson.protocalError == 401){
		dispatch({ type: "PROCESS_LOGOUT" });
	} else {
		dispatch({type:'SHOW_STATUS_ERROR',error:[{code:"CONNECTIVITYFAILED",message:"Connectivity issue"}]});
	}
};



export default { checkConnectivity };
