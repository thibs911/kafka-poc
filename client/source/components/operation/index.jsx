import React, { Component } from 'react';
import PropTypes from 'prop-types';
import commonStyle from '../style.css';

export default class Operation extends Component {
  render() {
    const { stack = [] } = this.props;
    return <div className={commonStyle.minHeight}>{stack.join(' ')}</div>;
  }
}

Operation.propTypes = {
  stack: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
};
