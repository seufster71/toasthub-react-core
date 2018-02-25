import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';


class StatusContainer extends Component {
    constructor(props) {
      super(props);

    }

    render() {
      let statusMsg = 'No status';
      if (this.props.error != null ) {
        statusMsg = 'Got error';
      } else if (this.props.info != null) {
        statusMsg = 'Got info';
      } else if (this.props.warn != null) {
        statusMsg = 'Got warn';
      }
      return (
        <div> {statusMsg} </div>
      );

    }

}

StatusContainer.propTypes = {
  appGlobal: PropTypes.object,
  error: PropTypes.array,
  info: PropTypes.array,
  warn: PropTypes.array,
  lang: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {lang:state.appPrefs.lang, appGlobal:state.appPrefs.appGlobal, error:state.status.error, info:state.status.info, warn:state.status.warn};
}


export default connect(mapStateToProps)(StatusContainer);
