import courseReducer from './courseReducer';
import * as courseActions from '../actions/courseActionCreators';
const { List } = require('immutable');

describe('courseReducer testing', () => {
  const setAction = courseActions.setCourses([
    {
      id: 1,
      name: 'ES6',
      credit: 60
    },
    {
      id: 2,
      name: 'Webpack',
      credit: 20
    },
    {
      id: 3,
      name: 'React',
      credit: 40
    }
  ]);

  const setReturn = List([
    {
      id: 1,
      name: 'ES6',
      credit: 60,
      isSelected: false,
    },
    {
      id: 2,
      name: 'Webpack',
      credit: 20,
      isSelected: false,
    },
    {
      id: 3,
      name: 'React',
      credit: 40,
      isSelected: false,
    }
  ]);

  let selectReturn = [];

  it('returns the initial state when no action is given', () => {
    expect(courseReducer(undefined, {}))
      .toEqual(List([]));
  });

  it('the FETCH_COURSE_SUCCESS action returns the correct data', () => {
    expect(courseReducer(undefined, setAction))
      .toEqual(setReturn);
  });

  it('the SELECT_COURSE action returns the correct data', () => {
    selectReturn = courseReducer(setReturn, courseActions.selectCourse({ index: 2 }));
    expect(selectReturn.toJS())
      .toEqual(
        expect.arrayContaining([{
          id: 2,
          name: 'Webpack',
          credit: 20,
          isSelected: true,
        }])
      );
  });

  it('the UNSELECT_COURSE action returns the correct data', () => {
    expect(courseReducer(selectReturn, courseActions.unSelectCourse({ index: 2 })).toJS())
      .toEqual(
        expect.arrayContaining([{
          id: 2,
          name: 'Webpack',
          credit: 20,
          isSelected: false,
        }])
      );
  });
});
