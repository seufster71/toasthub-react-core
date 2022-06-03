import fuLogger from '../common/fu-logger';
import {getHost} from '../../App';

export default function callService(params) {
	
  let requestParams = {};
  if (params != null) {
    if (params.requestParams == null) {
      fuLogger.log({level:'TRACE',loc:'api::callService',msg:"Params are missing"});
    } else {
      requestParams = params.requestParams;
    }
  } else {
    fuLogger.log({level:'TRACE',loc:'api::callService',msg:"Params are missing"});
    return;
  }
  requestParams.metrics = {};
  const d = new Date();
  requestParams.metrics.browserStart = d.getTime();
  requestParams.metrics.browserZone = new Date()
    .toString()
    .match(/([A-Z]+[+-][0-9]+.*)/)[1];

  fuLogger.log({level:'TRACE',loc:'api::callService',msg:"Request "+JSON.stringify(params)});

  return new Promise((resolve, reject) => {
    const uri = getHost()+params.URI;
    let headers = new Headers();
    headers.set("Content-type","application/json");
    if (params.auth != null) {
    	headers.set("Authorization", "Basic " + params.auth);
    }
    fetch(uri, {
      method: "POST",
      credentials: "same-origin",
      headers: headers,
      body: JSON.stringify({ params: params.requestParams })
    })
      .then(function(response) {
    	  if (response.status >= 400) {
    		  let responseMsg = {status:"ERROR", protocalError:response.status};
    		  fuLogger.log({level:'TRACE',loc:'api::callService',msg:"Received "+params.requestParams.service+" "+params.requestParams.action,msgObj:response.status});
    		  resolve(responseMsg);
    	  } else {
    		  fuLogger.log({level:'TRACE',loc:'api::callService',msg:"Response "+params.requestParams.service+" "+params.requestParams.action+" success with JSON response"});
    	      resolve(response.json());
    	  }
        
      })
      .catch(function(error) {
        fuLogger.log({level:'TRACE',loc:'api::callService',msg:"Request failed",msgObj:error});
        resolve();
      });
  });
}
