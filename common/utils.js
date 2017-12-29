import React from 'react';
import PropTypes from 'prop-types';


const validateFields = (state,fields,lang,languages,group,prefix) => {
  let isValid = true;
  let errorMap = {};
  for( let i = 0, len = fields.length; i < len; i++ ) {
    if(fields[i].rendered ) {
      switch (fields[i].fieldType) {
        case "MTXT": {
          if (fields[i].required){
            for(let j=0;j<languages.length;j++){
              let fieldName = fields[i].name;
              if (prefix != null) {
                fieldName = prefix.concat("-").concat(fieldName);
              }
              let fieldValue = state[fieldName.concat("-").concat(languages[j].code)];
              if (fieldValue == null || (fieldValue != null && fieldValue == "")){
                  isValid = false;
                  errorMap[fieldName.concat("-").concat(languages[j].code)] = "required";
              }
            }
          }
          break;
        }
        case "TXT": {
          let fieldName = fields[i].name;
          if (prefix != null) {
            fieldName = prefix.concat("-").concat(fieldName);
          }
          let fieldValue = state[fieldName];

          let requiredError = false;
          if (fields[i].required){
            if (fieldValue == null || (fieldValue != null && fieldValue == "")){
              isValid = false;
              requiredError = true;
              errorMap[fieldName] = "required";
            }
          }
          if (requiredError == false && fields[i].validation != null && fields[i].validation != "") {
            let validateParams = JSON.parse(fields[i].validation);
            if (validateParams.regex != null && validateParams.regex != ""){
              let regex = new RegExp(validateParams.regex);
              if (regex != null && regex.exec(fieldValue) != null) {
                // do nothing
              } else {
                isValid = false;
                errorMap[fieldName] = validateParams.errorMsg;
              }
            }
          }
          break;
        }
        case "TXTA": {
          if (fields[i].required){
            let fieldName = fields[i].name;
            if (prefix != null) {
              fieldName = prefix.concat("-").concat(fieldName);
            }
            let fieldValue = state[fieldName];
            if (fieldValue == null || (fieldValue != null && fieldValue == "")){
              isValid = false;
              errorMap[fieldName] = "required";
            }
          }
          break;
        }
        case "BLN": {
          break;
        }
        case "LTXT": {
          if (fields[i].required){
            for(let j=0;j<languages.length;j++){
              let fieldName = fields[i].name;
              if (prefix != null) {
                fieldName = prefix.concat("-").concat(fieldName);
              }
              let fieldValue = state[fieldName.concat("-").concat(languages[j].code)];
              if (languages[j].title.langTexts != null){
                for(let k=0;k<languages[j].title.langTexts.length;k++){
                  if (languages[j].title.langTexts[k].lang == lang && languages[j].code == lang){
                    if (fieldValue == null || (fieldValue != null && fieldValue == "")){
                      isValid = false;
                      errorMap[fieldName] = "required";
                    }
                  }
                }
              }
            }
          }
          break;
        }
        case "MDLSNG": {
          if (fields[i].required){
            let fieldName = fields[i].name;
            if (prefix != null) {
              fieldName = prefix.concat("-").concat(fieldName);
            }
            let fieldValue = state[fieldName];
            if (fieldValue == null || (fieldValue != null && fieldValue == "")){
              isValid = false;
              errorMap[fieldName] = "required";
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
  return {isValid:isValid,errorMap:errorMap};
}; // validateFields

const marshallFields = (state,fields,myObj,languages,prefix) => {
  let resultObj = {};
  for( let i = 0, len = fields.length; i < len; i++ ) {
    if(fields[i].rendered) {
      let input = "";
      let fieldName = fields[i].name;
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
