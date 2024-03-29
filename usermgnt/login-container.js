/*
* Author Edward Seufert
* Copyright Toasthub.org
*/
import React from 'react';
import LoginView from '../../coreView/usermgnt/login-view';
import utils from '../common/utils';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from './usermgnt-actions';
import InfoView from '../../coreView/common/info-view';
import fuLogger from '../common/fu-logger';

export default function LoginContainer() {
	const memberState = useSelector((state) => state.member);
	const appPrefs = useSelector((state) => state.appPrefs);
	const dispatch = useDispatch();

    const changeView = (view) => {
		dispatch(actions.setView(view));
    }

    const inputChange = (e,fieldName) => {
	//	fuLogger.log({level:'TRACE',loc:'LoginContainer::inputChange',msg:"field "+fieldName});
        if (e != null && e.target != null) {
			dispatch(actions.setField({"field":[e.target.id],"value":e.target.value}));
        } else {
			dispatch(actions.setField({"field":[fieldName],"value":e}));
        }
    }

    const showRegistration = () => {
		dispatch(actions.setView('registration'));
    }

    const showLogin = () => {
		dispatch(actions.setView('login'));
    }

    const showForgotPassword = () => {
		dispatch(actions.setView('forgotPassword'));
    }

    const fieldChangeEvent = (e) => {
      fuLogger.log({level:'TRACE',loc:'LoginContainer::fieldChangeEvent',msg:"field "+e.target.id});
    }

    const fieldBlurEvent = (e) => {
        let fieldParts;
        let value = "";
        if (appPrefs.codeType === 'NATIVE') {
          fieldParts = e.nativeEvent.id.split("-");
          value = e.nativeEvent.text;
          //this.setState({[e]:event.nativeEvent.text});

        } else {
          fieldParts = e.target.id.split("-");
          value = e.target.value;
        }
        let myState = {};

        if (fieldParts[0] === "REGISTRATION_FORM") {
          // validate field
          let targetObj = {};
          targetObj[fieldName] = value;
          let validateReg = utils.validateFields({state:this.state,fields:appPrefs.prefForms[fieldParts[0]],lang:appPrefs.lang,languages:appPrefs.prefGlobal.LANGUAGES,group:"MAIN",prefix:fieldParts[0],fieldList:[fieldParts[1]]});
          myState.isValid = validateReg.isValid;
          let errorMap = Object.assign({}, this.state.errorMap, validateReg.errorMap);
          myState.errorMap = errorMap;
			this.setState(Object.assign({}, this.state, myState));
        }
        
    }

    const buttonClick = (fieldName) => {
        fuLogger.log({level:'TRACE',loc:'LoginContainer::buttonClick::fieldname',msg:fieldName});
		fuLogger.log({level:'TRACE',loc:'LoginContainer::buttonClick::memberState',msg:JSON.stringify(memberState)});
		fuLogger.log({level:'TRACE',loc:'LoginContainer::buttonClick::appPrefs',msg:JSON.stringify(appPrefs)});
        if (fieldName === "LOGIN_FORM_SUBMIT_BUTTON") {
          let validateLogin = utils.validateFields({state:memberState,fields:appPrefs.prefForms.LOGIN_FORM,lang:appPrefs.lang,languages:appPrefs.prefGlobal.LANGUAGES,group:"MAIN",prefix:"LOGIN_FORM"});
          if (validateLogin.isValid == true) {
            let inputFields = utils.marshallFields({state:memberState,fields:appPrefs.prefForms.LOGIN_FORM,lang:appPrefs.lang,languages:appPrefs.prefGlobal.LANGUAGES,prefix:"LOGIN_FORM"});
            dispatch(actions.authenticate(inputFields, appPrefs.lang));
           // this.props.history.replace("/member");
          } else {
            // show error
            fuLogger.log({level:'TRACE',loc:'LoginContainer::buttonClick',msg:"Password is not valid "});
          }
        } else if (fieldName === "REGISTRATION_FORM_SUBMIT_BUTTON") {
          let validateReg = utils.validateFields({state:memberState,fields:appPrefs.prefForms.REGISTRATION_PAGE,lang:appPrefs.lang,languages:appPrefs.prefGlobal.LANGUAGES,group:"MAIN",prefix:"REGISTRATION_FORM"});
          if (validateReg.isValid == true) {
            let inputFields = utils.marshallFields({state:memberState,fields:appPrefs.prefForms.REGISTRATION_PAGE,lang:appPrefs.lang,languages:appPrefs.prefGlobal.LANGUAGES,prefix:"REGISTRATION_FORM"});
            dispatch(actions.register(inputFields, appPrefs.lang));
          } else {
            // show error
            let myState = {};
              myState.isValid = validateReg.isValid;
              myState.errorMap = validateReg.errorMap;
            this.setState(Object.assign({}, this.state, myState));
          }
        } else if (fieldName === "FORGOTPASSWORD_FORM_SUBMIT_BUTTON") {
          let validateReg = utils.validateFields({state:memberState,fields:appPrefs.prefForms.FORGOTPASSWORD_PAGE,lang:appPrefs.lang,languages:appPrefs.prefGlobal.LANGUAGES,group:"MAIN",prefix:"FORGOTPASSWORD_FORM"});
          if (validateReg.isValid == true) {
            let inputFields = utils.marshallFields({state:memberState,fields:appPrefs.prefForms.FORGOTPASSWORD_PAGE,lang:appPrefs.lang,languages:appPrefs.prefGlobal.LANGUAGES,prefix:"FORGOTPASSWORD_FORM"});
            dispatch(actions.forgotPassword(inputFields, appPrefs.lang));
          } else {
            // show error
            let myState = {};
              myState.isValid = validateReg.isValid;
              myState.errorMap = validateReg.errorMap;
            this.setState(Object.assign({}, memberState, myState));
          }
        }
    }


  if (appPrefs != null && appPrefs.prefForms != null && appPrefs.prefTexts != null
    && appPrefs.prefLabels != null) {
    return (
      <LoginView
        currentState={memberState}
        fields={appPrefs.prefForms}
        texts={appPrefs.prefTexts}
        labels={appPrefs.prefLabels}
        onChangeLogin={showLogin}
        onChangeRegistration={showRegistration}
        onForgotPassword={showForgotPassword}
        fieldChangeEvent={fieldChangeEvent}
        fieldBlurEvent={fieldBlurEvent}
        buttonClick={buttonClick}
        handleChange={inputChange}
        changeView={changeView}/>
    );
  } else {
    return (
      <InfoView> App Forms are missing </InfoView>
    );
  }


}

