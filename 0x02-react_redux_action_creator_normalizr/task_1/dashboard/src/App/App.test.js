import React from 'react';
import App from './App';
import { mount } from 'enzyme';
import { assert } from 'chai';
import { StyleSheetTestUtils } from 'aphrodite';

global.console.log = jest.fn()

describe('App Renders', () => {

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const alert = jest.spyOn(window, 'alert').mockImplementation((text) => console.log(text));

  const app = mount(<App />);
  const logout = jest.spyOn(app.state(), 'logout');

  const header = app.find('Header');
  const body = app.find('.App-body');
  const footer = app.find('Footer');
  const notificationsRender = app.find('Notifications').render();
  const headerRender = app.find('Header').render();
  const loginRender = app.find('Login').render();
  const courseListRender = app.find('CourseList');
  const footerRender = app.find('Footer').render();

  it('without crashing', () => {
    assert.equal(app.length, 1);
  });

  it('the header', () => {
    assert.equal(header.length, 1);
  });

  it('the body', () => {
    assert.equal(body.length, 1);
  });

  it('the footer', () => {
    assert.equal(footer.length, 1);
  });

  it('children that render correctly', () => {
    assert.equal(notificationsRender.find('.menuItem').length, 1);
    assert.equal(notificationsRender.length, 1);
    assert.equal(notificationsRender.find('NotificationItem').length, 0);
    assert.equal(notificationsRender.children().length, 1);
    assert.equal(headerRender.children().length, 2);
    assert.equal(loginRender.length, 2);
    assert.equal(footerRender.length, 1);
  });

  it('an alert and calls the function logout when ctrl-h is pressed', () => {
    document.dispatchEvent(new KeyboardEvent("keydown", { ctrlKey: true, key: 'h' }));
    expect(alert).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith('Logging you out');
    expect(logout).toHaveBeenCalled();
  });

  it('app.state.displayDrawer is false, and true after handleDisplayDrawer', () => {
    assert.equal(app.state().displayDrawer, false);
    app.instance().handleDisplayDrawer();
    assert.equal(app.state().displayDrawer, true);
  });

  it('app.state.displayDrawer is true, and false after handleHideDrawer', () => {
    app.instance().handleHideDrawer();
    assert.equal(app.state().displayDrawer, false);
  });

  it('does not log in when enableSubmit = false and form is submitted', () => {
    app.find('form').simulate('submit')
    expect(alert).toHaveBeenCalledWith('Please enter email and password to proceed');
  });

  it('logs in when email & password are entered and form is submitted', () => {
    app.find('form').find('input').first().simulate('change', { target: { value: 'a@b' }});
    app.find('input').at(1).simulate('change', { target: { value: 'c' }});
    app.find('form').simulate('submit')
    assert.notStrictEqual(app.state().user, {
      email: 'a@b',
      password: 'c',
      isLoggedIn: true,
    })
  });

  it('updated Notifications when one is clicked, will run markNotificationAsRead', () => {
    app.find('.menuItem').simulate('click');
    assert.equal(app.find('NotificationItem').length, 3);
    // was unable to spyOn markNot func in app.instance() or in the props of first()
    app.find('NotificationItem').first().simulate('click');
    assert.equal(app.find('NotificationItem').length, 2);
  });

  it('NOT the CourseList', () => {
    assert.equal(courseListRender.length, 0);
  });
});

describe('Logged in App Renders', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  let app = mount(<App />);
  // login the app
  app.setState({ user: {isLoggedIn: true }});
  const body = app.find('.App-body');
  const login = body.find('Login');
  const courseListRender = body.find('CourseList').render()[0];

  it('without crashing', () => {
    assert.equal(app.length, 1);
  });

  it('the CourseList', () => {
    assert.equal(courseListRender.name, 'table');
  });

  it('NOT the Login', () => {
    assert.equal(login.length, 0);
  });
});
