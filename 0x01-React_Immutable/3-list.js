import Immutable from 'immutable';

export function getListObject(arr) {
  return Immutable.List(arr);
}

export function addElementToList(list, element) {
  return list.push(element);
}
