import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import chunk from 'lodash/chunk';
import map from 'lodash/map';

import styles from './style.css';

const raisedButtonStyle = {
  flex: 1,
};

const raisedButtonCancelStyle = {
  flex: 0.25,
};
const middlePanel = [
  '7',
  '8',
  '9',
  '/',
  '4',
  '5',
  '6',
  '*',
  '1',
  '2',
  '3',
  '-',
  '0',
  '.',
  '=',
  '+',
];

export class Panel extends Component {
  onClick = item => () => {
    const newStack = this.props.stack;
    newStack.push(item);
    this.props.updateStack(newStack);
  };

  onClickCancel = () => {
    this.props.clearCalculator();
  };

  render() {
    const middlePanelChunked = chunk(middlePanel, 4);
    return (
      <div className={styles.panelWrapper}>
        <div className={styles.cancel}>
          <RaisedButton
            label="C"
            style={raisedButtonCancelStyle}
            onClick={this.onClickCancel}
          />
        </div>
        {map(middlePanelChunked, (row, index) => (
          <div className={styles.rowWrapper} key={index}>
            {map(row, item => (
              <RaisedButton
                label={item}
                style={raisedButtonStyle}
                key={item}
                onClick={this.onClick(item)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

Panel.propTypes = {
  updateStack: PropTypes.func.isRequired,
  clearCalculator: PropTypes.func.isRequired,
  stack: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
};

export default Panel;
