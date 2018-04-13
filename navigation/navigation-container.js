import React, { Component } from "react";
import PropTypes from "prop-types";
import NavigationView from "../../coreView/navigation/navigation-view.js";
import callService from "../api/api-call";
import { connect } from "react-redux";
import { withRouter } from "react-router";

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
      <NavigationView
        appPrefs={this.props.appPrefs}
        menus={menus}
        navClick={this.props.navClick}
      />
    );
  }
}

NavigationContainer.propTypes = {
  appPrefs: PropTypes.object.isRequired,
  navClick: PropTypes.func.isRequired,
  menus: PropTypes.object,
  lang: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {
    lang: state.lang,
    appPrefs: state.appPrefs
  };
}

export default withRouter(connect(mapStateToProps)(NavigationContainer));
