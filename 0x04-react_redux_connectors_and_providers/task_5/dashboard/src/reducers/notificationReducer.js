import noteActions from '../actions/notificationActionTypes';
import { notificationNormalizer } from '../schema/notificationsSchema';
const { Map } = require('immutable');

const defaultState = Map({
  filter: 'DEFAULT',
  notifications: [],
});

export default function notificationReducer(state = defaultState, action) {
  switch (action.type) {
    case noteActions.FETCH_NOTIFICATIONS_SUCCESS:
      return state.mergeDeep({
        notifications: Object.values(notificationNormalizer(action.data).entities.notifications)
          .map((note) => ({
            ...note,
            isRead: false,
          }))
      })
    case noteActions.MARK_AS_READ:
      return state.setIn(['notifications', action.index - 1, 'isRead'], true);
    case noteActions.SET_TYPE_FILTER:
      return state.set('filter', action.filter);
  }
  return state;
};
