import notes from '../../notifications.json';

export default function getAllNotificationsByUser(userId) {
  return notes
    .filter((note) => note.author.id == userId)
    .map((note) => note.context);
}
