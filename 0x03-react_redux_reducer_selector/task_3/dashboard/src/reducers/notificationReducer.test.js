import notesReducer from './notificationReducer';
import { markAsRead, setNotificationFilter, fetchNotifications } from '../actions/notificationActionCreators';
const { Map } = require('immutable');

describe('courseReducer testing', () => {
  const fnsAction = fetchNotifications([
    {
      id: 1,
      type: "default",
      value: "New course available"
    },
    {
      id: 2,
      type: "urgent",
      value: "New resume available"
    },
    {
      id: 3,
      type: "urgent",
      value: "New data available"
    }
  ]);

  const fnsReturn = Map({
    filter: 'DEFAULT',
    notifications: [
      {
        id: 1,
        type: "default",
        value: "New course available",
        isRead: false,
      },
      {
        id: 2,
        type: "urgent",
        value: "New resume available",
        isRead: false,
      },
      {
        id: 3,
        type: "urgent",
        value: "New data available",
        isRead: false,
      }
    ]
  });

  const defaultState = Map({
    filter: 'DEFAULT',
    notifications: [],
  });

  it('returns the initial state when no action is given', () => {
    expect(notesReducer({})).toEqual(defaultState);
  });

  it('the FETCH_NOTIFICATIONS_SUCCESS action returns the correct data', () => {
    expect(notesReducer(fnsAction)).toEqual(fnsReturn);
  });

  it('the MARK_AS_READ action returns the correct data', () => {
    const marReturn = notesReducer(markAsRead(2), fnsReturn);
    expect(marReturn.toJS().notifications).toEqual(
      expect.arrayContaining([{
        id: 2,
        type: "urgent",
        value: "New resume available",
        isRead: true,
      }])
    );
  });

  it('the SET_TYPE_FILTER action returns the correct data', () => {
    expect(notesReducer(setNotificationFilter('urgent'), fnsReturn).toJS().filter).toEqual('URGENT');
  });
});
