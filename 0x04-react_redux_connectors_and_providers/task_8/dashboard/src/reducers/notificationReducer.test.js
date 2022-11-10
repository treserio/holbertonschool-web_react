import notesReducer from './notificationReducer';
import * as noteActions from '../actions/notificationActionCreators';
const { Map } = require('immutable');

describe('notificationReducer testing', () => {
  const setAction = noteActions.setNotifications([
    {
      "id": "5debd76480edafc8af244228",
      "author": {
        "id": "5debd764a7c57c7839d722e9",
        "name": {
          "first": "Poole",
          "last": "Sanders"
        },
        "email": "poole.sanders@holberton.nz",
        "picture": "http://placehold.it/32x32",
        "age": 25
      },
      "context": {
        "guid": "1",
        "isRead": true,
        "type": "urgent",
        "value": "Test 1",
      }
    },
    {
      "id": "5debd764507712e7a1307303",
      "author": {
        "id": "5debd7648ba8641ce0a34ea4",
        "name": {
          "first": "Norton",
          "last": "Grimes"
        },
        "email": "norton.grimes@holberton.nz",
        "picture": "http://placehold.it/32x32",
        "age": 37
      },
      "context": {
        "guid": "2",
        "isRead": false,
        "type": "urgent",
        "value": "Test 2"
      }
    },
    {
      "id": "5debd76444dd4dafea89d53b",
      "author": {
        "id": "5debd764a7c57c7839d722e9",
        "name": {
          "first": "Poole",
          "last": "Sanders"
        },
        "email": "poole.sanders@holberton.nz",
        "picture": "http://placehold.it/32x32",
        "age": 25
      },
      "context": {
        "guid": "3",
        "isRead": false,
        "type": "default",
        "value": "Test 3"
      }
    },
  ]);

  const setReturn = Map({
    filter: 'DEFAULT',
    loading: false,
    notifications: [
      {
        id: '1',
        type: 'urgent',
        value: 'Test 1',
        isRead: true,
      },
      {
        id: '2',
        type: 'urgent',
        value: 'Test 2',
        isRead: false,
      },
      {
        id: '3',
        type: "default",
        value: 'Test 3',
        isRead: false,
      },
    ]
  });

  const defaultState = Map({
    filter: 'DEFAULT',
    loading: false,
    notifications: [],
  });

  it('returns the initial state when no action is given', () => {
    expect(notesReducer(undefined, {}))
      .toEqual(defaultState);
  });

  it('the SET_NOTIFICATIONS action returns the correct data', () => {
    expect(notesReducer(undefined, setAction))
      .toEqual(setReturn);
  });

  it('the MARK_AS_READ action returns the correct data', () => {
    const marReturn = notesReducer(setReturn, noteActions.markAsRead({ index: '2' }));
    expect(marReturn.get('notifications'))
      .toEqual(
        expect.arrayContaining([{
          id: '2',
          type: "urgent",
          value: "Test 2",
          isRead: true,
        }])
      );
  });

  it('the SET_TYPE_FILTER action returns the correct data', () => {
    expect(
      notesReducer(setReturn, noteActions.setNotificationFilter({ filter: 'urgent' }))
        .get('filter')
    ).toEqual('URGENT');
  });
});
