import React from 'react';
import Login from './Login';
import { mount } from 'enzyme';
import { assert } from 'chai';
import { StyleSheetTestUtils } from 'aphrodite';

global.console.log = jest.fn()

describe('Login Renders ', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const alert = jest.spyOn(window, 'alert').mockImplementation((text) => console.log(text));
  const loginFunc = jest.fn();

  const login = mount(<Login login={loginFunc} />);
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
    expect(alert).toHaveBeenCalledWith('Please enter email and password to proceed');
  });

  // unable to check the state of funcational components
  // instead check the results of the change
  it('email change when handleChangeEmail is called', () => {
    login.find('input').at(0).simulate('change', { target: { value: 'a@b' }});
    assert.equal(login.find('input').at(0).render()[0].attribs.value, 'a@b')
  });

  it('password change when handleChangePassword is called', () => {
    login.find('input').at(1).simulate('change', { target: { value: 'c' }})
    assert.equal(login.find('input').at(1).render()[0].attribs.value, 'c')
  });

  it('enabled submit when email & password entered, loginFunc called', () =>{
    form.simulate('submit');
    expect(loginFunc).toHaveBeenCalledWith('a@b', 'c');
  });

});
