import React, {Component} from 'react';
import PropTypes from 'prop-types';
import callService from '../api/Api';
import Login from '../../usermanagementViews/Login';
import utils from '../common/utils';
import {connect} from 'react-redux';

class LoginContainer extends Component {
    constructor(props) {
      super(props);
			this.state = {
  //      appForms:{LOGIN_FORM:[],REGISTRATION_FORM:[],FORGETPASSWORD_FORM:[],PASSWORD_CHANGE_FORM:[]},
  //      appTexts:{GLOBAL_PAGE:null,LOGIN_FORM:null,REGISTRATION_FORM:null,FORGETPASSWORD_FORM:null,PASSWORD_CHANGE_FORM:null},
  //      appLabels:{LOGIN_FORM:[],REGISTRATION_FORM:[]},
  //      appOptions:{REGISTRATION_FORM:{}},
  //      appGlobal:{LANGUAGES:[]},
        loginRegistration:"login",
  //      lang:"en"
      };
      this.showLogin = this.showLogin.bind(this);
      this.showRegistration = this.showRegistration.bind(this);
      this.fieldChangeEvent = this.fieldChangeEvent.bind(this);
      this.buttonClick = this.buttonClick.bind(this);
    }

/*    componentDidMount() {
      let requestParams = {};
      requestParams.action = "INIT";
      requestParams.service = "LOGIN_SVC";
      requestParams.appForms = new Array("LOGIN_FORM","REGISTRATION_FORM","FORGOTPASSWORD_FORM","PASSWORD_CHANGE_FORM");
      requestParams.appTexts = new Array("GLOBAL_PAGE","LOGIN_FORM","REGISTRATION_FORM","FORGOTPASSWORD_FORM","PASSWORD_CHANGE_FORM");
      requestParams.appLabels = new Array("LOGIN_FORM","REGISTRATION_FORM");
      requestParams.appOptions = new Array("REGISTRATION_FORM");
      requestParams.appGlobal = new Array("LANGUAGES");
      let params = {};
      params.requestParams = requestParams;
      params.URI = '/api/login/callService';
      params.responseCallBack = (params) => { this.setFields(params); };
      callService(params);
    }
*/
  /*  setFields(responseJson) {
      let state = {};
      if (responseJson != null && responseJson.params != null) {
        if (responseJson.params.appPageFormFields != null) {
          state.appForms = {};
          if (responseJson.params.appPageFormFields.LOGIN_FORM != null) {
            state.appForms.LOGIN_FORM = responseJson.params.appPageFormFields.LOGIN_FORM;
          }
          if (responseJson.params.appPageFormFields.REGISTRATION_FORM != null) {
            state.appForms.REGISTRATION_FORM = responseJson.params.appPageFormFields.REGISTRATION_FORM;
          }
          if (responseJson.params.appPageFormFields.FORGOTPASSWORD_FORM != null) {
            state.appForms.FORGOTPASSWORD_FORM = responseJson.params.appPageFormFields.FORGOTPASSWORD_FORM;
          }
          if (responseJson.params.appPageFormFields.PASSWORD_CHANGE_FORM != null) {
            state.appForms.PASSWORD_CHANGE_FORM = responseJson.params.appPageFormFields.PASSWORD_CHANGE_FORM;
          }
        }
      }
      this.setState({appForms:{
        LOGIN_FORM:responseJson.params.appPageFormFields.LOGIN_FORM,
        REGISTRATION_FORM:responseJson.params.appPageFormFields.REGISTRATION_FORM,
        FORGOTPASSWORD_FORM:responseJson.params.appPageFormFields.FORGOTPASSWORD_FORM,
        PASSWORD_CHANGE_FORM:responseJson.params.appPageFormFields.PASSWORD_CHANGE_FORM
      },appTexts:{
        GLOBAL_PAGE:responseJson.params.appPageTexts.GLOBAL_PAGE,
        LOGIN_FORM:responseJson.params.appPageTexts.LOGIN_FORM,
        REGISTRATION_FORM:responseJson.params.appPageTexts.REGISTRATION_FORM,
        FORGOTPASSWORD_FORM:responseJson.params.appPageTexts.FORGOTPASSWORD_FORM,
        PASSWORD_CHANGE_FORM:responseJson.params.appPageTexts.PASSWORD_CHANGE_FORM
      },appLabels:{
        LOGIN_FORM:responseJson.params.appPageLabels.LOGIN_FORM,
        REGISTRATION_FORM:responseJson.params.appPageLabels.REGISTRATION_FORM
      },appOptions:{
        REGISTRATION_FORM:responseJson.params.appPageOptions.REGISTRATION_FORM
      },appGlobal:{
        LANGUAGES:responseJson.params.appGlobal.LANGUAGES
      }
      });
    }
*/
    showRegistration() {
      this.setState({loginRegistration:'registration'});
    }

    showLogin() {
      this.setState({loginRegistration:'login'});
    }

    fieldChangeEvent(e) {
      console.log("field changed "+e.target.id);
    }

    buttonClick(e) {
    //  debugger;
      console.log("button clicked "+e.target.id);
      if(e.target.id === "REGISTRATION_FORM_SUBMIT_BUTTON") {
        let registrationFields = this.props.appForms.REGISTRATION_FORM;
        for (var r = 0; r < registrationFields.length; r++) {
          let object = document.getElementById(registrationFields[r].name);
          console.log("value = "+object.value);
        }
      } else if (e.target.id === "LOGIN_FORM_SUBMIT_BUTTON") {
        let loginFields = this.props.appForms.LOGIN_FORM;
        for (var l = 0; l < loginFields.length; l++) {
          let object = document.getElementById(loginFields[l].name);
          console.log("value = "+object.value);
        }
      }
    }

    authenticate() {
      //this.statusPanelClear("login-status");
      let valid = utils.validateFields(self.pageFormFields.LOGIN_FORM,this.props.lang,this.props.appGlobal.LANGUAGES,"MAIN","LOGIN_FORM");
      if (valid == true) {
        let result = utils.marshallFields(self.pageFormFields.LOGIN_FORM,this.props.lang,this.props.appGlobal.LANGUAGES,"LOGIN_FORM");
        let params = {};
        let tokenParam = utils.getQueryStringValue("token");
        if (tokenParam != null){
          params.token = tokenParam;
        }

        let requestParams = {};
        requestParams.action = "LOGINAUTHENTICATE";
        requestParams.service = "LOGIN_SVC";
        params.requestParams = requestParams;
        params.URI = '/api/login/callService';
        params.responseCallBack = (params) => { this.processAuthenticate(params); };
        params.appForms = ["LOGIN_FORM"];
        params.inputFields = result;
        params.ajaxEndpoint = "/authenticate";
        callService(params);
      }
    } // authenticate

    render() {
      if (this.props.appForms.LOGIN_FORM != null && this.props.appTexts.LOGIN_FORM != null
        && this.props.appForms.REGISTRATION_FORM && this.props.appTexts.REGISTRATION_FORM) {
        return (
          <Login view={this.state.loginRegistration}
            loginFields={this.props.appForms.LOGIN_FORM}
            loginTexts={this.props.appTexts.LOGIN_FORM}
            loginLabels={this.props.appLabels.LOGIN_FORM}
            registrationFields={this.props.appForms.REGISTRATION_FORM}
            registrationLabels={this.props.appLabels.REGISTRATION_FORM}
            registrationTexts={this.props.appTexts.REGISTRATION_FORM}
            onChangeLogin={this.showLogin}
            onChangeRegistration={this.showRegistration}
            fieldChangeEvent={this.fieldChangeEvent}
            buttonClick={this.buttonClick}/>
        );
      } else {
        return (
          <div/>
        );
      }

    }

}

LoginContainer.propTypes = {
  appForms: PropTypes.array,
  appTexts: PropTypes.array,
  appLabels: PropTypes.array,
  appOptions: PropTypes.array,
  appGlobal: PropTypes.array,
  lang: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {appForms:state.appForms, appLabels:state.appLabels, appTexts:state.appTexts,
    appOptions:state.appOptions, lang:state.lang, appGlobal:state.appGlobal};
}

export default connect(mapStateToProps)(LoginContainer);
