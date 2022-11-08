import notesReducer from './notificationReducer';
import * as noteActions from '../actions/notificationActionCreators';
const { Map } = require('immutable');

describe('notificationReducer testing', () => {
  const fnsAction = noteActions.setNotifications([
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
    },
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
      },
    ]
  });

  const defaultState = Map({
    filter: 'DEFAULT',
    notifications: [],
  });

  it('returns the initial state when no action is given', () => {
    expect(notesReducer(undefined, {}))
      .toEqual(defaultState);
  });

  it('the FETCH_NOTIFICATIONS_SUCCESS action returns the correct data', () => {
    expect(notesReducer(undefined, fnsAction))
      .toEqual(fnsReturn);
  });

  it('the MARK_AS_READ action returns the correct data', () => {
    const marReturn = notesReducer(fnsReturn, noteActions.markAsRead(2));
    expect(marReturn.get('notifications'))
      .toEqual(
        expect.arrayContaining([{
          id: 2,
          type: "urgent",
          value: "New resume available",
          isRead: true,
        }])
      );
  });

  it('the SET_TYPE_FILTER action returns the correct data', () => {
    expect(
      notesReducer(fnsReturn, noteActions.setNotificationFilter('urgent'))
        .get('filter')
    ).toEqual('URGENT');
  });
});
