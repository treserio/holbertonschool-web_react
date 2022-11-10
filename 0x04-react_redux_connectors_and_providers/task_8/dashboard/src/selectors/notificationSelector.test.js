import notesSelectors from './notificationSelector';
import { Map } from 'immutable';

describe('notificationSelector testing', () => {
  let initState = {
    notes: Map({
      filter: 'DEFAULT',
      notifications: [
        { id: 1, isRead: true, type: 'default', value: 'New course available' },
        { id: 2, isRead: false, type: 'default', value: 'New resume available' },
        { id: 3, isRead: false, type: 'urgent', value: 'New data available' },
      ],
    })
  };

  it('filterTypeSelected returns filter type', () => {
    expect(notesSelectors.filterTypeSelected(initState))
      .toEqual('DEFAULT');
  });

  it('confirm getNotifications returns all notifications', () => {
    expect(notesSelectors.getNotifications(initState))
      .toEqual(initState.notes.get('notifications'));
  });

  it('confirm getUnreadNotifications returns isRead=false notifications', () => {
    expect(notesSelectors.getUnreadNotifications(initState))
      .toEqual([
        initState.notes.get('notifications')[1],
        initState.notes.get('notifications')[2]
      ]);
  });

  it('confirm getUnreadNotifications returns isRead=false notifications based on type', () => {
    expect(notesSelectors.getUnreadNotificationsByType(initState))
      .toEqual([
        initState.notes.get('notifications')[1],
        initState.notes.get('notifications')[2]
      ]);
    const filterUrgent = {
      notes: initState.notes.set('filter', 'URGENT'),
    }
    expect(notesSelectors.getUnreadNotificationsByType(filterUrgent))
      .toEqual([initState.notes.get('notifications')[2]]);
  });
});
