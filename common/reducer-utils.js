import React from 'react';
import {Route, Redirect} from 'react-router';
import PropTypes from 'prop-types';
import fuLogger from './fu-logger';

const getPrefForms = (action) => {
  let myPrefForms = {};
  if (action.responseJson.params.prefFormFields != null) {
    const prefForms = action.responseJson.params.prefFormFields;
    for (let fieldKey in prefForms) {
      myPrefForms[fieldKey] = prefForms[fieldKey];
    }
  }
  return myPrefForms;
};

const getPrefTexts = (action) => {
  let myPrefTexts = {};
  if (action.responseJson.params.prefTexts != null) {
    const prefTexts = action.responseJson.params.prefTexts;
    for (let textKey in prefTexts) {
      myPrefTexts[textKey] = prefTexts[textKey];
    }
  }
  return myPrefTexts;
};

const getPrefLabels = (action) => {
  let myPrefLabels = {};
  if (action.responseJson.params.prefLabels != null) {
    const prefLabels = action.responseJson.params.prefLabels;
    for (let labelKey in prefLabels) {
      myPrefLabels[labelKey] = prefLabels[labelKey];
    }
  }
  return myPrefLabels;
};

const getPrefOptions = (action) => {
  let myPrefOptions = {};
  if (action.responseJson.params.prefOptions != null) {
    const prefOptions = action.responseJson.params.prefOptions;
    for (let optionKey in prefOptions) {
      myPrefOptions[optionKey] = prefOptions[optionKey];
    }
  }
  return myPrefOptions;
};

const getColumns = (action) => {
  let columns = [];
  if (action.responseJson.params.columns != null) {
    columns = action.responseJson.params.columns;
  }
  return columns;
};

const getItemCount = (action) => {
  let itemCount = 0;
  if (action.responseJson.params.itemCount != null) {
    itemCount = action.responseJson.params.itemCount;
  }
  return itemCount;
};

const getItems = (action) => {
  let items = [];
  if (action.responseJson.params.items != null) {
    items = action.responseJson.params.items;
  }
  return items;
};

const getListLimit = (action) => {
  let listLimit = 20;
  if (action.responseJson.params.listLimit != null) {
    listLimit = action.responseJson.params.listLimit;
  }
  return listLimit;
};

const getListStart = (action) => {
  let listStart = 0;
  if (action.responseJson.params.listStart != null) {
    listStart = action.responseJson.params.listStart;
  }
  return listStart;
};

const updateListLimit = (state,action) => {
	if (action.listLimit != null) {
		let clone = Object.assign({}, state);
		clone.listLimit = action.listLimit;
		return clone;
	} else {
        return state;
    }
}

const updateSearch = (state,action) => {
	if (action.searchCriteria != null) {
		let clone = Object.assign({}, state);
		clone.searchCriteria = action.searchCriteria;
		clone.listStart = 0;
		return clone;
	} else {
        return state;
    }
}

const updateSearchChange = (state,action) => {
	if (action.searchCriteria != null) {
		let clone = Object.assign({}, state);
		clone.searchFieldName = action.fieldName;
		clone.searchValue = action.value;
		return clone;
	} else {
        return state;
    }
}

const updateOrderBy = (state,action) => {
	if (action.orderCriteria != null) {
		let clone = Object.assign({}, state);
		clone.orderCriteria = action.orderCriteria;
		return clone;
	} else {
        return state;
    }
}

const updateInputChange = (state,action) => {
	if (action.params != null) {
		let inputFields = Object.assign({}, state.inputFields);
		inputFields[action.params.field] = action.params.value;
		let clone = Object.assign({}, state);
		clone.inputFields = inputFields;
		return clone;
	} else {
        return state;
    }
}

const updateClearField = (state,action) => {
	if (action.params != null) {
		let inputFields = Object.assign({}, state.inputFields);
		inputFields[action.params.field] = "";
		let clone = Object.assign({}, state);
		clone.inputFields = inputFields;
		return clone;
	} else {
        return state;
    }
}

const loadInputFields = (item,forms,inputFields,appPrefs,group) => {
	let mgrp = null;
	for (let i = 0, len = forms.length; i < len; i++) {
		let classModel = JSON.parse(forms[i].classModel);
		if (group != null && forms[i].group != group) {
			continue;
		}
		if (forms[i].subGroup != null) {
			continue;
		} else if (item != null && item.hasOwnProperty(classModel.field)) {
			// if item exists
			if (classModel.defaultClazz != null) {
				inputFields[forms[i].name+"-DEFAULT"] = item[classModel.field].defaultText;
			}
			if (classModel.textClazz != null) {
				for (let j = 0, jlen = item[classModel.field].langTexts.length; j < jlen; j++) {
					inputFields[forms[i].name+"-TEXT-"+item[classModel.field].langTexts[j].lang] = item[classModel.field].langTexts[j].text;
				}
			}
			if (classModel.type === "Set") {
				mgrp = forms[i];
				inputFields[forms[i].name] = "SET";
			} else if (classModel.type === "Object") {
				inputFields[forms[i].name] = "OBJECT";
			} else {
				inputFields[forms[i].name] = item[classModel.field];
			}
		} else {
			if (classModel.type === "Set") {
				mgrp = forms[i];
			}
			// no item add empty fields
			let result = "";
			if (forms[i].value != null && forms[i].value != ""){
				if (forms[i].value.includes("{")) {
					let formValue = JSON.parse(forms[i].value);
					if (formValue.options != null) {
						for (let j = 0, jlen = formValue.options.length; j < jlen; j++) {
							if (formValue.options[j] != null && formValue.options[j].defaultInd == true){
								result = formValue.options[j].value;
							}
						}
					} else if (formValue.referPref != null) {
						let pref = appPrefs.prefTexts[formValue.referPref.prefName][formValue.referPref.prefItem];
						if (pref != null && pref.value != null && pref.value != "") {
							let value = JSON.parse(pref.value);
							if (value.options != null) {
								for (let j = 0; j < value.options.length; j++) {
									if (value.options[j] != null && value.options[j].defaultInd == true){
										result = value.options[j].value;
									}
								}
							}
						}
					}
				} else {
					result = forms[i].value;
				}
			}
			inputFields[forms[i].name] = result;
		}
	}
	// process sub groups
	if (mgrp != null) {
		let subClassModel = JSON.parse(mgrp.classModel);
		let languages = appPrefs.prefGlobal.LANGUAGES;
		for (let i = 0, len = forms.length; i < len; i++) {
			let classModel = JSON.parse(forms[i].classModel);
			if (forms[i].subGroup != null && forms[i].subGroup == subClassModel.groupName) {
				if (item != null && item.hasOwnProperty(subClassModel.field)) {
					let itemSubs = item[subClassModel.field];
					for(let j = 0, jlen = itemSubs.length; j < jlen; j++) {
						if(itemSubs[j].hasOwnProperty(classModel.field)) {
							let formName = forms[i].name+"-"+itemSubs[j].lang;
							inputFields[formName] = itemSubs[j][classModel.field];
						}
					}
				} else {
					for (let l = 0, llen = languages.length; l < llen; l++) {
						let formName = forms[i].name+"-"+languages[l].code;
						let result = "";
						if (forms[i].value != null && forms[i].value != ""){
							if (forms[i].value.includes("{")) {
								let formValue = JSON.parse(forms[i].value);
								if (formValue.options != null) {
									for (let j = 0, jlen = formValue.options.length; j < jlen; j++) {
										if (formValue.options[j] != null && formValue.options[j].defaultInd == true){
											result = formValue.options[j].value;
										}
									}
								} else if (formValue.referPref != null) {
									let pref = appPrefs.prefTexts[formValue.referPref.prefName][formValue.referPref.prefItem];
									if (pref != null && pref.value != null && pref.value != "") {
										let value = JSON.parse(pref.value);
										if (value.options != null) {
											for (let j = 0; j < value.options.length; j++) {
												if (value.options[j] != null && value.options[j].defaultInd == true){
													result = value.options[j].value;
												}
											}
										}
									}
								}
							} else {
								result = forms[i].value;
							}
						}
						inputFields[formName] = result;
					}
				}
			}
		}
	}
	return inputFields;
}

export default { getPrefForms, getPrefTexts, getPrefLabels, getPrefOptions, getColumns, 
	getItemCount, getItems, getListLimit, getListStart, updateListLimit, updateSearch, 
	updateOrderBy, updateInputChange, updateClearField, loadInputFields };
