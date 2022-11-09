import notesSelectors from './notificationSelector';
import { Map } from 'immutable';

describe('notificationSelector testing', () => {
  const initState = {
    notes: Map({
      filter: 'URGENT',
      notifications: [
        { id: 1, isRead: true, type: 'default', value: 'New course available' },
        { id: 2, isRead: true, type: 'urgent', value: 'New resume available' },
        { id: 3, isRead: false, type: 'urgent', value: 'New data available' },
      ],
    })
  };

  it('filterTypeSelected returns filter type', () => {
    expect(notesSelectors.filterTypeSelected(initState))
      .toEqual('URGENT');
  });

  it('verifies getNotifications returns all notifications', () => {
    expect(notesSelectors.getNotifications(initState))
      .toEqual(initState.notes.get('notifications'));
  });

  it('verifies getUnreadNotifications returns notifications where isRead is false', () => {
    expect(notesSelectors.getUnreadNotifications(initState))
      .toEqual([initState.notes.get('notifications')[2]]);
  });
});
