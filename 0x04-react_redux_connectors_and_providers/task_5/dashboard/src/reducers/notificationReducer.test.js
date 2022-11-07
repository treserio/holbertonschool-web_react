import notesReducer from './notificationReducer';
import * as noteActions from '../actions/notificationActionCreators';
const { Map } = require('immutable');
import fetchMock from 'jest-fetch-mock';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

fetchMock.enableMocks();

describe('notificationReducer testing', () => {
  const initStore = mockStore([thunk]);
  let store = initStore();

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
    )
      .toEqual('URGENT');
  });

  it('confirm fetchNotifications returns correct object', async () => {
    // fetch.mockResponseOnce('{"a": "b", "c": "d"}');
    // not dispatching?
    store.dispatch(noteActions.fetchNotifications())
      .then((res) => {
        console.log('wtf', res);
        expect(res.payload()).toEqual({ type: 'LOGIN_SUCCESS' });
      })
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
