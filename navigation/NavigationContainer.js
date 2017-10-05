import React, { Component } from 'react';
import Navigation from './Navigation.js'

export default class NavigationContainer extends Component {
	  constructor(props) {
	    super(props);
	  }

	  render() {
		  return (
				  <Navigation headerName={this.props.headerName}/>
		  );
	  }
}
