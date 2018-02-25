import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Navigation from '../../coreWeb/navigation/NavigationView.js';
import callService from '../api/Api.js';
import {connect} from 'react-redux';

class NavigationContainer extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		let menus = {};
		if (this.props.menus != null) {
			menus = this.props.menus;
		}
		return (
			<Navigation appPrefs={this.props.appPrefs} menus={menus} menuName={this.props.menuName} navClick={this.props.navClick}/>
		);
	}
}

NavigationContainer.propTypes = {
	appPrefs: PropTypes.object.isRequired,
	menuName: PropTypes.string.isRequired,
	navClick: PropTypes.func.isRequired,
	menus: PropTypes.object,
	lang: PropTypes.string,
	appGlobal: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {menus:state.appMenus, lang:state.lang, appPrefs:state.appPrefs, appGlobal:state.appPrefs.appGlobal};
}

export default connect(mapStateToProps)(NavigationContainer);
