import {getDebugClient} from '../../App';

const log = (params) => {
	let x = getDebugClient();
	if (x != "" && params != null) {
		let showError = false;
		if (x === "TRACE" && (params.level === "TRACE" || params.level === "DEBUG" || params.level === "INFO"|| params.level === "WARN" || params.level === "ERROR")) {
			showError = true;
		} else if (x === "DEBUG" && (params.level === "ERROR" || params.level === "DEBUG" || params.level === "INFO" || params.level === "WARN")) {
			showError = true;
		} else if (x === "INFO" && (params.level === "ERROR" || params.level === "WARN" || params.level === "INFO")) {
			showError = true;
		} else if (x === "WARN" && (params.level === "ERROR" || params.level === "WARN" )) {
			showError = true;
		} else if (x === "ERROR" && params.level === "ERROR") {
			showError = true;
		}
	
		if (showError) {
			if (params.msgObj != null) {
				console.log(params.loc +"__"+ params.level +"__"+ params.msg +"  "+ params.msgObj);
	 		} else {
				console.log(params.loc +"__"+ params.level +"__"+ params.msg);
			}
		}
	}
};

export default {log};
