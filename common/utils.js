import React from 'react';
import PropTypes from 'prop-types';


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
          let resultTXT = validateFieldTXT(params.state, field, fieldName);
          if (resultTXT.isValid == false) {
            isValidTmp = resultTXT.isValid;
          }
          errorMapTmp = Object.assign({}, errorMapTmp, resultTXT.errorMap);
          break;
        }
        case "TXTA": {
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
        default: {

          break;
        }
      }
    }
  }
  return {isValid:isValidTmp,errorMap:errorMapTmp};
}; // validateFields

const marshallFields = (state,fields,myObj,languages,prefix) => {
  let resultObj = {};
  for( let i = 0, len = fields.length; i < len; i++ ) {
    let field = fields[i];
    if(field.rendered) {
      let input = "";
      let fieldName = field.name;
      if (prefix != null) {
        fieldName = prefix.concat("-").concat(fieldName);
      }
      switch (fields[i].fieldType) {
        case "MTXT": {
          let ltxt = {};
          for(let j=0;j<languages.length;j++){
            if (languages[j].title.langTexts != null){
              for(let k=0;k<languages[j].title.langTexts.length;k++){
                ltxt[languages[j].code] = state[fieldName.concat("-").concat(languages[j].code)];
              }
            }
          }
          resultObj[fields[i].name] = ltxt;
          break;
        }
        case "TXT": {
          resultObj[fields[i].name] = state[fieldName];
          break;
        }
        case "TXTA": {
          break;
        }
        case "BLN": {
          if (fields[i].htmlType == "radioH"){
            resultObj[fields[i].name] = jQuery('#radio-'.concat(fieldName).concat(' label.active input')).val();
          }
          break;
        }
        case "MBLN": {
          if (fields[i].htmlType == "radioH"){
            let ltxt = {};
            for(let j=0;j<languages.length;j++){
              if (languages[j].title.langTexts != null){
                for(let k=0;k<languages[j].title.langTexts.length;k++){
                  ltxt[languages[j].code] = jQuery("#radio-".concat(fieldName).concat("-").concat(languages[j].code).concat(' label.active input')).val();
                }
              }
            }
            resultObj[fields[i].name] = ltxt;
          }
          break;
        }
        case "SLT": {
          resultObj[fields[i].name] = jQuery("#".concat(fieldName)).val();
          break;
        }
        case "LTXT": {
          let ltxt = {};
          for(let j=0;j<languages.length;j++){
            if (languages[j].title.langTexts != null){
              for(let k=0;k<languages[j].title.langTexts.length;k++){
                ltxt[languages[j].code] = jQuery("#".concat(fieldName).concat("-").concat(languages[j].code)).val();
              }
            }
          }
          resultObj[fields[i].name] = ltxt;
          break;
        }
        case "MDLSNG": {
          resultObj[fields[i].name] = state[fieldName];
          break;
        }
      }
    }
  }
  return resultObj;
}; // marshallFields

const validateFieldMTXT = (state, field, languages) => {
  let isValidMTXT = true;
  let errorMapMTXT = {};
  if (field.required){
    for(let j=0;j<languages.length;j++){
      let mtxtValue = state[field.name.concat("-").concat(languages[j].code)];
      if (mtxtValue == null || (mtxtValue != null && mtxtValue == "")){
          isValidMTXT = false;
          errorMapMTXT[field.name.concat("-").concat(languages[j].code)] = "required";
      } else {
        errorMapMTXT[field.name.concat("-").concat(languages[j].code)] = "";
      }
    }
  }
  return {isValid:isValidMTXT, errorMap:errorMapMTXT};
};

const validateFieldTXT = (state, field, fieldName) => {
  let isValidTXT = true;
  let txtValue = state[fieldName];
  let requiredError = false;
  let errorMapTXT = {};
  if (field.required){
    if (txtValue == null || (txtValue != null && txtValue == "")){
      isValidTXT = false;
      requiredError = true;
      errorMapTXT[field.name] = "required";
    } else {
      errorMapTXT[field.name] = "";
    }
  }
  if (requiredError == false && field.validation != null && field.validation != "") {
    let validateParams = JSON.parse(field.validation);
    if (validateParams.regex != null && validateParams.regex != ""){
      let regex = new RegExp(validateParams.regex);
      if (regex != null && regex.exec(txtValue) != null) {
        errorMapTXT[field.name] = "";
      } else {
        isValidTXT = false;
        errorMapTXT[field.name] = validateParams.errorMsg;
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
      errorMapTXTA[field.name] = "required";
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
              errorMapLTXT[field.name] = "required";
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
      errorMapMDLSNG[field.name] = "required";
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

export default { validateFields, marshallFields, getQueryStringValue};
