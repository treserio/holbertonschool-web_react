import { markAsRead, setNotificationFilter } from './notificationActionCreators';

describe('notificationActionCreators testing', () => {
  it('confirm markAsRead returns correct object', () => {
    expect(markAsRead(1)).toEqual({
      type: 'MARK_AS_READ',
      index: 1,
    });
  });

  it('confirm setNotificationFilter returns correct object', () => {
    expect(setNotificationFilter('default')).toEqual({
      type: 'SET_TYPE_FILTER',
      filter: 'DEFAULT',
    });
  });
});
