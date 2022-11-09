import noteActions from '../actions/notificationActionTypes';
import { notificationNormalizer } from '../schema/notificationsSchema';
const { Map } = require('immutable');

const defaultState = Map({
  filter: 'DEFAULT',
  loading: false,
  notifications: [],
});

export default function notificationReducer(state = defaultState, action) {
  switch (action.type) {
    case noteActions.FETCH_NOTIFICATIONS_SUCCESS:
      const normalized = notificationNormalizer(action.data);
      return state.mergeDeep({
        notifications: Object.values(normalized.entities.notifications)
          .map((note) => ({
            id: note.id,
            value: normalized.entities.messages[note.context].value,
            type: normalized.entities.messages[note.context].type,
            isRead: normalized.entities.messages[note.context].isRead,
          }))
      });
    case noteActions.MARK_AS_READ:
      const index = state.get('notifications').findIndex((note) => note.id === action.index);
      // console.log('idx', index);
      return state.setIn(['notifications', index, 'isRead'], true);
    case noteActions.SET_TYPE_FILTER:
      return state.set('filter', action.filter);
    case noteActions.SET_LOADING_STATE:
      return state.set('loading', action.loading);
    case noteActions.SET_LOADING_STATE:
      return state.set('loading', action.loading);
  }
  return state;
};
