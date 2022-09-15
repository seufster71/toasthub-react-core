/*
 * Copyright (C) 2016 The ToastHub Project
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
'use-strict';
import utils from '../../core/common/utils';
import fuLogger from '../../core/common/fu-logger';

const onListLimitChange = ({state,actions,dispatch,appPrefs,fieldName,event}) => {
	let value = 20;
	if (appPrefs.codeType === "Native") {
		value = event.nativeEvent.text;
	} else {
		value = event.target.value;
	}

	let listLimit = parseInt(value);
	dispatch(actions.listLimit({state:state,listLimit}));
}
	
const onPaginationClick = ({state,actions,dispatch,value}) => {
	fuLogger.log({level:'TRACE',loc:'BaseContainer::onPaginationClick',msg:"fieldName "+ value});
	let listStart = state.listStart;
	let paginationSegment = 1;
	let oldValue = 1;
	if (state.paginationSegment != ""){
		oldValue = state.paginationSegment;
	}
	if (value === "prev") {
		paginationSegment = oldValue - 1;
	} else if (value === "next") {
		paginationSegment = oldValue + 1;
	} else {
		paginationSegment = value;
	}
	listStart = ((paginationSegment - 1) * state.listLimit);

	dispatch(actions.list({state,listStart,paginationSegment}));
}
	
const onSearchChange = ({state,actions,dispatch,appPrefs,field,event}) => {
	if (event.type === 'keypress') {
		if (event.key === 'Enter') {
			onSearchClick({state,actions,dispatch,field,event});
		}
	} else {
		let value = "";
		if (appPrefs.codeType === 'NATIVE') {
			value = event.nativeEvent.text;
		} else {
			if (event != null) {
				if (event.target != null) {
					value = event.target.value;
				} else {
					value = event;
				}
			}
		}
		dispatch(actions.searchChange({field,value}));
	}
}

const onSearchClick = ({state,actions,dispatch,field,event}) => {
	let searchCriteria = [];
	let name = state.pageName + '-SEARCHBY';
	if (field === name) {
		if (event != null) {
			for (let o = 0; o < event.length; o++) {
				let option = {};
				option.searchValue = state.searchValue;
				option.searchColumn = event[o].value;
				searchCriteria.push(option);
			}
		}
	} else {
		for (let i = 0; i < state.searchCriteria.length; i++) {
			let option = {};
			option.searchValue = state.searchValue;
			option.searchColumn = state.searchCriteria[i].searchColumn;
			searchCriteria.push(option);
		}
	}

	dispatch(actions.search({state,searchCriteria}));
}
	
const onOrderBy = ({state, actions, dispatch, field, event}) => {
	fuLogger.log({level:'TRACE',loc:'BaseContainer::onOrderBy',msg:"orderby"});
	let orderCriteria = [];
	if (event != null) {
		for (let o = 0; o < event.length; o++) {
			let option = {};
			if (event[o].label.includes("ASC")) {
				option.orderColumn = event[o].value;
				option.orderDir = "ASC";
			} else if (event[o].label.includes("DESC")){
				option.orderColumn = event[o].value;
				option.orderDir = "DESC";
			} else {
				option.orderColumn = event[o].value;
			}
			orderCriteria.push(option);
		}
	} else {
		let orderColumn = state.pageName+"_TABLE_NAME";
		let option = {orderColumn,orderDir:"ASC"};
		orderCriteria.push(option);
	}
	dispatch(actions.orderBy({state,orderCriteria}));
}
	
const inputChange = ({state,actions,dispatch,appPrefs,type,field,value,event}) => {
	//fuLogger.log({level:'TRACE',loc:'BaseContainer::inputChange',msg:"field "+ field + " value " + value});
	let val = "";
		if (value == null || value == "") {
			if (appPrefs.codeType === "Native") {
				val = event.nativeEvent.text;
			} else {
				if (event != null) {
					if (event.target != null) {
						val = event.target.value;
					} else {
						val = event;
					}
				} else {
					val = value;
				}
			}
		} else {
			val = value;
		}
		if (type === "DATE") {
			val = event.toISOString();
			dispatch(actions.inputChange(field,val));
		} else if (type === "TEXT") {
			dispatch(actions.inputChange(field,val));
		} else if (type === "SWITCH") {
			dispatch(actions.inputChange(field,val));
		} else if (type === "SELECT" || type === "MULTISELECT") {
			let myVal = value;
			if (typeof val === 'object' && val.value != null) {
				myVal = val.value
			}
			dispatch(actions.selectChange({field,"value":myVal}));
		} else if (type === "SELECTCLICK") {
			dispatch(actions.selectClick({field,value}));
		} else if (type === "SELECTUPDATE") {
			dispatch(actions.selectListUpdate({field,"value":val}));
		}
}

const onSave = ({state,actions,dispatch,appPrefs,form}) => {
	fuLogger.log({level:'TRACE',loc:'BaseContainer::onSave',msg:"test"});
	let errors = utils.validateFormFields(state.prefForms[form], state.inputFields, appPrefs.prefGlobal.LANGUAGES);
	
	if (errors.isValid){
		dispatch(actions.saveItem({state}));
	} else {
		dispatch(actions.setStatus({successes:null, errors:errors.errorMap}));
	}
}

const closeModal = ({actions,dispatch}) => {
	dispatch(actions.closeDeleteModal());
}

const onCancel = ({state,actions,dispatch}) => {
	fuLogger.log({level:'TRACE',loc:'BaseContainer::onCancel',msg:"test"});
	dispatch(actions.cancel({state}));
}

const goBack = ({navigate}) => {
	fuLogger.log({level:'TRACE',loc:'BaseContainer::goBack',msg:"test"});
	navigate(-1);
}

const onOptionBase = ({state,actions,dispatch,code,appPrefs,item}) => {
	fuLogger.log({level:'TRACE',loc:'BaseContainer::onOptionBase',msg:" code "+code});
	switch(code) {
		case 'MODIFY': {
			let id = null;
			if (item != null && item.id != null) {
				id = item.id;
			}
			dispatch(actions.modifyItem({state,id,appPrefs:appPrefs}));
			return true;
		}
		case 'DELETE': {
			dispatch(actions.openDeleteModal({item}));
			return true;
		}
		case 'DELETEFINAL': {
			dispatch(actions.deleteItem({state,id:item.id}));
			return true;
		}
	}
}

const onBlur = ({state,actions,dispatch,field}) => {
	let fieldName = field.name;
	// get field and check what to do
	if (field.optionalParams != ""){
		let optionalParams = JSON.parse(field.optionalParams);
		if (optionalParams.onBlur != null) {
			if (optionalParams.onBlur.validation != null && optionalParams.onBlur.validation == "matchField") {
				if (field.validation != "") {
					let validation = JSON.parse(field.validation);
					if (validation[optionalParams.onBlur.validation] != null && validation[optionalParams.onBlur.validation].id != null){
						if (state.inputFields[validation[optionalParams.onBlur.validation].id] == state.inputFields[fieldName]) {
							if (validation[optionalParams.onBlur.validation].successMsg != null) {
								let successMap = state.successes;
								if (successMap == null){
									successMap = {};
								}
								successMap[fieldName] = validation[optionalParams.onBlur.validation].successMsg;
								dispatch(actions.setStatus({successes:successMap, errors:null}));
							}
						} else {
							if (validation[optionalParams.onBlur.validation].failMsg != null) {
								let errorMap = state.errors;
								if (errorMap == null){
									errorMap = {};
								}
								errorMap[fieldName] = validation[optionalParams.onBlur.validation].failMsg;
								dispatch(actions.setStatus({successes:null, errors:errors.errorMap}));
								
							}
						}
					}
				}
			} else if (optionalParams.onBlur.func != null) {
				
			}
		}
	}

}

export default { onListLimitChange, onPaginationClick, onSearchChange, onSearchClick, onOrderBy, inputChange, onSave, closeModal, onCancel, goBack, onOptionBase, onBlur }