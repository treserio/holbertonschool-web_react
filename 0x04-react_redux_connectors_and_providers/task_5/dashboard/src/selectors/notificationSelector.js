export default {
  filterTypeSelected: (state) => state.notes.get('filter'),
  getNotifications: (state) => state.notes.get('notifications'),
  getUnreadNotifications: (state) => state.notes.get('notifications').filter((note) => !note.isRead),
}
