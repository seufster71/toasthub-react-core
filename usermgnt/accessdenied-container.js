/*
* Author Edward Seufert
*/
'use-strict';
import React from 'react';
import fuLogger from '../../core/common/fu-logger';
import AccessDeniedView from '../../coreView/usermgnt/accessdenied-view';

function AccessDeniedContainer(){

	fuLogger.log({level:'TRACE',loc:'AccessDeniedContainer::render',msg:"Hi there"});
    return (
		<AccessDeniedView/>
	);

}

export default AccessDeniedContainer;
