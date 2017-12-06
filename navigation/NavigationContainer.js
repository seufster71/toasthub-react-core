import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Navigation from '../../navigationViews/Navigation.js';
import callService from '../api/Api.js';

export default class NavigationContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menus: {}
		};
	}

	componentDidMount() {
		let requestParams = {};
		requestParams.action = "INIT_MENU";
		requestParams.service = "PUBLIC_SVC";
		requestParams.menuNames = new Array("PUBLIC_MENU_RIGHT");
		let params = {};
		params.requestParams = requestParams;
		params.URI = '/api/public/callService';
		params.responseCallBack = (params) => { this.setMenus(params); };
		callService(params);
	}

	setMenus(responseJson) {
		this.setState({menus:responseJson.params.MENUS});
	}

	navClick() {

	}

	render() {
		return (
			<Navigation headerName={this.props.headerName} menus={this.state.menus} navClick={this.props.navClick}/>
		);
	}
}

NavigationContainer.propTypes = {
	headerName: PropTypes.string.isRequired,
	navClick: PropTypes.func.isRequired
};
