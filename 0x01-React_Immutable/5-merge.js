import Immutable from 'immutable';

export function concatElements(page1, page2) {
  return Immutable.List(page1.concat(page2))
};

export function mergeElements(page1, page2) {
  return Immutable.Map(page1).merge(page2)
};
