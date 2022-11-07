import * as uiActions from './uiActionCreators';
import fetchMock from 'jest-fetch-mock';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

fetchMock.enableMocks();

describe('uiActionCreators testing', () => {
  const initStore = mockStore([thunk]);
  let store = initStore();

  it('confirm login returns correct object', () => {
    expect(uiActions.login('apple', 'bottom')).toEqual({
      type: 'LOGIN',
      user: {
        email: 'apple',
        password: 'bottom'
      }
    });
  });

  it('confirm logout returns correct object', () => {
    expect(uiActions.logout()).toEqual({
      type: 'LOGOUT'
    });
  });

  it('confirm displayNotificationDrawer returns correct object', () => {
    expect(uiActions.displayNotificationDrawer('apple', 'bottom')).toEqual({
      type: 'DISPLAY_NOTIFICATION_DRAWER',
    });
  });

  it('confirm hideNotificationDrawer returns correct object', () => {
    expect(uiActions.hideNotificationDrawer('apple', 'bottom')).toEqual({
      type: 'HIDE_NOTIFICATION_DRAWER',
    });
  });

  it('confirm loginSuccess returns correct object', () => {
    expect(uiActions.loginSuccess('apple', 'bottom')).toEqual({
      type: 'LOGIN_SUCCESS',
    });
  });

  it('confirm loginFailure returns correct object', () => {
    expect(uiActions.loginFailure('apple', 'bottom')).toEqual({
      type: 'LOGIN_FAILURE',
    });
  });

  it('confirm loginRequest returns correct object', async () => {
    fetch.mockResponseOnce('stuff and things');
    store.dispatch(uiActions.loginRequest({a: 'some', b: 'text'}, store.dispatch))
      .then((res) => {
        // console.log(res.payload());
        expect(res.payload()).toEqual({ type: 'LOGIN_SUCCESS' });
      })
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('confirm loginRequest returns correct object when fetch fails', async () => {
    fetch.mockResponseOnce('Not Found', { status: 404 })
    store.dispatch(uiActions.loginRequest({a: 'some', b: 'text'}, store.dispatch))
      .then((res) => {
        // console.log(res.payload());
        expect(res.payload()).toEqual({ type: 'LOGIN_FAILURE' })
      })
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
