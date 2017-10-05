import React, { Component } from 'react';
import Navigation from './Navigation.js'

export default class NavigationContainer extends Component {
	  constructor(props) {
	    super(props);
			this.state = {
				 menus: {}
		 };
	  }

		componentWillMount() {
		  let requestParams = {};
			requestParams.action = "INIT_MENU";
			requestParams.service = "PUBLIC_SVC";
			requestParams.menuNames = new Array("PUBLIC_MENU_RIGHT");
		  fetch('/api/public/callService',{
			  method: 'POST',
			  headers: {
			      "Content-type": "application/json"
			    },
			  body: JSON.stringify({params:requestParams})
		  })
			.then((response) => response.json())
		  .then((responseJson) => {
			  console.log('Request succeeded with JSON response', responseJson);
			  this.setState({menus:responseJson.params.MENUS})
		  })
		  .catch(function(error) {
			  console.log('Request failed', error);
		  });
		}

	  render() {
		  return (
				  <Navigation headerName={this.props.headerName} menus={this.state.menus}/>
		  );
	  }
}
