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
    expect(uiReducer(undefined, uiActions.displayNotificationDrawer()))
      .toEqual(Map({
        ...initStateFalse,
        isNotificationDrawerVisible: true,
      }));
  })

  it('returns new state when the LOGIN_SUCCESS action is passed', () => {
    expect(uiReducer({ui: initStateFalse}, uiActions.loginSuccess()))
      .toEqual({
        ui: initStateFalse.setIn(['user', 'isLoggedIn'], true).set('isUserLoggedIn', true)
      });
  });

  it('returns new state when the HIDE_NOTIFICATION_DRAWER action is passed', () => {
    expect(uiReducer(initStateTrue, uiActions.hideNotificationDrawer()))
      .toEqual(Map({
        ...initStateTrue,
        isNotificationDrawerVisible: false,
      }));
  })

  it('returns new state when the LOGIN_FAILURE action is passed', () => {
    expect(uiReducer(initStateTrue, uiActions.loginFailure()))
      .toEqual(Map({
        ...initStateTrue,
        isUserLoggedIn: false,
      }));
  });

  it('returns new state when the LOGOUT action is passed', () => {
    expect(uiReducer(initStateTrue, uiActions.logout()))
      .toEqual(Map({
        ...initStateTrue,
        isUserLoggedIn: false,
      }));
  });
});
