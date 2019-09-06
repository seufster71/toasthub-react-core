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
  let items = 0;
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

export default { getAppForms, getAppTexts, getAppLabels, getAppOptions, getColumns, getItemCount, getItems, getListLimit, getListStart };
