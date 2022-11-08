import * as noteActions from './notificationActionCreators';
import fetchMock from 'jest-fetch-mock';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

fetchMock.enableMocks();

describe('notificationActionCreators testing', () => {
  const initStore = mockStore([thunk]);
  let store = initStore();

  it('confirm markAsRead returns correct object', () => {
    expect(noteActions.markAsRead(1)).toEqual({
      type: 'MARK_AS_READ',
      index: 1,
    });
  });

  it('confirm setNotificationFilter returns correct object', () => {
    expect(noteActions.setNotificationFilter('default')).toEqual({
      type: 'SET_TYPE_FILTER',
      filter: 'DEFAULT',
    });
  });

  it('confirm fetchNotifications returns correct object', async () => {
    fetch.mockResponseOnce(JSON.stringify({ notes: 'testing' }));
    // test the .then on the dispatch call to see all the dispatch inside the async thunk action
    store.dispatch(noteActions.fetchNotifications())
      .then(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
        // console.log(store.getActions());
        // confirm that all of the actions we expected to be called have been
        expect(store.getActions())
          .toEqual(
            expect.arrayContaining([
              { type: 'SET_LOADING_STATE', loading: true },
              { type: 'SET_LOADING_STATE', loading: false },
              { type: 'FETCH_NOTIFICATIONS_SUCCESS', data: { notes: 'testing' } },
              // since the meta.requestId changes on call need partial match here
              expect.objectContaining({
                type: 'note/fetchNotes/fulfilled',
                payload: undefined,
              }),
            ])
          );
      });
  });
});
