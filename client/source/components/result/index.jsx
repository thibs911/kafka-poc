import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import commonStyle from '../style.css';

export default class Result extends PureComponent {
  render() {
    const { result } = this.props;
    return (
      <div className={commonStyle.minHeight}>
        {result === null ? 'ERROR' : result}
      </div>
    );
  }
}

Result.propTypes = {
  result: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
