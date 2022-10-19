import Immutable from 'immutable';

export default function accessImmutableObject(object, array) {
  return Immutable.fromJS(object).getIn(array);
}
