import uiReducer from './uiReducer';
import * as uiActions from '../actions/uiActionCreators'
const { Map } = require('immutable');

const initStateFalse = Map({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: {
    email: '',
    password: '',
    isLoggedIn: false,
  },
});

const initStateTrue = Map({
  isNotificationDrawerVisible: true,
  isUserLoggedIn: true,
  user: {
    email: '',
    password: '',
    isLoggedIn: false,
  }
});

describe('uiReducer testing', () => {
  it('returns the initial state when no action is passed', () => {
    expect(uiReducer(undefined, {}))
      .toEqual(initStateFalse);
  });

  it('returns the initial state when the SELECT_COURSE action is passed', () => {
    expect(uiReducer(undefined, { type: 'SELECT_COURSE' }))
      .toEqual(initStateFalse);
    expect(uiReducer(initStateTrue, { type: 'SELECT_COURSE' }))
      .toEqual(initStateTrue);
  })

  it('returns new state when the DISPLAY_NOTIFICATION_DRAWER action is passed', () => {
    expect(uiReducer({ui: initStateFalse}, uiActions.displayNotificationDrawer()))
      .toEqual({
        ui: initStateFalse.set('isNotificationDrawerVisible', true),
      });
  })

  it('returns new state when the LOGIN_SUCCESS action is passed', () => {
    expect(uiReducer({ui: initStateFalse}, uiActions.loginSuccess()))
      .toEqual({
        ui: initStateFalse.setIn(['user', 'isLoggedIn'], true).set('isUserLoggedIn', true)
      });
  });

  it('returns new state when the HIDE_NOTIFICATION_DRAWER action is passed', () => {
    expect(uiReducer({ui: initStateTrue}, uiActions.hideNotificationDrawer()))
      .toEqual({
        ui: initStateTrue.set('isNotificationDrawerVisible', false),
      });
  })

  it('returns new state when the LOGIN_FAILURE action is passed', () => {
    expect(uiReducer({ui: initStateTrue}, uiActions.loginFailure()))
      .toEqual({
        ui: initStateTrue.set('isUserLoggedIn', false)
          .setIn(['user', 'email'], '')
          .setIn(['user', 'password'], '')
          .setIn(['user', 'isLoggedIn'], false),
      });
  });

  it('returns new state when the LOGOUT action is passed', () => {
    expect(uiReducer({ui: initStateTrue}, uiActions.logout()))
      .toEqual({
        ui: initStateTrue.set('isUserLoggedIn', false)
          .setIn(['user', 'email'], '')
          .setIn(['user', 'password'], '')
          .setIn(['user', 'isLoggedIn'], false),
      });
  });
});
