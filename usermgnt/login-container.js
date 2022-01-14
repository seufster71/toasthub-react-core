/*
* Author Edward Seufert
* Copyright Toasthub.org
*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LoginView from '../../coreView/usermgnt/login-view';
import utils from '../common/utils';
import {connect} from 'react-redux';
import * as userManagementActions from './usermgnt-actions';
import {bindActionCreators} from 'redux';
import InfoView from '../../coreView/common/info-view';
import fuLogger from '../common/fu-logger';

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
        if (this.props.appPrefs.codeType === 'NATIVE') {
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
        if (this.props.appPrefs.codeType === 'NATIVE') {
          fieldName = e;
          fieldParts = e.split("-");
          value = event.nativeEvent.text;
          //this.setState({[e]:event.nativeEvent.text});

        } else {
          fieldName = e;
          fieldParts = e.split("-");
          value = event.target.value;
        }
        let myState = {};

        if (fieldParts[0] === "REGISTRATION_FORM") {
          // validate field
          let targetObj = {};
          targetObj[fieldName] = value;
          let validateReg = utils.validateFields({state:this.state,fields:this.props.appPrefs.prefForms[fieldParts[0]],lang:this.props.appPrefs.lang,languages:this.props.appPrefs.prefGlobal.LANGUAGES,group:"MAIN",prefix:fieldParts[0],fieldList:[fieldParts[1]]});
          myState.isValid = validateReg.isValid;
          let errorMap = Object.assign({}, this.state.errorMap, validateReg.errorMap);
          myState.errorMap = errorMap;
        }
        this.setState(Object.assign({}, this.state, myState));
      };
    }

    buttonClick(e) {
      return (event) => {
        let fieldName = "";
        if (this.props.appPrefs.codeType === 'NATIVE') {
          fieldName = e;
        } else {
          event.preventDefault();
          fieldName = event.target.id;
        }
        fuLogger.log({level:'TRACE',loc:'LoginContainer::buttonClick',msg:"click"});
        if (fieldName === "LOGIN_FORM_SUBMIT_BUTTON") {
          let validateLogin = utils.validateFields({state:this.state,fields:this.props.appPrefs.prefForms.LOGIN_FORM,lang:this.props.appPrefs.lang,languages:this.props.appPrefs.prefGlobal.LANGUAGES,group:"MAIN",prefix:"LOGIN_FORM"});
          if (validateLogin.isValid == true) {
            let inputFields = utils.marshallFields({state:this.state,fields:this.props.appPrefs.prefForms.LOGIN_FORM,lang:this.props.appPrefs.lang,languages:this.props.appPrefs.prefGlobal.LANGUAGES,prefix:"LOGIN_FORM"});
            let params = {};

            this.props.actions.authenticate(inputFields, this.props.appPrefs.lang);
           // this.props.history.replace("/member");
          } else {
            // show error
            fuLogger.log({level:'TRACE',loc:'LoginContainer::buttonClick',msg:"Password is not valid "});
          }
        } else if (fieldName === "REGISTRATION_FORM_SUBMIT_BUTTON") {
          let validateReg = utils.validateFields({state:this.state,fields:this.props.appPrefs.prefForms.REGISTRATION_PAGE,lang:this.props.appPrefs.lang,languages:this.props.appPrefs.prefGlobal.LANGUAGES,group:"MAIN",prefix:"REGISTRATION_FORM"});
          if (validateReg.isValid == true) {
            let inputFields = utils.marshallFields({state:this.state,fields:this.props.appPrefs.prefForms.REGISTRATION_PAGE,lang:this.props.appPrefs.lang,languages:this.props.appPrefs.prefGlobal.LANGUAGES,prefix:"REGISTRATION_FORM"});
            this.props.actions.register(inputFields, this.props.appPrefs.lang);
          } else {
            // show error
            let myState = {};
              myState.isValid = validateReg.isValid;
              myState.errorMap = validateReg.errorMap;
            this.setState(Object.assign({}, this.state, myState));
          }
        } else if (fieldName === "FORGOTPASSWORD_FORM_SUBMIT_BUTTON") {
          let validateReg = utils.validateFields({state:this.state,fields:this.props.appPrefs.prefForms.FORGOTPASSWORD_PAGE,lang:this.props.appPrefs.lang,languages:this.props.appPrefs.prefGlobal.LANGUAGES,group:"MAIN",prefix:"FORGOTPASSWORD_FORM"});
          if (validateReg.isValid == true) {
            let inputFields = utils.marshallFields({state:this.state,fields:this.props.appPrefs.prefForms.FORGOTPASSWORD_PAGE,lang:this.props.appPrefs.lang,languages:this.props.appPrefs.prefGlobal.LANGUAGES,prefix:"FORGOTPASSWORD_FORM"});
            this.props.actions.forgotPassword(inputFields, this.props.appPrefs.lang);
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
      if (this.props.appPrefs != null && this.props.appPrefs.prefForms != null && this.props.appPrefs.prefTexts != null
        && this.props.appPrefs.prefLabels != null) {
        return (
          <LoginView
            currentState={this.state}
            fields={this.props.appPrefs.prefForms}
            texts={this.props.appPrefs.prefTexts}
            labels={this.props.appPrefs.prefLabels}
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
  appPrefs: PropTypes.object,
  actions: PropTypes.object,
  history: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {appPrefs:state.appPrefs};
}

function mapDispatchToProps(dispatch) {
  return { actions:bindActionCreators(userManagementActions,dispatch) };
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginContainer);
