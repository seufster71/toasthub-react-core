export default function appPrefReducer(state = {}, action) {
  let myState = {};
  switch(action.type) {
    case 'LOAD_INIT': {
      return processInit(state,action);
    }
    case 'SAVE_APPTEXTS':
      return state.appTexts;
    case 'SAVE_APPLABELS':
      return state.appLabels;
    case 'SAVE_APPOPTIONS':
      return state.appOptions;
    case 'SAVE_LANG':
      return state.lang;
    case 'SAVE_GLOBAL':
      return state.appGlobal;
    default:
      return state;
  }
}

const processInit = (state,action) => {
  if (action.responseJson != null && action.responseJson.params != null) {
    let myAppForms = {};
    if (action.responseJson.params.appPageFormFields != null) {
      const appForms = action.responseJson.params.appPageFormFields;
      for (let fieldKey in appForms) {
        myAppForms[fieldKey] = appForms[fieldKey];
      }
    }
    let myAppTexts = {};
    if (action.responseJson.params.appPageTexts != null) {
      const appTexts = action.responseJson.params.appPageTexts;
      for (let textKey in appTexts) {
        myAppTexts[textKey] = appTexts[textKey];
      }
    }
    let myAppLabels = {};
    if (action.responseJson.params.appPageLabels != null) {
      const appLabels = action.responseJson.params.appPageLabels;
      for (let labelKey in appLabels) {
        myAppLabels[labelKey] = appLabels[labelKey];
      }
    }
    let myAppOptions = {};
    if (action.responseJson.params.appPageOptions != null) {
      const appOptions = action.responseJson.params.appPageOptions;
      for (let optionKey in appOptions) {
        myAppOptions[optionKey] = appOptions[optionKey];
      }
    }
    let myAppGlobal = {};
    let myLang = "en";
    if (action.responseJson.params.LANGUAGES != null) {
      myAppGlobal.LANGUAGES = action.responseJson.params.LANGUAGES;
      const languages = action.responseJson.params.LANGUAGES;
      for (let i = 0; i < languages.length; i++) {
        if (languages[i].defaultLang) {
          myLang = languages[i].code;
        }
      }
    }
    return Object.assign({}, state, {
      appForms: Object.assign({}, state.appForms, myAppForms),
      appTexts: Object.assign({}, state.appTexts, myAppTexts),
      appLabels: Object.assign({}, state.appLabels, myAppLabels),
      appOptions: Object.assign({}, state.appOptions, myAppOptions),
      appGlobal: Object.assign({}, state.appGlobal, myAppGlobal),
      lang:myLang
    });
  } else {
    return state;
  }
};
