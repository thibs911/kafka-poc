import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import Card from '../../components/card';
import { Operation } from '../../components/operation';
import { Result } from '../../components/result';
import { Panel } from '../../components/panel';

import { updateStack, clearCalculator } from '../../actions/calculator';
import { sendMessage } from '../../effects/calculator';
import styles from './style.css';

export class Calculator extends Component {
  render() {
    const { calculator: { stack = [], result } } = this.props;
    return (
      <div
        className={styles.container}
        onKeyPress={this.onKeyPress}
        role="presentation"
      >
        <div className={styles.panelMargin}>
          <Card>
            <div>
              <Operation stack={stack} />
              <Result result={result} />
              <Panel
                updateStack={this.props.updateStack}
                stack={stack}
                clearCalculator={this.props.clearCalculator}
              />
            </div>
          </Card>
          <div className={styles.kafka}>
            <RaisedButton
              label="Send to Kafka"
              labelPosition="before"
              primary={true}
              onClick={this.props.sendMessage}
            />
          </div>
        </div>
      </div>
    );
  }
}

Calculator.propTypes = Panel.propTypes;

const mapStateToProps = state => ({
  calculator: state.calculator,
});

const mapDispatchToProps = dispatch => ({
  updateStack(payload) {
    dispatch(updateStack(payload));
  },
  clearCalculator() {
    dispatch(clearCalculator());
  },
  sendMessage(message) {
    dispatch(sendMessage(message));
  },
});

const mergeProps = (state, dispatchProps, props) => ({ // eslint-disable-line
  ...state,
  ...dispatchProps,
  sendMessage() {
    const { stack = [], result } = state.calculator;
    const stackString = stack.join(' ');
    return dispatchProps.sendMessage(stackString.concat(` ${result}`));
  },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Calculator,
);
