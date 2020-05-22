import React from 'react';
import {Route, Redirect} from 'react-router';
import PropTypes from 'prop-types';
import fuLogger from './fu-logger';


const validateFields = (params) => {
  //state,fields,lang,languages,group,prefix,fieldList
  let isValidTmp = true;
  let errorMapTmp = {};
  for( let i = 0, len = params.fields.length; i < len; i++ ) {
    let field = params.fields[i];
    if (params.fieldList != null && params.fieldList.indexOf(field.name) < 0){
      continue;
    }
    if(field.rendered) {
      let fieldName = field.name;
      if (params.prefix != null) {
        fieldName = params.prefix.concat("-").concat(fieldName);
      }
      switch (field.fieldType) {
        case "MTXT": {
          let resultMTXT = validateFieldMTXT(params.state, field, params.languages);
          if (resultMTXT.isValid == false) {
            isValidTmp = resultMTXT.isValid;
          }
          errorMapTmp = Object.assign({}, errorMapTmp, resultMTXT.errorMap);
          break;
        }
        case "TXT": {
          let resultTXT = validateFieldTXT(params, field, fieldName);
          if (resultTXT.isValid == false) {
            isValidTmp = resultTXT.isValid;
          }
          errorMapTmp = Object.assign({}, errorMapTmp, resultTXT.errorMap);
          break;
        }
        case "TXTAREA": {
          let resultTXTA = validateFieldTXTA(params.state, field);
          if (resultTXTA.isValid == false) {
            isValidTmp = resultTXTA.isValid;
          }
          errorMapTmp = Object.assign({}, errorMapTmp, resultTXTA.errorMap);
          break;
        }
        case "BLN": {
          break;
        }
        case "LTXT": {
          let resultLTXT = validateFieldLTXT(params.state, field, params.languages, params.lang);
          if (resultLTXT.isValid == false) {
            isValidTmp = resultLTXT.isValid;
          }
          errorMapTmp = Object.assign({}, errorMapTmp, resultLTXT.errorMap);
          break;
        }
        case "MDLSNG": {
          let resultMDLSNG = validateFieldMDLSNG(params.state, field);
          if (resultMDLSNG.isValid == false) {
            isValidTmp = resultMDLSNG.isValid;
          }
          errorMapTmp = Object.assign({}, errorMapTmp, resultMDLSNG.errorMap);
          break;
        }
        case "MGRP": {
        	break;
        }
        default: {

          break;
        }
      }
    }
  }
  return {isValid:isValidTmp,errorMap:errorMapTmp};
}; // validateFields

const marshallFields = (params) => {
	  //state,fields,myObj,languages,prefix
	  let resultObj = {};
	  for( let i = 0, len = params.fields.length; i < len; i++ ) {
	    let field = params.fields[i];
	    if(field.rendered) {
	      let input = "";
	      let fieldName = field.name;
	      if (params.prefix != null) {
	        fieldName = params.prefix.concat("-").concat(fieldName);
	      }
	      switch (params.fields[i].fieldType) {
	        case "MTXT": {
	          let ltxt = {};
	          for(let j=0;j<params.languages.length;j++){
	            if (params.languages[j].title.langTexts != null){
	              for(let k=0;k<params.languages[j].title.langTexts.length;k++){
	                ltxt[params.languages[j].code] = params.state[fieldName.concat("-").concat(params.languages[j].code)];
	              }
	            }
	          }
	          resultObj[params.fields[i].name] = ltxt;
	          break;
	        }
	        case "TXT": {
	          resultObj[params.fields[i].name] = params.state[fieldName];
	          break;
	        }
	        case "TXTAREA": {
	        	resultObj[params.fields[i].name] = params.state[fieldName];
	          break;
	        }
	        case "BLN": {
	          if (params.fields[i].htmlType == "radioH"){
	            resultObj[params.fields[i].name] = jQuery('#radio-'.concat(fieldName).concat(' label.active input')).val();
	          }
	          break;
	        }
	        case "MBLN": {
	          if (params.fields[i].htmlType == "radioH"){
	            let ltxt = {};
	            for(let j=0;j<params.languages.length;j++){
	              if (params.languages[j].title.langTexts != null){
	                for(let k=0;k<params.languages[j].title.langTexts.length;k++){
	                  ltxt[params.languages[j].code] = jQuery("#radio-".concat(fieldName).concat("-").concat(params.languages[j].code).concat(' label.active input')).val();
	                }
	              }
	            }
	            resultObj[params.fields[i].name] = ltxt;
	          }
	          break;
	        }
	        case "DATE": {
	        	resultObj[params.fields[i].name] = params.state[fieldName];
		        break;
	        }
	        case "SLT": {
	          resultObj[params.fields[i].name] = jQuery("#".concat(fieldName)).val();
	          break;
	        }
	        case "LTXT": {
	          let ltxt = {};
	          for(let j=0;j<params.languages.length;j++){
	            if (params.languages[j].title.langTexts != null){
	              for(let k=0;k<params.languages[j].title.langTexts.length;k++){
	                ltxt[params.languages[j].code] = jQuery("#".concat(fieldName).concat("-").concat(params.languages[j].code)).val();
	              }
	            }
	          }
	          resultObj[params.fields[i].name] = ltxt;
	          break;
	        }
	        case "MDLSNG": {
	          resultObj[params.fields[i].name] = params.state[fieldName];
	          break;
	        }
	        default: {

	          break;
	        }
	      }
	    }
	  }
	  return resultObj;
	}; // marshallFields



	const validateFieldTXT = (params, field, fieldName) => {
	  let isValidTXT = true;
	  let txtValue = params.state[fieldName];
	  let requiredError = false;
	  let errorMapTXT = {};
	  if (field.required){
	    if (txtValue == null || (txtValue != null && txtValue == "")){
	      isValidTXT = false;
	      requiredError = true;
	      errorMapTXT[field.name] = "Required";
	    } else {
	      errorMapTXT[field.name] = "";
	    }
	  }
	  if (requiredError == false && field.validation != null && field.validation != "") {
	    let validateParams = JSON.parse(field.validation);
	    if (validateParams.regex != null && validateParams.regex != ""){
	      let regex = new RegExp(validateParams.regex);
	      if (regex != null && regex.exec(txtValue) != null) {
	        // success
	        errorMapTXT[field.name] = "";
	        // clear sub errors
	        if (validateParams.onFail != null) {
	          let failRegexs = validateParams.onFail;
	          for(let j = 0; j < failRegexs.length; j++) {
	            errorMapTXT[failRegexs[j].link] = "SUCCESS";
	          }
	        }
	      } else {
	        // fail
	        if (validateParams.onFail != null) {
	          let failRegexs = validateParams.onFail;
	          for(let j = 0; j < failRegexs.length; j++) {
	            let fr = new RegExp(failRegexs[j].regex);
	            if (fr != null && fr.exec(txtValue) == null) {
	              // fail
	              errorMapTXT[failRegexs[j].link] = "ERROR";
	            } else {
	              errorMapTXT[failRegexs[j].link] = "SUCCESS";
	            }
	          }
	        }
	        isValidTXT = false;
	        errorMapTXT[field.name] = validateParams.errorMsg;
	      }
	    } else if (validateParams.operator != null) {
	      switch (validateParams.operator) {
	        case "equals": {
	          if (validateParams.matchField != null) {
	            let matchField = "";
	            if (params.prefix != null) {
	              matchField = params.prefix.concat("-").concat(validateParams.matchField);
	            }
	            let theField = params.state[matchField];
	            if (theField != null && txtValue === theField){
	              // success
	              errorMapTXT[field.name] = "";
	            } else {
	              // fail
	              isValidTXT = false;
	              errorMapTXT[field.name] = validateParams.errorMsg;
	            }
	          }
	          break;
	        }
	        default: {

	          break;
	        }
	      }
	    }
	  }
	  return {isValid:isValidTXT, errorMap:errorMapTXT};
	};

	const validateFieldTXTA = (state, field) => {
	  let isValidTXTA = true;
	  let errorMapTXTA = {};
	  if (field.required){
	    let txtaValue = state[field.name];
	    if (txtaValue == null || (txtaValue != null && txtaValue == "")){
	      isValidTXTA = false;
	      errorMapTXTA[field.name] = "Required";
	    } else {
	      errorMapTXTA[field.name] = "";
	    }
	  }
	  return {isValid:isValidTXTA, errorMap:errorMapTXTA};
	};

	const validateFieldLTXT = (state, field, languages, lang) => {
	  let isValidLTXT = true;
	  let errorMapLTXT = {};
	  if (field.required){
	    for(let j=0;j<languages.length;j++){
	      let ltxtValue = state[field.name.concat("-").concat(languages[j].code)];
	      if (languages[j].title.langTexts != null){
	        for(let k=0;k<languages[j].title.langTexts.length;k++){
	          if (languages[j].title.langTexts[k].lang == lang && languages[j].code == lang){
	            if (ltxtValue == null || (ltxtValue != null && ltxtValue == "")){
	              isValidLTXT = false;
	              errorMapLTXT[field.name] = "Required";
	            } else {
	              errorMapLTXT[field.name] = "";
	            }
	          }
	        }
	      }
	    }
	  }
	  return {isValid:isValidLTXT, errorMap:errorMapLTXT};
	};

	const validateFieldMDLSNG = (state, field) => {
		let isValidMDLSNG = true;
		let errorMapMDLSNG = {};
		if (field.required){
			let mdlValue = state[field.name];
			if (mdlValue == null || (mdlValue != null && mdlValue == "")){
				isValidMDLSNG = false;
				errorMapMDLSNG[field.name] = "Required";
			} else {
				errorMapMDLSNG[field.name] = "";
			}
		}
		return {isValid:isValidMDLSNG, errorMap:errorMapMDLSNG};
	};

	const getQueryStringValue = (paramName) => {
	  let p = escape(unescape(paramName));
	  let regex = new RegExp("[?&]".concat(p).concat("(?:=([^&]*))?","i"));
	  let match = regex.exec(window.location.search);
	  let value = null;
	  if( match != null ){
	    value = match[1];
	  }
	  return value;
	};

	const hasPermission = (permissions,code,rights) => {
	  if (rights == null) {
	    rights = "R";
	  }
	  //fuLogger.log({level:'TRACE',loc:'Utils::hasPermission',msg:"props code "+ code + " rights "+ rights});
	  let result = false;
	  if (permissions != null && code != null && permissions[code] != null) {
	    if (rights === "W" && permissions[code].rights === "W"){
	      result = true;
	    } else if (rights === "R" && (permissions[code].rights === "R" || permissions[code].rights === "W")) {
	      result = true;
	    }
	  }
	  return result;
	};

	const getListLimit = (appPrefs, listLimit, fieldName) => {
		let myListLimit = 20;
		if (listLimit == null){
			if(appPrefs != null && appPrefs.prefOptions != null && appPrefs.prefOptions.GLOBAL_PAGE != null &&
				appPrefs.prefOptions.GLOBAL_PAGE.GLOBAL_PAGE_PAGELIMIT != null) {
				if (appPrefs.prefOptions.GLOBAL_PAGE.GLOBAL_PAGE_PAGELIMIT.value != "") {
					myListLimit = parseInt(appPrefs.prefOptions.GLOBAL_PAGE.GLOBAL_PAGE_PAGELIMIT.value);
				} else if (appPrefs.prefOptions.GLOBAL_PAGE.GLOBAL_PAGE_PAGELIMIT.defaultValue != ""){
					myListLimit = parseInt(appPrefs.prefOptions.GLOBAL_PAGE.GLOBAL_PAGE_PAGELIMIT.defaultValue);
				}
			}
		}
		return myListLimit;
	};

	const inputChange = (props,fieldName,switchValue,viewType) => {
		let	value = null;
		if (props.codeType === 'NATIVE') {
			value = event.nativeEvent.text;
		} else {
			if (event != null) {
				if (event.target != null) {
					value = event.target.value;
				} else {
					value = event;
				}
			}
		}
		if (switchValue != null) {
			value = switchValue;
		}
		props.actions.inputChange(fieldName,value,viewType);
	};

	const onBlur = (props,fieldName) => {
		
	};

	export const PrivateRoute = ({component:Component, path:Path, permissions:Permissions, code:Code, minRights:MinRights, pathto:PathTo}) => (
	  <Route path={Path} render={(props) => (
	            hasPermission(Permissions,Code,MinRights)
	            ? <Component {...props}/>
	            : <Redirect to={PathTo}/>
	  )} />
	);

	const validateFormFields = (formFields, inputFields, languages, group) => {
		  
		let isValidTmp = true;
		let errorMapTmp = {};
		  
		if (formFields == null || inputFields == null){
			return {isValid:false};
		}
		let subGroups = [];
		// process main form
		for( let i = 0, len = formFields.length; i < len; i++ ) {
		    
			if (formFields[i].rendered) {
				if (group != null && group != "") {
					if (formFields[i].group != group){
						continue;
					}
				}
				if (formFields[i].subGroup != undefined && formFields[i].subGroup != ""){
	    			continue;
	    		}
				switch (formFields[i].fieldType) {
					case "MGRP": {
						subGroups.push(formFields[i]);
						break;
					}
			        case "MTXT": {
			        	// Default text
			        	let resultTXT = validateFormFieldTXT({field:formFields[i],value:inputFields[formFields[i].name.concat("-DEFAULT")],fieldName:formFields[i].name.concat("-DEFAULT")});
			        	if (resultTXT.isValid == false) {
			        		isValidTmp = resultTXT.isValid;
			        	}
			        	errorMapTmp = Object.assign({}, errorMapTmp, resultTXT.errorMap);
			        	// Multi Text
			        	let resultMTXT = validateFormFieldMTXT({field:formFields[i], inputFields, languages});
			        	if (resultMTXT.isValid == false) {
			        		isValidTmp = resultMTXT.isValid;
			        	}
			        	errorMapTmp = Object.assign({}, errorMapTmp, resultMTXT.errorMap);
			        	break;
			        }
			        case "TXT": {
			        	let resultTXT = validateFormFieldTXT({field:formFields[i],value:inputFields[formFields[i].name]});
			        	if (resultTXT.isValid == false) {
			        		isValidTmp = resultTXT.isValid;
			        	}
			        	errorMapTmp = Object.assign({}, errorMapTmp, resultTXT.errorMap);
			        	break;
			        }
			        case "TXTAREA": {
			        	let resultTXTA = validateFormFieldTXTA({field:formFields[i],value:inputFields[formFields[i].name]});
			        	if (resultTXTA.isValid == false) {
			        		isValidTmp = resultTXTA.isValid;
			        	}
			        	errorMapTmp = Object.assign({}, errorMapTmp, resultTXTA.errorMap);
			        	break;
			        }
			        case "BLN": {
			        	break;
			        }
			        case "DATE": {
			        	break;
			        }
			        case "MDLSNG": {
			        	let resultMDLSNG = validateFormFieldMDLSNG({field:formFields[i],value:inputFields[formFields[i].name]});
			        	if (resultMDLSNG.isValid == false) {
			        		isValidTmp = resultMDLSNG.isValid;
			        	}
			        	errorMapTmp = Object.assign({}, errorMapTmp, resultMDLSNG.errorMap);
			        	break;
			        }
			        case "SLT": {
			        	let resultSLT = validateFormFieldSLT({field:formFields[i],value:inputFields[formFields[i].name]});
			        	if (resultSLT.isValid == false) {
			        		isValidTmp = resultSLT.isValid;
			        	}
			        	errorMapTmp = Object.assign({}, errorMapTmp, resultSLT.errorMap);
			        	break;
			        }
			        default: {
			        	break;
			        }
				}
			}
		}
		// process sub form
		if (subGroups.length > 0) {
			for (let i = 0; i < subGroups.length; i++) {
				let groupName = "";
				let groupType = "";
				if (subGroups[i].classModel != undefined && subGroups[i].classModel.includes("{")) {
					let classModel = JSON.parse(subGroups[i].classModel);
					groupName = classModel.groupName;
					groupType = classModel.groupType;
				}
				if (groupType === "MULTI") {
					for (let l = 0; l < languages.length; l++) {
						let langRequired = false;
						if (languages[l].defaultLang) {
							langRequired = true;
						}
		    			for (let j = 0; j < formFields.length; j++) {
		    				if ( !(formFields[j].subGroup === groupName) ) {
		    	    			continue;
		    	    		}
		    					
		    				let fieldType = formFields[j].fieldType;
		    				let fieldName = formFields[j].name+"-"+languages[l].code;
		    				switch(fieldType) {
			    	    		case "TXT": {
			    	    			let resultTXT = validateFormFieldTXT({field:formFields[j],value:inputFields[fieldName],fieldName,langRequired});
			    		        	if (resultTXT.isValid == false) {
			    		        		isValidTmp = resultTXT.isValid;
			    		        	}
			    		        	errorMapTmp = Object.assign({}, errorMapTmp, resultTXT.errorMap);
			            			break;
			    	    		}
			    	    		case "SLT": {
			    	    			let resultSLT = validateFormFieldSLT({field:formFields[j],value:inputFields[fieldName],fieldName,langRequired});
			    		        	if (resultSLT.isValid == false) {
			    		        		isValidTmp = resultSLT.isValid;
			    		        	}
			    		        	errorMapTmp = Object.assign({}, errorMapTmp, resultSLT.errorMap);
			        				break;
			    	    		}
			    	    		case "BLN": {
			        				
			        				break;
			    	    		}
			    	    		default: {
			    	    			break;
			    	    		}
		    				}
		    			}
					}
				} else {
					for (let j = 0; j < formFields.length; j++) {
	    				if ( !(formFields[j].group === groupName) ) {
	    	    			continue;
	    	    		}
	    				let fieldType = formFields[j].fieldType;
	    				switch(fieldType) {
		    	    		case "TXT": {
		    	    			let resultTXT = validateFormFieldTXT({field:formFields[j],value:inputFields[formFields[j].name]});
		    		        	if (resultTXT.isValid == false) {
		    		        		isValidTmp = resultTXT.isValid;
		    		        	}
		    		        	errorMapTmp = Object.assign({}, errorMapTmp, resultTXT.errorMap);
		            			break;
		    	    		}
		    	    		case "SLT": {
		    	    			let resultSLT = validateFormFieldSLT({field:formFields[j],value:inputFields[formFields[j].name]});
		    		        	if (resultSLT.isValid == false) {
		    		        		isValidTmp = resultSLT.isValid;
		    		        	}
		    		        	errorMapTmp = Object.assign({}, errorMapTmp, resultSLT.errorMap);
		        				break;
		    	    		}
		    	    		case "BLN": {
		        				
		        				break;
		    	    		}
		    	    		default: {
		    	    			break;
		    	    		}
		        		}
	    			}
				}
			}
		}
		return {isValid:isValidTmp,errorMap:errorMapTmp};
	}; // validateFormFields

	const validateFormFieldTXT = ({field, value, fieldName, langRequired}) => {
		let isValidTXT = true;
		let requiredError = false;
		let errorMapTXT = {};
		(langRequired != null && langRequired == true)
		if (field.required ){
			if (langRequired == null || (langRequired != null && langRequired == true)) {
				if (value == null || (value != null && value == "")){
					isValidTXT = false;
					requiredError = true;
					if (fieldName != null) {
						errorMapTXT[fieldName] = "Required";
					} else {
						errorMapTXT[field.name] = "Required";
					}
			    } else {
			    	if (fieldName != null) {
			    		errorMapTXT[fieldName] = "";
			    	} else {
			    		errorMapTXT[field.name] = "";
			    	}
			    }
			}
		}
		if (requiredError == false && field.validation != null && field.validation != "") {
			let validateParams = JSON.parse(field.validation);
		    if (validateParams.regex != null && validateParams.regex != ""){
		    	let regex = new RegExp(validateParams.regex);
		    	if (regex != null && regex.exec(value) != null) {
		    		// success
		    		errorMapTXT[field.name] = "";
		    		// clear sub errors
		    		if (validateParams.onFail != null) {
		    			let failRegexs = validateParams.onFail;
		    			for(let j = 0; j < failRegexs.length; j++) {
		    				errorMapTXT[failRegexs[j].link] = "SUCCESS";
		    			}
		    		}
		    	} else {
		    		// fail
		    		if (validateParams.onFail != null) {
		    			let failRegexs = validateParams.onFail;
		    			for(let j = 0; j < failRegexs.length; j++) {
		    				let fr = new RegExp(failRegexs[j].regex);
		    				if (fr != null && fr.exec(value) == null) {
		    					// fail
		    					errorMapTXT[failRegexs[j].link] = "ERROR";
		    				} else {
		    					errorMapTXT[failRegexs[j].link] = "SUCCESS";
		    				}
		    			}
		    		}
		    		isValidTXT = false;
		    		if (fieldName != null) {
    		    		errorMapTXT[fieldName] = validateParams.errorMsg;
    		    	} else {
    		    		errorMapTXT[field.name] = validateParams.errorMsg;
    		    	}
		    	}
		    } else if (validateParams.operator != null) {
		    	switch (validateParams.operator) {
		        	case "equals": {
		        		if (validateParams.matchField != null) {
		        			let matchField = "";
		        			if (params.prefix != null) {
		        				matchField = params.prefix.concat("-").concat(validateParams.matchField);
		        			}
		        			let theField = params.state[matchField];
		        			if (theField != null && value === theField){
		        				// success
		        				if (fieldName != null) {
		        		    		errorMapTXT[fieldName] = "";
		        		    	} else {
		        		    		errorMapTXT[field.name] = "";
		        		    	}
		        			} else {
		        				// fail
		        				isValidTXT = false;
		        				if (fieldName != null) {
		        		    		errorMapTXT[fieldName] = validateParams.errorMsg;
		        		    	} else {
		        		    		errorMapTXT[field.name] = validateParams.errorMsg;
		        		    	}
		        			}
		        		}
		        		break;
		        	}
		        	default: {

		        		break;
		        	}
		    	}
		    }
		}
		return {isValid:isValidTXT, errorMap:errorMapTXT};
	}; // validateFormFieldTXT
	
	const validateFormFieldTXTA = ({field, value, fieldName, langRequired}) => {
		let isValidTXT = true;
		let requiredError = false;
		let errorMapTXT = {};
		(langRequired != null && langRequired == true)
		if (field.required ){
			if (langRequired == null || (langRequired != null && langRequired == true)) {
				if (value == null || (value != null && value == "")){
					isValidTXT = false;
					requiredError = true;
					if (fieldName != null) {
						errorMapTXT[fieldName] = "Required";
					} else {
						errorMapTXT[field.name] = "Required";
					}
			    } else {
			    	if (fieldName != null) {
			    		errorMapTXT[fieldName] = "";
			    	} else {
			    		errorMapTXT[field.name] = "";
			    	}
			    }
			}
		}
		if (requiredError == false && field.validation != null && field.validation != "") {
			let validateParams = JSON.parse(field.validation);
		    if (validateParams.regex != null && validateParams.regex != ""){
		    	let regex = new RegExp(validateParams.regex);
		    	if (regex != null && regex.exec(value) != null) {
		    		// success
		    		errorMapTXT[field.name] = "";
		    		// clear sub errors
		    		if (validateParams.onFail != null) {
		    			let failRegexs = validateParams.onFail;
		    			for(let j = 0; j < failRegexs.length; j++) {
		    				errorMapTXT[failRegexs[j].link] = "SUCCESS";
		    			}
		    		}
		    	} else {
		    		// fail
		    		if (validateParams.onFail != null) {
		    			let failRegexs = validateParams.onFail;
		    			for(let j = 0; j < failRegexs.length; j++) {
		    				let fr = new RegExp(failRegexs[j].regex);
		    				if (fr != null && fr.exec(value) == null) {
		    					// fail
		    					errorMapTXT[failRegexs[j].link] = "ERROR";
		    				} else {
		    					errorMapTXT[failRegexs[j].link] = "SUCCESS";
		    				}
		    			}
		    		}
		    		isValidTXT = false;
		    		if (fieldName != null) {
    		    		errorMapTXT[fieldName] = validateParams.errorMsg;
    		    	} else {
    		    		errorMapTXT[field.name] = validateParams.errorMsg;
    		    	}
		    	}
		    } else if (validateParams.operator != null) {
		    	switch (validateParams.operator) {
		        	case "equals": {
		        		if (validateParams.matchField != null) {
		        			let matchField = "";
		        			if (params.prefix != null) {
		        				matchField = params.prefix.concat("-").concat(validateParams.matchField);
		        			}
		        			let theField = params.state[matchField];
		        			if (theField != null && value === theField){
		        				// success
		        				if (fieldName != null) {
		        		    		errorMapTXT[fieldName] = "";
		        		    	} else {
		        		    		errorMapTXT[field.name] = "";
		        		    	}
		        			} else {
		        				// fail
		        				isValidTXT = false;
		        				if (fieldName != null) {
		        		    		errorMapTXT[fieldName] = validateParams.errorMsg;
		        		    	} else {
		        		    		errorMapTXT[field.name] = validateParams.errorMsg;
		        		    	}
		        			}
		        		}
		        		break;
		        	}
		        	default: {

		        		break;
		        	}
		    	}
		    }
		}
		return {isValid:isValidTXT, errorMap:errorMapTXT};
	}; // validateFormFieldTXTA

	const validateFormFieldMDLSNG = ({field, value}) => {
		let isValidMDLSNG = true;
		let errorMapMDLSNG = {};
		if (field.required){
			if (value == null || (value != null && value == "")){
				isValidMDLSNG = false;
				errorMapMDLSNG[field.name] = "Required";
			} else {
				errorMapMDLSNG[field.name] = "";
		    }
		}
		return {isValid:isValidMDLSNG, errorMap:errorMapMDLSNG};
	}; // validateFormFieldMDLSNG


	const validateFormFieldSLT = ({field, value, fieldName, langRequired}) => {
		let isValidSLT = true;
		let errorMapSLT = {};
		if (field.required){
			if (langRequired == null || (langRequired != null && langRequired == true)) {
			    if (value == null || (value != null && (value == "" || value == 0))){
			    	isValidSLT = false;
			    	if (fieldName != null) {
						errorMapSLT[fieldName] = "Required";
			    	} else {
			    		errorMapSLT[field.name] = "Required";
			    	}
			    	
			    } else {
			    	if (fieldName != null) {
						errorMapSLT[fieldName] = "";
			    	} else {
			    		errorMapSLT[field.name] = "";
			    	}
			    }
			}
		}
		return {isValid:isValidSLT, errorMap:errorMapSLT};
	}; //validateFormFieldSLT

	const validateFormFieldMTXT = ({field, inputFields, languages}) => {
		let isValidMTXT = true;
		let errorMapMTXT = {};
		// check if entire field is required
		if (field.required){
			for(let j=0;j<languages.length;j++){
				// check for default language
				if (languages[j].defaultLang) {
					let mtxtValue = inputFields[field.name.concat("-TEXT-").concat(languages[j].code)];
					if (mtxtValue == null || (mtxtValue != null && mtxtValue == "")){
						isValidMTXT = false;
						errorMapMTXT[field.name.concat("-TEXT-").concat(languages[j].code)] = "Required";
					} else {
						errorMapMTXT[field.name.concat("-TEXT-").concat(languages[j].code)] = "";
					}
				}
			}
		}
		return {isValid:isValidMTXT, errorMap:errorMapMTXT};
	}; // validateFormFieldMTXT

	const getMultiLangLabel = (item, lang) => {
		let label = item.title.defaultText;
		if (item.title.langTexts != null) {
			for (let j = 0; j < item.title.langTexts.length; j++) {
				if (item.title.langTexts[j].lang == lang) {
					label = item.title.langTexts[j].text;
				}
			}
		}
		return label;
	}; // getMultiLangLabel

	const debounce = (fn, ms) => {
		let timer;
		return _ => {
			clearTimeout(timer);
			timer = setTimeout(_ => {
				timer = null;
				fn.apply(this, arguments);
			}, ms);
		};
	}

export default { validateFields, validateFormFields, marshallFields, getQueryStringValue, hasPermission, getListLimit, getMultiLangLabel, inputChange, onBlur, debounce};
