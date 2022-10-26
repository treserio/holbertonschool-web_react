import notes from '../../notifications.json';
import { normalize, schema } from 'normalizr';

export function getAllNotificationsByUser(userId) {
  return notes
    .filter((note) => note.author.id == userId)
    .map((note) => note.context);
}

// define users schema
const user = new schema.Entity('users');

// set idAttribute in options to guid in messages schema
const message = new schema.Entity('messages', {}, {
  idAttribute: 'guid',
});

// define notifications schema that ties the other schema into our json data
const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});

export const notesSchema = normalize(notes, [notification]);
