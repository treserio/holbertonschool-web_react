import noteActions from '../actions/notificationActionTypes';
const { Map } = require('immutable');

const defaultState = Map({
  filter: 'DEFAULT',
  notifications: [],
});

export default function notificationReducer(action, state = defaultState) {
  switch (action.type) {
    case noteActions.FETCH_NOTIFICATIONS_SUCCESS:
      return Map({
        filter: 'DEFAULT',
        notifications: action.data.map((note) => ({
          ...note,
          isRead: false,
        })),
      });
    case noteActions.MARK_AS_READ:
      return Map({
        filter: 'DEFAULT',
        notifications: state.toJS().notifications.map((note) => note.id === action.index ? {
          ...note,
          isRead: true,
        } : note ),
      });
    case noteActions.SET_TYPE_FILTER:
      return Map({
        ...state.toJS(),
        filter: action.filter,
      });
  }
  return state;
};
