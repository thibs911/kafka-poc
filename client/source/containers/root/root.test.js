import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jsdom from 'jsdom';

import { Root } from './index';
import HeaderBar from '../../components/header-bar';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

const middleware = [thunk];
const initialState = {
  language: {
    selected: 'en',
  },
  calculator: {
    stack: [],
    result: '',
    randomMode: false,
  },
};
const mockStore = configureMockStore(middleware);
const store = mockStore(initialState);

injectTapEventPlugin();

describe('<Root/>', () => {
  const props = {
    languageSelected: 'en',
    randomMode: false,
    stack: [],
  };

  it('should display HeaderBar', () => {
    const muiTheme = getMuiTheme();
    const wrapper = mount(
      <MemoryRouter>
        <Root {...props} />
      </MemoryRouter>,
      {
        context: { muiTheme, store },
        childContextTypes: {
          muiTheme: PropTypes.object,
          store: PropTypes.object,
        },
      },
    );
    const rootWrapper = wrapper.find(Root);
    const headerBarWrapper = rootWrapper.find(HeaderBar);
    expect(headerBarWrapper.length).toEqual(1);
  });
});
