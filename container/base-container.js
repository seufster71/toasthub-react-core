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
import React, {Component} from 'react';
import utils from '../../core/common/utils';
import fuLogger from '../../core/common/fu-logger';


class BaseContainer extends Component {
	constructor(props) {
		super(props);
	}
	
	onListLimitChange = (fieldName, event) => {
		let value = 20;
		if (this.props.codeType === 'NATIVE') {
			value = event.nativeEvent.text;
		} else {
			value = event.target.value;
		}

		let listLimit = parseInt(value);
		this.props.actions.listLimit({state:getState(),listLimit});
	}
	
	onPaginationClick = (value) => {
		fuLogger.log({level:'TRACE',loc:'BaseContainer::onPaginationClick',msg:"fieldName "+ value});
		let state = this.getState();
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

		this.props.actions.list({state,listStart,paginationSegment});
	}
	
	onSearchChange = (field, event) => {
		if (event.type === 'keypress') {
			if (event.key === 'Enter') {
				this.onSearchClick(field,event);
			}
		} else {
			let value = "";
			if (this.props.codeType === 'NATIVE') {
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
			this.props.actions.searchChange({value});
		}
	}

	onSearchClick = (fieldName, event) => {
		let state = this.getState();
		let searchCriteria = [];
		let name = state.pageName + '-SEARCHBY';
		if (fieldName === name) {
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

		this.props.actions.search({state,searchCriteria});
	}
	
	onOrderBy = (selectedOption, event) => {
		fuLogger.log({level:'TRACE',loc:'BaseContainer::onOrderBy',msg:"id " + selectedOption});
		let state = this.getState();
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
		this.props.actions.orderBy({state,orderCriteria});
	}
	
	inputChange = (type,field,value,event) => {
		//fuLogger.log({level:'TRACE',loc:'BaseContainer::inputChange',msg:"field "+ field + " value " + value});
		utils.inputChange({type,props:this.props,field,value,event});
	}
	
	onSave = () => {
		fuLogger.log({level:'TRACE',loc:'BaseContainer::onSave',msg:"test"});
		let state = this.getState();
		let form = this.getForm();
		let errors = utils.validateFormFields(state.prefForms[form], state.inputFields, this.props.appPrefs.prefGlobal.LANGUAGES);
		
		if (errors.isValid){
			this.props.actions.saveItem({state});
		} else {
			this.props.actions.setErrors({errors:errors.errorMap});
		}
	}
	
	onModify = (item) => {
		let id = null;
		let state = this.getState();
		if (item != null && item.id != null) {
			id = item.id;
		}
		fuLogger.log({level:'TRACE',loc:'BaseContainer::onModify',msg:"item id "+id});
		this.props.actions.modifyItem({state,id,appPrefs:this.props.appPrefs});
	}
	
	onDelete = (item) => {
		fuLogger.log({level:'TRACE',loc:'BaseContainer::onDelete',msg:"test"+item.id});
		let state = this.getState();
		this.props.actions.deleteItem({state,id:item.id});
	}
	
	openDeleteModal = (item) => {
		this.props.actions.openDeleteModal({item});
	}
	
	closeModal = () => {
		this.props.actions.closeDeleteModal();
	}
	
	onCancel = () => {
		fuLogger.log({level:'TRACE',loc:'BaseContainer::onCancel',msg:"test"});
		let state = this.getState();
		this.props.actions.list({state});
	}
	
	goBack = () => {
		fuLogger.log({level:'TRACE',loc:'BaseContainer::goBack',msg:"test"});
		this.props.history.goBack();
	}
	
	onOptionBase = (code,item) => {
		fuLogger.log({level:'TRACE',loc:'BaseContainer::onOptionBase',msg:" code "+code});
		switch(code) {
			case 'MODIFY': {
				this.onModify(item);
				return true;
			}
			case 'DELETE': {
				this.openDeleteModal(item);
				return true;
			}
			case 'DELETEFINAL': {
				this.onDelete(item);
				return true;
			}
		}
	}

}

export default BaseContainer;
