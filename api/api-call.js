import React from "react";
import fuLogger from '../common/fu-logger';
import {getHost} from '../../App';
// test
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

  return new Promise((resolve, reject) => {
    const uri = getHost()+params.URI;
    fetch(uri, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ params: params.requestParams })
    })
      .then(response => response.json())
      .then(responseJson => {
        fuLogger.log({level:'TRACE',loc:'api::callService',msg:"Request succeeded with JSON response ",msgObj:responseJson});
        resolve(responseJson);
        //params.responseCallBack(responseJson);
      })
      .catch(function(error) {
        fuLogger.log({level:'TRACE',loc:'api::callService',msg:"Request failed",msgObj:error});
        resolve();
      });
  });
}
