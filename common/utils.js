import React from 'react';
import PropTypes from 'prop-types';


const validateFields = (state,fields,lang,languages,group,prefix) => {
  let isValidTmp = true;
  let errorMapTmp = {};
  for( let i = 0, len = fields.length; i < len; i++ ) {
    let field = fields[i];
    if(field.rendered) {
      let fieldName = field.name;
      if (prefix != null) {
        fieldName = prefix.concat("-").concat(fieldName);
      }
      switch (field.fieldType) {
        case "MTXT": {
          if (field.required){
            for(let j=0;j<languages.length;j++){
              let mtxtValue = state[fieldName.concat("-").concat(languages[j].code)];
              if (mtxtValue == null || (mtxtValue != null && mtxtValue == "")){
                  isValidTmp = false;
                  errorMapTmp[fieldName.concat("-").concat(languages[j].code)] = "required";
              }
            }
          }
          break;
        }
        case "TXT": {
          let txtValue = state[fieldName];
          let requiredError = false;
          if (field.required){
            if (txtValue == null || (txtValue != null && txtValue == "")){
              isValidTmp = false;
              requiredError = true;
              errorMapTmp[name] = "required";
            }
          }
          if (requiredError == false && field.validation != null && field.validation != "") {
            let validateParams = JSON.parse(field.validation);
            if (validateParams.regex != null && validateParams.regex != ""){
              let regex = new RegExp(validateParams.regex);
              if (regex != null && regex.exec(txtValue) != null) {
                // do nothing
              } else {
                isValidTmp = false;
                errorMapTmp[fieldName] = validateParams.errorMsg;
              }
            }
          }
          break;
        }
        case "TXTA": {
          if (field.required){
            let txtaValue = state[fieldName];
            if (txtaValue == null || (txtaValue != null && txtaValue == "")){
              isValidTmp = false;
              errorMapTmp[fieldName] = "required";
            }
          }
          break;
        }
        case "BLN": {
          break;
        }
        case "LTXT": {
          if (field.required){
            for(let j=0;j<languages.length;j++){
              let ltxtValue = state[fieldName.concat("-").concat(languages[j].code)];
              if (languages[j].title.langTexts != null){
                for(let k=0;k<languages[j].title.langTexts.length;k++){
                  if (languages[j].title.langTexts[k].lang == lang && languages[j].code == lang){
                    if (ltxtValue == null || (ltxtValue != null && ltxtValue == "")){
                      isValidTmp = false;
                      errorMapTmp[fieldName] = "required";
                    }
                  }
                }
              }
            }
          }
          break;
        }
        case "MDLSNG": {
          if (field.required){
            let mdlValue = state[fieldName];
            if (mdlValue == null || (mdlValue != null && mdlValue == "")){
              isValidTmp = false;
              errorMapTmp[fieldName] = "required";
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
