import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import { mount } from 'enzyme';
import { assert } from 'chai';
import { StyleSheetTestUtils } from 'aphrodite';

global.console.log = jest.fn()

describe('Login Renders ', () => {
  const out = jest.spyOn(console, "log");

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  let em = '';
  let pw = '';
  let enableSubmit = false;
  function loginSubmit(event) {
    event.preventDefault();
    if (enableSubmit) {
      console.log('logging in');
    } else console.log('Please enter email and password to proceed');
  }

  const handleChangeEmail = jest.fn(() => {
    em = 'a@b';
    em && pw ? enableSubmit = true : enableSubmit = false;
  });

  const handleChangePassword = jest.fn(() => {
    pw = 'c';
    em && pw ? enableSubmit = true : enableSubmit = false;
  });

  // renders
  const login = mount(<Login
    handleLoginSubmit={loginSubmit}
    email={em}
    password={pw}
    handleChangeEmail={handleChangeEmail}
    handleChangePassword={handleChangePassword}
  />);
  const form = login.find('form')

  it('without crashing', () => {
    assert.equal(login.length, 1);
  });

  it('label tags x2 & input tags x3', () => {
    assert.equal(login.find('label').length, 2);
    assert.equal(login.find('input').length, 3);
  });

  it('does not log in when enableSubmit = false and loginSubmit is called', () => {
    form.simulate('submit');
    expect(out).toHaveBeenCalledWith('Please enter email and password to proceed');
  });

  it('email change when handleChangeEmail is called', () => {
    login.find('input').at(0).simulate('change')
    assert.equal(em, 'a@b');
  });

  it('password change when handleChangePassword is called', () => {
    login.find('input').at(1).simulate('change')
    assert.equal(pw, 'c');
  });

  it('enabled submit button when email and password are entered', () =>{
    assert.equal(enableSubmit, true);
  });

  it('logs in when enableSubmit = true and loginSubmit is called', () => {
    form.simulate('submit');
    expect(out).toHaveBeenCalledWith('logging in');
  });
});
