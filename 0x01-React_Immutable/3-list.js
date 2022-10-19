import Immutable from 'immutable';

function getListObject(arr) {
  Immutable.List(arr);
}

function addElementToList(list, element) {
  list.push(element);
}

export default { getListObject, addElementToList };
