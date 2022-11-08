import noteTypes, { NotificationTypeFilters } from './notificationActionTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export function markAsRead(index) {
  return {
    type: noteTypes.MARK_AS_READ,
    index,
  };
}

export function setNotificationFilter(filter) {
  return {
    type: noteTypes.SET_TYPE_FILTER,
    filter: NotificationTypeFilters[filter.toUpperCase()],
  };
}

// export function fetchNotifications(data) {
//   return {
//     type: noteTypes.FETCH_NOTIFICATIONS_SUCCESS,
//     data,
//   }
// }

export function setLoadingState(loading) {
  return {
    type: noteTypes.SET_LOADING_STATE,
    loading,
  }
}

export function setNotifications(data) {
  return {
    type: noteTypes.FETCH_NOTIFICATIONS_SUCCESS,
    data,
  }
}

export const fetchNotifications = createAsyncThunk(
  'note/fetchNotes',
  async (args, store) => {
    store.dispatch(setLoadingState(true));
    // fetch and .json return promises
    fetch('./notifications.json')
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            // console.log('data', data);
            store.dispatch(setNotifications(data));
          });
        } else console.log('no notes');
      });
    store.dispatch(setLoadingState(false));
  }
)
