import { schema, normalize } from 'normalizr';

const course = new schema.Entity('courses', {
  name: new schema.Entity('names'),
  credit: new schema.Entity('credits'),
});

export default function courseNormalizer(data) {
  return normalize(data, [course]);
}
