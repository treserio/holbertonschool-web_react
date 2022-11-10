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
    case noteActions.SET_NOTIFICATIONS:
      const normalized = notificationNormalizer(action.data);
      // console.log('norm', normalized);
      return state.mergeDeep({
        notifications: Object.values(normalized.entities.messages)
          .map((note) => ({
            id: note.guid,
            value: note.value,
            type: note.type,
            isRead: note.isRead,
          }))
      });
    case noteActions.MARK_AS_READ:
      const index = state.get('notifications').findIndex((note) => note.id === action.index);
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
