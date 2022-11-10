import courseSelector from "./courseSelector";
import { List } from 'immutable';

describe('courseSelector testing', () => {
  const initState = {
    courses: List([
      { id: '1', name: 'ES6', credit: 60 },
      { id: '2', name: 'Webpack', credit: 20 },
      { id: '3', name: 'React', credit: 40 },
    ])
  };
  const seq = courseSelector.getCourses(initState);

  it('getCourses returns the list of courses', () => {
    expect(seq.size).toEqual(3);
    expect(seq.equals(initState.courses)).toEqual(true);
  });
});
