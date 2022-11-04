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
  switch (action.type) {
    case uiActions.DISPLAY_NOTIFICATION_DRAWER:
      return {...state,
        ui: state.ui.set('isNotificationDrawerVisible', true),
      };
    case uiActions.HIDE_NOTIFICATION_DRAWER:
      return {...state,
        ui: state.ui.set('isNotificationDrawerVisible', false),
      };
    case uiActions.LOGIN_SUCCESS:
      return {...state,
        ui: state.ui.setIn(['user', 'isLoggedIn'], true).set('isUserLoggedIn', true),
      }
      // return {...state,
      //   isUserLoggedIn: true,
      // };
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
