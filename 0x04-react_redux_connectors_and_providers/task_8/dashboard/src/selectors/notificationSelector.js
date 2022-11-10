const getUnreadNotifications = (state) => state.notes.get('notifications').filter((note) => !note.isRead);

export default {
  filterTypeSelected: (state) => state.notes.get('filter'),
  getNotifications: (state) => state.notes.get('notifications'),
  getUnreadNotifications,
  getUnreadNotificationsByType: (state) => {
    return state.notes.get('filter') === 'DEFAULT' ?
      getUnreadNotifications(state)
    : state.notes.get('notifications').filter((note) =>
        note.type.toUpperCase() === 'URGENT' && !note.isRead
      )
  },
}
