import React, { Component } from 'react';

export default class Api extends Component {
	  constructor(props) {
	    super(props);
			this.callService = this.callService.bind(this);
	  }

		callService(params) {
			let requestParams = {};
			if (params != null ) {
				if ( params.requestParams == null ) {
					console.log('Params are missing');
				} else {
					requestParams = params.requestParams;
				}
			} else {
				console.log('Missing params');
				return;
			}
			requestParams.metrics = {};
			const d = new Date();
			requestParams.metrics.browserStart = d.getTime();
			requestParams.metrics.browserZone = new Date().toString().match(/([A-Z]+[+-][0-9]+.*)/)[1];
		  fetch('/api/public/callService',{
			  method: 'POST',
			  headers: { "Content-type": "application/json" },
			  body: JSON.stringify({params:params.requestParams})
		  })
			.then((response) => response.json())
		  .then((responseJson) => {
			  console.log('Request succeeded with JSON response', responseJson);
			  	params.responseCallBack(responseJson);
		  })
		  .catch(function(error) {
			  console.log('Request failed', error);
		  });
		}
}
