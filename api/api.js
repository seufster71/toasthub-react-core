import React from 'react';

export default function callService(params) {

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

		return new Promise((resolve,reject) => {
			fetch(params.URI,{
				method: 'POST',
				credentials: 'same-origin',
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({params:params.requestParams})
			})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log('Request succeeded with JSON response', responseJson);
				resolve(responseJson);
				//params.responseCallBack(responseJson);
			})
			.catch(function(error) {
				console.log('Request failed', error);
				resolve();
			});

		});
}
