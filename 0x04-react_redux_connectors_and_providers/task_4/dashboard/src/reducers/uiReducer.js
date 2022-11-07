import uiActions from '../actions/uiActionTypes';
const { Map } = require('immutable');

const defaultState = Map({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: {
    email: '',
    password: '',
    isLoggedIn: false,
  },
});

export default function uiReducer(state = defaultState, action) {
  // console.log(state)
  switch (action.type) {
    case uiActions.DISPLAY_NOTIFICATION_DRAWER:
      return state.set('isNotificationDrawerVisible', true);
    case uiActions.HIDE_NOTIFICATION_DRAWER:
      return state.set('isNotificationDrawerVisible', false);
    case uiActions.LOGIN:
      return state
          .setIn(['user', 'email'], action.user.email)
          .setIn(['user', 'password'], action.user.password);
    case uiActions.LOGIN_FAILURE:
      return state
          .setIn(['user', 'email'], '')
          .setIn(['user', 'password'], '')
          .setIn(['user', 'isLoggedIn'], false)
          .set('isUserLoggedIn', false);
    case uiActions.LOGIN_SUCCESS:
      return state
          .setIn(['user', 'isLoggedIn'], true)
          .set('isUserLoggedIn', true);
    case uiActions.LOGOUT:
      return state
          .setIn(['user', 'email'], '')
          .setIn(['user', 'password'], '')
          .setIn(['user', 'isLoggedIn'], false)
          .set('isUserLoggedIn', false);
    }
  return state;
};
