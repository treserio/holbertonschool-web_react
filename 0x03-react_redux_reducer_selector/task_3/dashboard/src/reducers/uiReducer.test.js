import uiReducer from './uiReducer';
import * as uiActions from '../actions/uiActionCreators'
const { Map } = require('immutable');

const initStateFalse = Map({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: {},
});

const initStateTrue = Map({
  isNotificationDrawerVisible: true,
  isUserLoggedIn: true,
  user: {},
});

describe('uiReducer testing', () => {
  it('returns the initial state when no action is passed', () => {
    expect(uiReducer({})).toEqual(initStateFalse);
  });

  it('returns the initial state when the SELECT_COURSE action is passed', () => {
    expect(uiReducer({ type: 'SELECT_COURSE' })).toEqual(initStateFalse);
    expect(uiReducer({ type: 'SELECT_COURSE' }, initStateTrue)).toEqual(initStateTrue);
  })

  it('returns new state when the DISPLAY_NOTIFICATION_DRAWER action is passed', () => {
    expect(uiReducer(uiActions.displayNotificationDrawer())).toEqual(Map({
      ...initStateFalse,
      isNotificationDrawerVisible: true,
    }));
  })

  it('returns new state when the LOGIN_SUCCESS action is passed', () => {
    expect(uiReducer(uiActions.loginSuccess())).toEqual(Map({
      ...initStateFalse,
      isUserLoggedIn: true,
    }));
  });

  it('returns new state when the HIDE_NOTIFICATION_DRAWER action is passed', () => {
    expect(uiReducer(uiActions.hideNotificationDrawer(), initStateTrue)).toEqual(Map({
      ...initStateTrue,
      isNotificationDrawerVisible: false,
    }));
  })

  it('returns new state when the LOGIN_FAILURE action is passed', () => {
    expect(uiReducer(uiActions.loginFailure(), initStateTrue)).toEqual(Map({
      ...initStateTrue,
      isUserLoggedIn: false,
    }));
  });

  it('returns new state when the LOGOUT action is passed', () => {
    expect(uiReducer(uiActions.logout(), initStateTrue)).toEqual(Map({
      ...initStateTrue,
      isUserLoggedIn: false,
    }));
  });
});
