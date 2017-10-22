import React, { Component } from 'react';

export default class LoginContainer extends Component {
    constructor(props) {
	    super(props);
			this.state = {
        fields:{}
		  };
	  }


    render() {
      return (
          <Login menus={this.state.fields}/>
      );
    }

}
