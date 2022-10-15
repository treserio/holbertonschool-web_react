import React from 'react';
import { mount } from 'enzyme';
import WithLogging from './WithLogging';
import Login from '../Login/Login';
import { StyleSheetTestUtils } from 'aphrodite';

global.console.log = jest.fn()

describe('WithLogging wraps component', () => {

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

	const spy = jest.spyOn(console, 'log');
  const wrapper = mount(< WithLogging Wrapped={<Login />} />);

  it('to console.log message when mounted', () => {
    expect(spy).toHaveBeenCalledWith('Component Login is mounted');
  });

  it('to console.log message when unmounted', () => {
    wrapper.unmount();
    expect(spy).toHaveBeenCalledWith('Component Login is going to unmount');
  });
});
