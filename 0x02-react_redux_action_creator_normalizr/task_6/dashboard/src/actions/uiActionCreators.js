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
