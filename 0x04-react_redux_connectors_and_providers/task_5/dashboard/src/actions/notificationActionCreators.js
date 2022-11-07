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
  'notes/fetchNotes',
  async (args, store) => {
    console.log('args', args)
    store.dispatch(setLoadingState(true));
    let res = await fetch('./notifications.json');
    console.log('fetchRes', res)
    console.log('json', res.body.toString())
    if (res.status === 200) {
      store.dispatch(setNotifications(['a',]));
    } else {
      console.log('no notes');
    }
    store.dispatch(setLoadingState(false))
  }
)
