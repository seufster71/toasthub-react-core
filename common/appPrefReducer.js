export default function appPrefReducer(state = {}, action) {
  switch(action.type) {
    case 'LOAD_INIT_PUBLIC': {
      let myState = {};
      if (action.responseJson != null && action.responseJson.params != null) {
        if (action.responseJson.params.appPageFormFields != null) {
          myState.appForms = {};
          if (action.responseJson.params.appPageFormFields.LOGIN_FORM != null) {
            myState.appForms.LOGIN_FORM = action.responseJson.params.appPageFormFields.LOGIN_FORM;
          }
          if (action.responseJson.params.appPageFormFields.REGISTRATION_FORM != null) {
            myState.appForms.REGISTRATION_FORM = action.responseJson.params.appPageFormFields.REGISTRATION_FORM;
          }
          if (action.responseJson.params.appPageFormFields.FORGOTPASSWORD_FORM != null) {
            myState.appForms.FORGOTPASSWORD_FORM = action.responseJson.params.appPageFormFields.FORGOTPASSWORD_FORM;
          }
          if (action.responseJson.params.appPageFormFields.PASSWORD_CHANGE_FORM != null) {
            myState.appForms.PASSWORD_CHANGE_FORM = action.responseJson.params.appPageFormFields.PASSWORD_CHANGE_FORM;
          }
          myState.appTexts = {};
          if (action.responseJson.params.appPageTexts.GLOBAL_PAGE != null) {
            myState.appTexts.GLOBAL_PAGE = action.responseJson.params.appPageTexts.GLOBAL_PAGE;
          }
          if (action.responseJson.params.appPageTexts.LOGIN_FORM != null) {
            myState.appTexts.LOGIN_FORM = action.responseJson.params.appPageTexts.LOGIN_FORM;
          }
          if (action.responseJson.params.appPageTexts.REGISTRATION_FORM != null) {
            myState.appTexts.REGISTRATION_FORM = action.responseJson.params.appPageTexts.REGISTRATION_FORM;
          }
          if (action.responseJson.params.appPageTexts.FORGOTPASSWORD_FORM != null) {
            myState.appTexts.FORGOTPASSWORD_FORM = action.responseJson.params.appPageTexts.FORGOTPASSWORD_FORM;
          }
          if (action.responseJson.params.appPageTexts.PASSWORD_CHANGE_FORM != null) {
            myState.appTexts.PASSWORD_CHANGE_FORM = action.responseJson.params.appPageTexts.PASSWORD_CHANGE_FORM;
          }
          myState.appLabels = {};
          if (action.responseJson.params.appPageLabels.LOGIN_FORM != null) {
            myState.appLabels.LOGIN_FORM = action.responseJson.params.appPageLabels.LOGIN_FORM;
          }
          if (action.responseJson.params.appPageLabels.REGISTRATION_FORM != null) {
            myState.appLabels.REGISTRATION_FORM = action.responseJson.params.appPageLabels.REGISTRATION_FORM;
          }
          myState.appOptions = {};
          if (action.responseJson.params.appPageOptions.REGISTRATION_FORM != null) {
            myState.appOptions.REGISTRATION_FORM = action.responseJson.params.appPageOptions.REGISTRATION_FORM;
          }
          myState.appGlobal = {};
          if (action.responseJson.params.LANGUAGES != null) {
            myState.appGlobal.LANGUAGES = action.responseJson.params.LANGUAGES;
            let languages = action.responseJson.params.LANGUAGES;
            for (let i = 0; i < languages.length; i++) {
              if (languages[i].defaultLang) {
                myState.lang = languages[i].code;
              }
            }
          } else {
            myState.lang = "en";
          }
        }
        return Object.assign({}, state, myState);
      } else {
        return state;
      }
    }
    case 'LOAD_INIT_MEMBER':{
      if (action.responseJson != null && action.responseJson.params != null) {
        let myState = {};
        if (state.appTests != null) {
          myState = Object.assign({}, state);
        } else {
          myState.appTexts = {};
        }
        if (action.responseJson.params.appPageTexts.MEMBER_PAGE != null) {
          myState.appTexts.MEMBER_PAGE = action.responseJson.params.appPageTexts.MEMBER_PAGE;
        }
        return Object.assign({}, state, myState);
      } else {
        return state;
      }
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
