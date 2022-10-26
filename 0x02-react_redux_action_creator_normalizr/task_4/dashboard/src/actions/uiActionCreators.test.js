import {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
 } from './uiActionCreators';

describe('uiActionCreators testing', () => {
  it('confirm login returns correct object', () => {
    expect(login('apple', 'bottom')).toEqual({
      type: 'LOGIN',
      user: {
        email: 'apple',
        password: 'bottom'
      }
    });
  });

  it('confirm logout returns correct object', () => {
    expect(logout()).toEqual({
      type: 'LOGOUT'
    });
  });

  it('confirm displayNotificationDrawer returns correct object', () => {
    expect(displayNotificationDrawer('apple', 'bottom')).toEqual({
      type: 'DISPLAY_NOTIFICATION_DRAWER',
    });
  });

  it('confirm hideNotificationDrawer returns correct object', () => {
    expect(hideNotificationDrawer('apple', 'bottom')).toEqual({
      type: 'HIDE_NOTIFICATION_DRAWER',
    });
  });
});
