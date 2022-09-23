/*
 * Copyright (C) 2020 The ToastHub Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import reducerUtils from '../common/reducer-utils';

export default function sessionReducer(state = {}, action) {
	let myState = {};
	switch(action.type) {
	case 'LOAD_SESSION_CHECK': {
		if (action.responseJson != null && action.responseJson.status != null && action.responseJson.status === "SUCCESS") {
			myState.sessionActive = true;
			myState.selected = action.responseJson.params.USER;
		} else {
			myState.sessionActive = false;
			myState.selected = null;
		}
		myState.callComplete = true;
		return Object.assign({}, state, myState);
	}
	case 'SAVE_SESSION': {
		if (action.responseJson != null && action.responseJson.params != null && action.responseJson.params.USER != null) {
			return Object.assign({}, state, {sessionActive:true, status:'JUST_LOGGEDIN', selected:action.responseJson.params.USER, callComplete:true});
		} else {
			return state;
		}
	}
	case 'CLEAR_SESSION_LOGIN': {
		return Object.assign({}, state, {status:''});
	}
	case 'PROCESS_LOGOUT': {
		return Object.assign({}, state, {sessionActive:false, selected:null, status:'', callComplete:false});
	}
	case 'VIEW_PORT_CHANGE': {
		if (action.width <= 768) {
			return Object.assign({}, state, {viewPort:'small'});
		} else {
			return Object.assign({}, state, {viewPort:'large'});
		}
		
	}
	
	case 'MEMBER_PROFILE_ITEM': {
		if (action.responseJson !=  null && action.responseJson.params != null) {
			// load inputFields
			let inputFields = {};
			let prefForms = reducerUtils.getPrefForms(action);
			for (let i = 0; i < prefForms.MEMBER_PROFILE_FORM.length; i++) {
				if (prefForms.MEMBER_PROFILE_FORM[i].group === "FORM1") {
					let classModel = JSON.parse(prefForms.MEMBER_PROFILE_FORM[i].classModel);
					if (action.responseJson.params.item != null && action.responseJson.params.item[classModel.field]) {
						inputFields[prefForms.MEMBER_PROFILE_FORM[i].name] = action.responseJson.params.item[classModel.field];
					} else {
						let result = "";
						if (prefForms.MEMBER_PROFILE_FORM[i].value != null && prefForms.MEMBER_PROFILE_FORM[i].value != ""){
							let formValue = JSON.parse(prefForms.MEMBER_PROFILE_FORM[i].value);
							if (formValue.options != null) {
								for (let j = 0; j < formValue.options.length; j++) {
									if (formValue.options[j] != null && formValue.options[j].defaultInd == true){
										result = formValue.options[j].value;
									}
								}
							} else if (formValue.referPref != null) {
								let pref = action.appPrefs.prefTexts[formValue.referPref.prefName][formValue.referPref.prefItem];
								if (pref != null && pref.value != null && pref.value != "") {
									let value = JSON.parse(pref.value);
									if (value.options != null) {
										for (let j = 0; j < value.options.length; j++) {
											if (value.options[j] != null && value.options[j].defaultInd == true){
												result = value.options[j].value;
											}
										}
									}
								}
							}
						}
						inputFields[prefForms.MEMBER_PROFILE_FORM[i].name] = result;
					}
				}
			}
			// add id if this is existing item
			if (action.responseJson.params.item != null) {
				inputFields.itemId = action.responseJson.params.item.id;
			}
			return Object.assign({}, state, {
				prefForms: Object.assign({}, state.prefForms, reducerUtils.getPrefForms(action)),
				selected : action.responseJson.params.item,
				inputFields : inputFields,
				isModifyOpen: true
			});
		} else {
			return state;
		}
	}
	case 'MEMBER_PROFILE_INPUT_CHANGE': {
		return reducerUtils.updateInputChange(state,action);
	}
	case 'MEMBER_PROFILE_CLEAR_FIELD': {
		return reducerUtils.updateClearField(state,action);
	}
	case 'MEMBER_PROFILE_LISTLIMIT': {
		return reducerUtils.updateListLimit(state,action);
	}
	case 'MEMBER_PROFILE_SEARCH': { 
		return reducerUtils.updateSearch(state,action);
	}
	case 'MEMBER_PROFILE_ORDERBY': { 
		return reducerUtils.updateOrderBy(state,action);
	}
	case 'MEMBER_PROFILE_SET_ERRORS': {
		return Object.assign({}, state, {
			errors: action.errors
		});
	}
	case 'MEMBER_PROFILE_CLOSE_DELETE_MODAL': {
		return Object.assign({}, state, {
			isDeleteModalOpen: false
		});
	}
	case 'MEMBER_PROFILE_OPEN_DELETE_MODAL': {
		return Object.assign({}, state, {
			isDeleteModalOpen: true,
			selected: action.item
		});
	}
	case 'MEMBER_PROFILE_UPDATE': {
		let mySelected = { ...state.selected };
		for (let i = 0; i < action.memberState.prefForms.MEMBER_PROFILE_FORM.length; i++) {
			if (action.memberState.prefForms.MEMBER_PROFILE_FORM[i].group === "FORM1") {
				let classModel = JSON.parse(action.memberState.prefForms.MEMBER_PROFILE_FORM[i].classModel);
				mySelected[classModel.field] = action.memberState.inputFields[action.memberState.prefForms.MEMBER_PROFILE_FORM[i].name];
			}
		}
		return Object.assign({}, state, {
			selected: mySelected
		});
	}
	default:
		return state;
	}
}
