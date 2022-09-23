/*
* Author Edward Seufert
*/
'use-strict';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../usermgnt/usermgnt-actions';
import fuLogger from '../common/fu-logger';
import LogoutView from '../../coreView/logout/logout-view';

function LogoutContainer() {
	const session = useSelector((state) => state.session);
	const appPrefs = useSelector((state) => state.appPrefs);
	const dispatch = useDispatch();
	
	fuLogger.log({level:'TRACE',loc:'LogoutContainer::mount',msg:"Logging out"});
	useEffect(() => {
		dispatch(actions.logout());
	}, []);

    return (
		<LogoutView/>
	);
 
}


export default LogoutContainer;
