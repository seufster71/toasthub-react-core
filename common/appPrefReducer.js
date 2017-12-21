export default function appPrefReducer(state = [], action) {
  switch(action.type) {
    case 'LOAD_INIT_APP': {
      if (action.responseJson != null && action.responseJson.params != null) {
        if (action.responseJson.params.appPageFormFields != null) {
          state.appForms = {};
          if (action.responseJson.params.appPageFormFields.LOGIN_FORM != null) {
            state.appForms.LOGIN_FORM = action.responseJson.params.appPageFormFields.LOGIN_FORM;
          }
          if (action.responseJson.params.appPageFormFields.REGISTRATION_FORM != null) {
            state.appForms.REGISTRATION_FORM = action.responseJson.params.appPageFormFields.REGISTRATION_FORM;
          }
          if (action.responseJson.params.appPageFormFields.FORGOTPASSWORD_FORM != null) {
            state.appForms.FORGOTPASSWORD_FORM = action.responseJson.params.appPageFormFields.FORGOTPASSWORD_FORM;
          }
          if (action.responseJson.params.appPageFormFields.PASSWORD_CHANGE_FORM != null) {
            state.appForms.PASSWORD_CHANGE_FORM = action.responseJson.params.appPageFormFields.PASSWORD_CHANGE_FORM;
          }
        }
      }
      return {appForms:{
        LOGIN_FORM:action.responseJson.params.appPageFormFields.LOGIN_FORM,
        REGISTRATION_FORM:action.responseJson.params.appPageFormFields.REGISTRATION_FORM,
        FORGOTPASSWORD_FORM:action.responseJson.params.appPageFormFields.FORGOTPASSWORD_FORM,
        PASSWORD_CHANGE_FORM:action.responseJson.params.appPageFormFields.PASSWORD_CHANGE_FORM
      },appTexts:{
        GLOBAL_PAGE:action.responseJson.params.appPageTexts.GLOBAL_PAGE,
        LOGIN_FORM:action.responseJson.params.appPageTexts.LOGIN_FORM,
        REGISTRATION_FORM:action.responseJson.params.appPageTexts.REGISTRATION_FORM,
        FORGOTPASSWORD_FORM:action.responseJson.params.appPageTexts.FORGOTPASSWORD_FORM,
        PASSWORD_CHANGE_FORM:action.responseJson.params.appPageTexts.PASSWORD_CHANGE_FORM
      },appLabels:{
        LOGIN_FORM:action.responseJson.params.appPageLabels.LOGIN_FORM,
        REGISTRATION_FORM:action.responseJson.params.appPageLabels.REGISTRATION_FORM
      },appOptions:{
        REGISTRATION_FORM:action.responseJson.params.appPageOptions.REGISTRATION_FORM
      },appGlobal:{
        LANGUAGES:action.responseJson.params.appGlobal.LANGUAGES
      }
      };

    }
    case 'SAVE_APPFORMS':
      return state.appForms;
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
