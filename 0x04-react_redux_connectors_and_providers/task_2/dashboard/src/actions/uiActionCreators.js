import uiTypes from './uiActionTypes';

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

export async function loginRequest(email, password) {
  login(email, password);
  let res = await fetch('../../dist/login-success.json');
  console.log('jumanji', res.body.toString())
  return res.body.toString() ? loginSuccess() : loginFailure();
}
