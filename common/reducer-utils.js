import React from 'react';
import {Route, Redirect} from 'react-router';
import PropTypes from 'prop-types';
import fuLogger from './fu-logger';

const getAppForms = (action) => {
  let myAppForms = {};
  if (action.responseJson.params.appPageFormFields != null) {
    const appForms = action.responseJson.params.appPageFormFields;
    for (let fieldKey in appForms) {
      myAppForms[fieldKey] = appForms[fieldKey];
    }
  }
  return myAppForms;
};

const getAppTexts = (action) => {
  let myAppTexts = {};
  if (action.responseJson.params.appPageTexts != null) {
    const appTexts = action.responseJson.params.appPageTexts;
    for (let textKey in appTexts) {
      myAppTexts[textKey] = appTexts[textKey];
    }
  }
  return myAppTexts;
};

const getAppLabels = (action) => {
  let myAppLabels = {};
  if (action.responseJson.params.appPageLabels != null) {
    const appLabels = action.responseJson.params.appPageLabels;
    for (let labelKey in appLabels) {
      myAppLabels[labelKey] = appLabels[labelKey];
    }
  }
  return myAppLabels;
};

const getAppOptions = (action) => {
  let myAppOptions = {};
  if (action.responseJson.params.appPageOptions != null) {
    const appOptions = action.responseJson.params.appPageOptions;
    for (let optionKey in appOptions) {
      myAppOptions[optionKey] = appOptions[optionKey];
    }
  }
  return myAppOptions;
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

const loadInputFields = (item,forms,inputFields) => {
	for (let i = 0; i < forms.length; i++) {
		let classModel = JSON.parse(forms[i].classModel);
		if (item != null && item.hasOwnProperty(classModel.field)) {
			if (classModel.defaultClazz != null) {
				inputFields[forms[i].name+"-DEFAULT"] = item[classModel.field].defaultText;
			}
			if (classModel.textClazz != null) {
				for (let j = 0; j < item[classModel.field].langTexts.length; j++) {
					inputFields[forms[i].name+"-TEXT-"+item[classModel.field].langTexts[j].lang] = item[classModel.field].langTexts[j].text;
				}
			}
			if (classModel.type == "Object") {
				inputFields[forms[i].name] = "Object";
			} else {
				inputFields[forms[i].name] = item[classModel.field];
			}
		} else {
			let result = "";
			if (forms[i].value != null && forms[i].value != ""){
				if (forms[i].value.includes("{")) {
					let formValue = JSON.parse(forms[i].value);
					if (formValue.options != null) {
						for (let j = 0; j < formValue.options.length; j++) {
							if (formValue.options[j] != null && formValue.options[j].defaultInd == true){
								result = formValue.options[j].value;
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
	return inputFields;
}

export default { getAppForms, getAppTexts, getAppLabels, getAppOptions, getColumns, 
	getItemCount, getItems, getListLimit, getListStart, updateListLimit, updateSearch, 
	updateOrderBy, updateInputChange, updateClearField, loadInputFields };
