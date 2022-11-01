import uiReducer from './uiReducer';
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

  it('returns the initial state when the action SELECT_COURSE is passed', () => {
    expect(uiReducer({ type: 'SELECT_COURSE' })).toEqual(initStateFalse);
    expect(uiReducer({ type: 'SELECT_COURSE' }, initStateTrue)).toEqual(initStateTrue);
  })

  it('returns new state when the action DISPLAY_NOTIFICATION_DRAWER is passed', () => {
    expect(uiReducer({ type: 'DISPLAY_NOTIFICATION_DRAWER' })).toEqual({
      ...initStateFalse,
      isNotificationDrawerVisible: true,
    });
  })

  it('returns new state when the action LOGIN_SUCCESS is passed', () => {
    expect(uiReducer({ type: 'LOGIN_SUCCESS' })).toEqual({
      ...initStateFalse,
      isUserLoggedIn: true,
    });
  });

  it('returns new state when the action HIDE_NOTIFICATION_DRAWER is passed', () => {
    expect(uiReducer({ type: 'HIDE_NOTIFICATION_DRAWER' }, initStateTrue)).toEqual({
      ...initStateTrue,
      isNotificationDrawerVisible: false,
    });
  })

  it('returns new state when the action LOGIN_FAILURE is passed', () => {
    expect(uiReducer({ type: 'LOGIN_FAILURE' }, initStateTrue)).toEqual({
      ...initStateTrue,
      isUserLoggedIn: false,
    });
  });

  it('returns new state when the action LOGOUT is passed', () => {
    expect(uiReducer({ type: 'LOGOUT' }, initStateTrue)).toEqual({
      ...initStateTrue,
      isUserLoggedIn: false,
    });
  });
});
