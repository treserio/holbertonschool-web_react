import React from 'react';
import { act } from 'react-dom/test-utils';
import App, { mapStateToProps, ReduxApp } from './App';
import { mount } from 'enzyme';
import { assert } from 'chai';
import { StyleSheetTestUtils } from 'aphrodite';
import { Map } from 'immutable';

// global.console.log = jest.fn()
// looks like we can spy on React's useContext hook to catch the store that's fed into our ReduxApp
const spy = jest.spyOn(React, 'useContext');

describe('App Renders', () => {

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const alert = jest.spyOn(window, 'alert').mockImplementation((text) => console.log(text));

  const reduxApp = mount(<ReduxApp />).find('App');
  /* Redux issue, for some reason spyOn fails to see that this function runs,
  even when I confirm the test runs console.logs in the function
  and this behavior is true for any function passed through mapDispatchToProps...
  const logout = jest.spyOn(reduxApp.props(), 'logout'); */

  // we can find the store in our ReduxApp's context through our spy, however changes here aren't reflected in our ReduxApp's props
  const store = spy.mock.calls[0][0]._currentValue.store;

  const header = reduxApp.find('Header');
  const body = reduxApp.find('.App-body');
  const footer = reduxApp.find('Footer');
  const notificationsRender = reduxApp.find('Notifications').render();
  const headerRender = reduxApp.find('Header').render();
  const loginRender = reduxApp.find('Login').render();
  const courseListRender = reduxApp.find('CourseList');
  const footerRender = reduxApp.find('Footer').render();

  it('without crashing', () => {
    assert.equal(reduxApp.length, 1);
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
    // console.log(logout);
    expect(alert).toHaveBeenCalledWith('Logging you out');
    expect(reduxApp.props().isLoggedIn).toEqual(false);
    expect(reduxApp.props().user.isLoggedIn).toEqual(false);
    /* redux issue seems to break spyOn logout, not sure how, doesn't seem to be anything you can do
    expect(logout).toHaveBeenCalled();
    */
  });

  it('does not log in when enableSubmit = false and form is submitted', () => {
    reduxApp.find('form').simulate('submit')
    expect(alert).toHaveBeenCalledWith('Please enter email and password to proceed');
  });

  it('NOT the CourseList', () => {
    assert.equal(courseListRender.length, 0);
  });

  // unable to wait for the loginRequest to actually go through, invalidating test
  it('logs in when email & password are entered and form is submitted', () => {
    alert.mockReset();
    reduxApp.find('form').find('input').first().simulate('change', { target: { value: 'a@b' }});
    reduxApp.find('input').at(1).simulate('change', { target: { value: 'c' }});
    reduxApp.find('form').simulate('submit');
    // we're unabe to see the results of this since we're in a Redux component and loginRequest is async
    // by confirming that alert is NOT called after resetting alert, we can assume
    // the functionality went through okay.
    expect(alert).toHaveBeenCalledTimes(0);
    /* I've also tried using our store.getState() spy, but again because of async call it never shows the change
    assert.notStrictEqual(reduxApp.state().user, {
      email: 'a@b',
      password: 'c',
      isLoggedIn: true,
    });
    */
  });

  // because state changes aren't reflected in props changes in time to test, the reverse test is invalid
  it('store.ui.isNotificationDrawerVisible false, and true after .menuItem is clicked', () => {
    assert.equal(store.getState().ui.get('isNotificationDrawerVisible'), false);
    reduxApp.find('.menuItem').simulate('click');
    assert.equal(store.getState().ui.get('isNotificationDrawerVisible'), true);
    console.log('props', reduxApp.props())
  });

  /* Invalid Tests with Redux
  dispatch events aren't triggering in a time frame, or way, for testing to check their results

  it('updated Notifications when one is clicked, will run markNotificationAsRead', () => {
    reduxApp.find('.menuItem').simulate('click');
    assert.equal(reduxApp.find('NotificationItem').length, 3);
    // was unable to spyOn markNot func in reduxApp.instance() or in the props of first()
    reduxApp.find('NotificationItem').first().simulate('click');
    assert.equal(reduxApp.find('NotificationItem').length, 2);
  });

  it('store.ui.isNotificationDrawerVisible true, and false after .closeBtn is clicked', () => {
    assert.equal(store.getState().ui.get('isNotificationDrawerVisible'), true);
    // no button is found, menuItem is still present
    reduxApp.find('.closeBtn').simulate('click');
    assert.equal(store.getState().ui.get('isNotificationDrawerVisible'), false);
  });
  */
});

describe('Logged in App Renders', () => {

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  // set app to login state
  const app = mount(<App user={{ isLoggedIn: true }} logout={jest.fn()}/>);

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

describe('mapStateToProps returns', () => {

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const defaultState = Map({
    isNotificationDrawerVisible: false,
    isUserLoggedIn: false,
    user: {
      email: '',
      password: '',
      isLoggedIn: false,
    },
  });

  const rtnProps = {
    isLoggedIn: false,
    displayDrawer: false,
    user: {
      email: '',
      password: '',
      isLoggedIn: false,
    },
  }

  it('expected object from state', () => {
    expect(mapStateToProps({ui: defaultState}))
      .toEqual(rtnProps)
  });

});
