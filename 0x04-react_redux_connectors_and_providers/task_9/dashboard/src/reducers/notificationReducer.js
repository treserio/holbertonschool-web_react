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
      // filter out duplicate notes before mapping the id value correctly from guid
      const notifications = Object.values(notificationNormalizer(action.data).entities.messages)
        .filter((note) => !state.get('notifications')
          .find((oldNotes) => oldNotes.id == note.guid)
        )
        .map((note) => ({ ...note, id: note.guid }));
      // console.log('results', notifications)
      return state.mergeDeep({ notifications });
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
