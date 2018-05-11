import React from 'react';
import { shallow } from 'enzyme';
import RaisedButton from 'material-ui/RaisedButton';
import { Panel } from '../../components/panel';

describe('<Panel />', () => {
  const props = {
    stack: ['1', '+', '1'],
    clearCalculator: jest.fn(),
    updateStack: jest.fn(),
  };

  it('should have 17 RaisedButton', () => {
    const wrapper = shallow(<Panel {...props} />);
    const buttonWrapper = wrapper.find(RaisedButton);
    expect(buttonWrapper.length).toEqual(17);
  });

  it('should call the actions of calculator', () => {
    const wrapper = shallow(<Panel {...props} />);
    const buttonWrapper = wrapper.find(RaisedButton);
    const cancelButton = buttonWrapper.get(0);
    expect(cancelButton.props.label).toEqual('C');
    cancelButton.props.onClick();
    expect(props.clearCalculator).toHaveBeenCalledTimes(1);
    const sevenButton = buttonWrapper.get(1);
    expect(cancelButton.props.label).toEqual('C');
    sevenButton.props.onClick();
    expect(props.updateStack).toHaveBeenCalledTimes(1);
    expect(props.updateStack).toHaveBeenCalledWith(['1', '+', '1', '7']);
  });
});
