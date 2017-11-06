import React, { Component } from 'react';
import Navigation from './../../navigationViews/Navigation.js';
import Api from '../api/Api.js';

export default class NavigationContainer extends Component {
	  constructor(props) {
	    super(props);
			this.state = {
				 menus: {}
		 };
	  }

		setMenus(responseJson) {
			this.setState({menus:responseJson.params.MENUS})
		}

		componentDidMount() {
		  let requestParams = {};
			requestParams.action = "INIT_MENU";
			requestParams.service = "PUBLIC_SVC";
			requestParams.menuNames = new Array("PUBLIC_MENU_RIGHT");
			let params = {};
			params.requestParams = requestParams;
			params.responseCallBack = (params) => {this.setMenus(params)};
			Api.callService(params);
		}

	  render() {
		  return (
				  <Navigation headerName={this.props.headerName} menus={this.state.menus} navChange={this.props.navChange}/>
		  );
	  }
}
