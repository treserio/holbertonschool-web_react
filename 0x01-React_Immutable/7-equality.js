import Immutable from 'immutable';

export default function areMapsEqual(map1, map2) {
  return Immutable.is(map1, map2);
}
