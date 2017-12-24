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
        loginRegistration:"login",
      };
      this.showLogin = this.showLogin.bind(this);
      this.showRegistration = this.showRegistration.bind(this);
      this.fieldChangeEvent = this.fieldChangeEvent.bind(this);
      this.buttonClick = this.buttonClick.bind(this);
    }

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
  appForms: PropTypes.object,
  appTexts: PropTypes.object,
  appLabels: PropTypes.object,
  appOptions: PropTypes.object,
  appGlobal: PropTypes.object,
  lang: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {appForms:state.appPrefs.appForms, appLabels:state.appPrefs.appLabels, appTexts:state.appPrefs.appTexts,
    appOptions:state.appPrefs.appOptions, lang:state.lang, appGlobal:state.appPrefs.appGlobal};
}

export default connect(mapStateToProps)(LoginContainer);
