import React from 'react';
import NavbarHeader from './NavbarHeader.js'
import NavbarMenu from './../../navigationViews/NavbarMenu.js'

export default function Navigation(props) {

  return (
    <nav id="mainNav" className="navbar navbar-Public navbar-custom navbar-fixed-top affix">
     <div className="container">
       <NavbarHeader headerName={props.headerName}/>
       <NavbarMenu menus={props.menus}/>
     </div>
    </nav>

  );
}
