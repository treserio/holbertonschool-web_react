import Immutable from 'immutable';

function getListObject(arr) {
  return Immutable.List(arr);
}

function addElementToList(list, element) {
  return list.push(element);
}

export default { getListObject, addElementToList };
