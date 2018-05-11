import React from 'react';
import { shallow } from 'enzyme';
import { Calculator } from './index';
import { Panel } from '../../components/panel';
import { Result } from '../../components/result';
import { Operation } from '../../components/operation';

describe('<Calculator />', () => {
  const props = {
    calculator: {
      stack: ['1', '+', '1'],
      result: 11,
    },
  };

  it('should display all child', () => {
    const wrapper = shallow(<Calculator {...props} />);
    const panelWrapper = wrapper.find(Panel);
    expect(panelWrapper.length).toEqual(1);
    const resultWrapper = wrapper.find(Result);
    expect(resultWrapper.length).toEqual(1);
    const operationWrapper = wrapper.find(Operation);
    expect(operationWrapper.length).toEqual(1);
  });
});
