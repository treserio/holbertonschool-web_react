import uiActions from '../actions/uiActionTypes';
const { Map } = require('immutable');

const defaultState = Map({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: {},
});

export default function uiReducer(state = defaultState, action) {
  switch (action.type) {
    case uiActions.DISPLAY_NOTIFICATION_DRAWER:
      return Map({...state,
        isNotificationDrawerVisible: true,
      });
    case uiActions.HIDE_NOTIFICATION_DRAWER:
      return Map({...state,
        isNotificationDrawerVisible: false,
      });
    case uiActions.LOGIN_SUCCESS:
      return Map({...state,
        isUserLoggedIn: true,
      });
    case uiActions.LOGIN_FAILURE:
      return Map({...state,
        isUserLoggedIn: false,
      });
    case uiActions.LOGOUT:
      return Map({...state,
        isUserLoggedIn: false,
      });
    }
  return state;
};
