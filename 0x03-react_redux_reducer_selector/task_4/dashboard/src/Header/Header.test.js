import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import { mount } from 'enzyme';
import { assert } from 'chai';
import { StyleSheetTestUtils } from 'aphrodite';
import AppContext from '../App/AppContext';

describe('Header Renders', () => {

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const header = mount(
    <AppContext.Provider value={AppContext._currentValue}>
      <Header />
    </AppContext.Provider>
  );
  // loggedIn context
  const loggedInContext = {
    user: { email: 'a@b', password: 'c', isLoggedIn: true },
    logout: jest.fn(),
  };
  const loggedIn = mount(
    <AppContext.Provider value={loggedInContext}>
      <Header />
    </AppContext.Provider>
  );

  it('without crashing', () => {
    assert.equal(header.length, 1);
  });

  it('img and h1 tag', () => {
    assert.equal(header.find('img').length, 1);
    assert.equal(header.find('h1').length, 1);
  });

  it('NOT #logoutSection', () => {
    assert.equal(header.find('#logoutSection').length, 0);
  });

  it('#logoutSection once logged in with correct email', () => {
    assert.equal(loggedIn.find('#logoutSection').length, 1);
    assert.equal(loggedIn.find('#logoutSection').text(), 'Welcome a@b\xa0(logout)');
  });

  it('logout button with correct function', () => {
    loggedIn.find('a').simulate('click');
    expect(loggedInContext.logout).toHaveBeenCalled();
  });

});
