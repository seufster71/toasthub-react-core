import React, {Component} from 'react';
import PropTypes from 'prop-types';
import callService from '../api/Api';
import Login from '../../usermanagementViews/Login';
import utils from '../common/utils';
import {connect} from 'react-redux';
import * as loginActions from './loginActions';
import {bindActionCreators} from 'redux';

class LoginContainer extends Component {
    constructor(props) {
      super(props);
			this.state = {
        loginRegistration:"login"
      };
      this.showLogin = this.showLogin.bind(this);
      this.showRegistration = this.showRegistration.bind(this);
      this.fieldChangeEvent = this.fieldChangeEvent.bind(this);
      this.fieldBlurEvent = this.fieldBlurEvent.bind(this);
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

    fieldBlurEvent(e) {
      console.log("field blur "+e.target.id);
      let myState = {};
        myState[e.target.id] = e.target.value;
      this.setState(Object.assign({}, this.state, myState));
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
        let validate = utils.validateFields(this.state,this.props.appForms.LOGIN_FORM,this.props.lang,this.props.appGlobal.LANGUAGES,"MAIN");
        if (validate.isValid == true) {
          let inputFields = utils.marshallFields(this.state,this.props.appForms.LOGIN_FORM,this.props.lang,this.props.appGlobal.LANGUAGES);
          let params = {};
          let tokenParam = utils.getQueryStringValue("token");
          if (tokenParam != null){
            params.token = tokenParam;
          }
          this.props.actions.authenticate(inputFields);
        }
      }
    }

    render() {
      console.log("Render login");
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
            fieldBlurEvent={this.fieldBlurEvent}
            buttonClick={this.buttonClick}/>
        );
      } else {
        return (
          <div> Empty </div>
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
  actions: PropTypes.object,
  lang: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {appForms:state.appPrefs.appForms, appLabels:state.appPrefs.appLabels, appTexts:state.appPrefs.appTexts,
    appOptions:state.appPrefs.appOptions, lang:state.lang, appGlobal:state.appPrefs.appGlobal};
}

function mapDispatchToProps(dispatch) {
  return { actions:bindActionCreators(loginActions,dispatch) };
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginContainer);
