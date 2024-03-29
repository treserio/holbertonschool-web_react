import noteTypes, { NotificationTypeFilters } from './notificationActionTypes';

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

export function fetchNotifications(data) {
  return {
    type: noteTypes.FETCH_NOTIFICATIONS_SUCCESS,
    data,
  }
}
