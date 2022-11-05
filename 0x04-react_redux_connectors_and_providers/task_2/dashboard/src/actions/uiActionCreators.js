import uiTypes from './uiActionTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import uiActionTypes from './uiActionTypes';

export function login(email, password) {
  return {
    type: uiTypes.LOGIN,
    user: {email, password}
  };
}

export function logout() {
  return {
    type: uiTypes.LOGOUT,
  };
}

export function displayNotificationDrawer() {
  return {
    type: uiTypes.DISPLAY_NOTIFICATION_DRAWER
  }
}

export function hideNotificationDrawer() {
  return {
    type: uiTypes.HIDE_NOTIFICATION_DRAWER
  }
}

export function loginSuccess() {
  return {
    type: uiTypes.LOGIN_SUCCESS
  }
}

export function loginFailure() {
  return {
    type: uiTypes.LOGIN_FAILURE
  }
}

export const loginRequest = createAsyncThunk(
  uiTypes.LOGIN,
  async (args, store) => {
    console.log('args', args, 'store', store);
    console.log(login(args.email, args.password));
    // fetch path seems relative to the dist folder, relative to bundle.js
    let res = await fetch('./login-success.json');
    if (res.status === 200) {
      console.log('status', res.status);
      store.dispatch(login(args.email, args.password));
      return loginSuccess();
    } else {
      return loginFailure();
    }
  }
);
