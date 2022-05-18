import React from 'react';
import {Outlet, Navigate} from 'react-router-native';

export const PrivateRoute = ({component:Component, path:Path, permissions:Permissions, code:Code, minRights:MinRights, pathto:PathTo}) => {
    if (hasPermission(Permissions,Code,MinRights)) {
		return <Outlet />;
	} else {
		return <Navigate to={PathTo}/>;
	}
};
