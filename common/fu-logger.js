
import React from 'react';
import PropTypes from 'prop-types';
import {getDebugClient} from '../../app';

const log = (params) => {
  let x = getDebugClient();
  if (x) {
    if (params.msgObj != null) {
      console.log(params.loc +"__"+ params.level +"__"+ params.msg, params.msgObj);
    } else {
      console.log(params.loc +"__"+ params.level +"__"+ params.msg);
    }
  }
};

export default {log};
