export default {
  filterTypeSelected: (state) => state.get('filter'),
  getNotifications: (state) => state.get('notifications'),
  getUnreadNotifications: (state) => state.get('notifications').filter((note) => !note.isRead),
}
