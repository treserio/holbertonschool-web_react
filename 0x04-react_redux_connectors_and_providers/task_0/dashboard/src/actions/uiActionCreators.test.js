import {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginSuccess,
  loginFailure,
  loginRequest,
 } from './uiActionCreators';
import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks();

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

  it('confirm loginSuccess returns correct object', () => {
    expect(loginSuccess('apple', 'bottom')).toEqual({
      type: 'LOGIN_SUCCESS',
    });
  });

  it('confirm loginFailure returns correct object', () => {
    expect(loginFailure('apple', 'bottom')).toEqual({
      type: 'LOGIN_FAILURE',
    });
  });

  it('confirm loginRequest returns correct object', async () => {
    fetch.mockResponseOnce('stuff and things');
    const res = await loginRequest('some', 'test')
    expect(res).toEqual({ type: 'LOGIN_SUCCESS' });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('confirm loginRequest returns correct object when fetch fails', async () => {
    const res = await loginRequest('some', 'test')
    expect(res).toEqual({ type: 'LOGIN_FAILURE' });
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
