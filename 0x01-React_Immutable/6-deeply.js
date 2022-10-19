import Immutable from 'immutable';

export default function mergeDeeplyElements(page1, page2) {
  return Immutable.Map(page1).mergeDeep(page2);
}
