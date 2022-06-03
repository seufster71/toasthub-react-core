import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import utils from './utils';

export const PrivateRoute = ({component:Component, path:Path, permissions:Permissions, code:Code, minRights:MinRights, pathto:PathTo}) => {
    if (utils.hasPermission(Permissions,Code,MinRights)) {
		return <Outlet />;
	} else {
		return <Navigate to={PathTo}/>;
	}
};
