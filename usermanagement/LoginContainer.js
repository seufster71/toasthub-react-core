import React, {Component} from 'react';
import PropTypes from 'prop-types';
import callService from '../api/Api.js';
import Login from '../../usermanagementViews/Login.js';

export default class LoginContainer extends Component {
    constructor(props) {
      super(props);
			this.state = {
        appForms:{LOGIN_FORM:[],REGISTRATION_FORM:[],FORGETPASSWORD_FORM:[],PASSWORD_CHANGE_FORM:[]},
        appTexts:{GLOBAL_PAGE:null,LOGIN_FORM:null,REGISTRATION_FORM:null,FORGETPASSWORD_FORM:null,PASSWORD_CHANGE_FORM:null},
        appLabels:{LOGIN_FORM:[],REGISTRATION_FORM:[]},
        appOptions:{REGISTRATION_FORM:{}},
        loginRegistration:"login"
      };
      this.showLogin = this.showLogin.bind(this);
      this.showRegistration = this.showRegistration.bind(this);
      this.fieldChangeEvent = this.fieldChangeEvent.bind(this);
      this.buttonClick = this.buttonClick.bind(this);
    }

    componentDidMount() {
      let requestParams = {};
      requestParams.action = "INIT";
      requestParams.service = "LOGIN_SVC";
      requestParams.appForms = new Array("LOGIN_FORM","REGISTRATION_FORM","FORGOTPASSWORD_FORM","PASSWORD_CHANGE_FORM");
      requestParams.appTexts = new Array("GLOBAL_PAGE","LOGIN_FORM","REGISTRATION_FORM","FORGOTPASSWORD_FORM","PASSWORD_CHANGE_FORM");
      requestParams.appLabels = new Array("LOGIN_FORM","REGISTRATION_FORM");
      requestParams.appOptions = new Array("REGISTRATION_FORM");
      let params = {};
      params.requestParams = requestParams;
      params.URI = '/api/login/callService';
      params.responseCallBack = (params) => { this.setFields(params); };
      callService(params);
    }

    setFields(responseJson) {
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
      }
      });
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

    buttonClick(e){
    //  debugger;
      console.log("button clicked "+e.target.id);
      let loginFields = this.state.appForms.LOGIN_FORM;
      for (var i = 0; i < loginFields.length; i++) {
        let object = document.getElementById(loginFields[i].name);
        console.log("value = "+object.value);
      }
    }

    render() {
      if (this.state.appForms.LOGIN_FORM != null && this.state.appTexts.LOGIN_FORM != null
        && this.state.appForms.REGISTRATION_FORM && this.state.appTexts.REGISTRATION_FORM) {
        return (
          <Login view={this.state.loginRegistration}
            loginFields={this.state.appForms.LOGIN_FORM}
            loginTexts={this.state.appTexts.LOGIN_FORM}
            loginLabels={this.state.appLabels.LOGIN_FORM}
            registrationFields={this.state.appForms.REGISTRATION_FORM}
            registrationLabels={this.state.appLabels.REGISTRATION_FORM}
            registrationTexts={this.state.appTexts.REGISTRATION_FORM}
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

};
