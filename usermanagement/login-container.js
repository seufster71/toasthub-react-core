/*
* Author Edward Seufert
* Copyright Toasthub.org
*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import callService from '../api/api-call';
import LoginView from '../../coreView/userManagement/login-view';
import utils from '../common/utils';
import {connect} from 'react-redux';
import * as loginActions from './login-actions';
import {bindActionCreators} from 'redux';
import InfoView from '../../coreView/common/info-view';
import fuLogger from '../common/fu-logger';
import {withRouter} from "react-router-dom";

class LoginContainer extends Component {
    constructor(props) {
      super(props);
			this.state = {
        view:"login",
        errorMap:{}
      };
      this.showLogin = this.showLogin.bind(this);
      this.showRegistration = this.showRegistration.bind(this);
      this.showForgotPassword = this.showForgotPassword.bind(this);
      this.changeView = this.changeView.bind(this);
      this.fieldChangeEvent = this.fieldChangeEvent.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.fieldBlurEvent = this.fieldBlurEvent.bind(this);
      this.buttonClick = this.buttonClick.bind(this);
    }

    changeView(view) {
      return (event) => {
        this.setState({'view':view});
      };
    }
    handleChange(fieldName) {
      return (event) => {
        if (this.props.codeType === 'NATIVE') {
          this.setState({[fieldName]:event.nativeEvent.text});
        } else {
          this.setState({[fieldName]:event.target.value});
        }
      };
    }

    showRegistration() {
      this.setState({view:'registration'});
    }

    showLogin() {
      this.setState({view:'login'});
    }

    showForgotPassword() {
      this.setState({view:'forgotPassword'});
    }

    fieldChangeEvent(e) {
      fuLogger.log({level:'TRACE',loc:'LoginContainer::fieldChangeEvent',msg:"field "+e.target.id});
    }

    fieldBlurEvent(e) {
      return (event) => {
        let fieldName = "";
        let fieldParts;
        let value = "";
        if (this.props.codeType === 'NATIVE') {
          fieldName = e;
          fieldParts = e.split("-");
          value = event.nativeEvent.text;
          //this.setState({[e]:event.nativeEvent.text});

        } else {
          fieldName = e;
          fieldParts = e.split("-");
          value = event.target.value;
        }
        fuLogger.log({level:'TRACE',loc:'LoginContainer::fieldBlurEvent',msg:"field blur "+fieldName});
        fuLogger.log({level:'TRACE',loc:'LoginContainer::fieldBlurEvent',msg:"the state " + JSON.stringify(this.state)});
        let myState = {};

        if (fieldParts[0] === "REGISTRATION_FORM") {
          // validate field
          let targetObj = {};
          targetObj[fieldName] = value;
          let validateReg = utils.validateFields({state:this.state,fields:this.props.appForms[fieldParts[0]],lang:this.props.lang,languages:this.props.appGlobal.LANGUAGES,group:"MAIN",prefix:fieldParts[0],fieldList:[fieldParts[1]]});
          myState.isValid = validateReg.isValid;
          let errorMap = Object.assign({}, this.state.errorMap, validateReg.errorMap);
          myState.errorMap = errorMap;
        }
        this.setState(Object.assign({}, this.state, myState));
        fuLogger.log({level:'TRACE',loc:'LoginContainer::fieldBlurEvent',msg:"the state " + JSON.stringify(this.state)});
      };
    }

    buttonClick(e) {
      return (event) => {
        let fieldName = "";
        if (this.props.codeType === 'NATIVE') {
          fieldName = e;
        } else {
          event.preventDefault();
          fieldName = event.target.id;
        }
        fuLogger.log({level:'TRACE',loc:'LoginContainer::buttonClick',msg:"the state " + JSON.stringify(this.state)});
        if (fieldName === "LOGIN_FORM_SUBMIT_BUTTON") {
          let validateLogin = utils.validateFields({state:this.state,fields:this.props.appForms.LOGIN_FORM,lang:this.props.lang,languages:this.props.appGlobal.LANGUAGES,group:"MAIN",prefix:"LOGIN_FORM"});
          if (validateLogin.isValid == true) {
            let inputFields = utils.marshallFields({state:this.state,fields:this.props.appForms.LOGIN_FORM,lang:this.props.lang,languages:this.props.appGlobal.LANGUAGES,prefix:"LOGIN_FORM"});
            let params = {};
            let tokenParam = utils.getQueryStringValue("token");
            if (tokenParam != null){
              params.token = tokenParam;
            }
            this.props.actions.authenticate(inputFields, this.props.lang);
            this.props.history.push("/member");
          } else {
            // show error
            fuLogger.log({level:'TRACE',loc:'LoginContainer::buttonClick',msg:"validation issue "});
          }
        } else if (fieldName === "REGISTRATION_FORM_SUBMIT_BUTTON") {
          let validateReg = utils.validateFields({state:this.state,fields:this.props.appForms.REGISTRATION_FORM,lang:this.props.lang,languages:this.props.appGlobal.LANGUAGES,group:"MAIN",prefix:"REGISTRATION_FORM"});
          if (validateReg.isValid == true) {
            let inputFields = utils.marshallFields({state:this.state,fields:this.props.appForms.REGISTRATION_FORM,lang:this.props.lang,languages:this.props.appGlobal.LANGUAGES,prefix:"REGISTRATION_FORM"});
            this.props.actions.register(inputFields, this.props.lang);
          } else {
            // show error
            let myState = {};
              myState.isValid = validateReg.isValid;
              myState.errorMap = validateReg.errorMap;
            this.setState(Object.assign({}, this.state, myState));
          }
        } else if (fieldName === "FORGOTPASSWORD_FORM_SUBMIT_BUTTON") {
          let validateReg = utils.validateFields({state:this.state,fields:this.props.appForms.FORGOTPASSWORD_FORM,lang:this.props.lang,languages:this.props.appGlobal.LANGUAGES,group:"MAIN",prefix:"FORGOTPASSWORD_FORM"});
          if (validateReg.isValid == true) {
            let inputFields = utils.marshallFields({state:this.state,fields:this.props.appForms.FORGOTPASSWORD_FORM,lang:this.props.lang,languages:this.props.appGlobal.LANGUAGES,prefix:"FORGOTPASSWORD_FORM"});
            this.props.actions.forgotPassword(inputFields, this.props.lang);
          } else {
            // show error
            let myState = {};
              myState.isValid = validateReg.isValid;
              myState.errorMap = validateReg.errorMap;
            this.setState(Object.assign({}, this.state, myState));
          }
        }

      };
    }

    render() {
      fuLogger.log({level:'TRACE',loc:'LoginContainer::render',msg:"login"});
      if (this.props.appForms != null && this.props.appTexts != null
        && this.props.appLabels != null) {
        return (
          <LoginView
            currentState={this.state}
            fields={this.props.appForms}
            texts={this.props.appTexts}
            labels={this.props.appLabels}
            onChangeLogin={this.showLogin}
            onChangeRegistration={this.showRegistration}
            onForgotPassword={this.showForgotPassword}
            fieldChangeEvent={this.fieldChangeEvent}
            fieldBlurEvent={this.fieldBlurEvent}
            buttonClick={this.buttonClick}
            handleChange={this.handleChange}
            changeView={this.changeView}/>
        );
      } else {
        return (
          <InfoView> App Forms are missing </InfoView>
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
  lang: PropTypes.string,
  codeType: PropTypes.string,
  history: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {appForms:state.appPrefs.appForms, appLabels:state.appPrefs.appLabels, appTexts:state.appPrefs.appTexts,
    appOptions:state.appPrefs.appOptions, lang:state.appPrefs.lang, codeType:state.appPrefs.codeType, appGlobal:state.appPrefs.appGlobal};
}

function mapDispatchToProps(dispatch) {
  return { actions:bindActionCreators(loginActions,dispatch) };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoginContainer));
