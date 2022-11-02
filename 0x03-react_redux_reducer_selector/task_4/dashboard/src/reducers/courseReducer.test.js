import courseReducer from './courseReducer';
import * as courseActions from '../actions/courseActionCreators';
const { List } = require('immutable');

describe('courseReducer testing', () => {
  const fcsAction = courseActions.fetchCourses([
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

  const fcsReturn = List([
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

  let scReturn = [];

  it('returns the initial state when no action is given', () => {
    expect(courseReducer({})).toEqual(List([]));
  });

  it('the FETCH_COURSE_SUCCESS action returns the correct data', () => {
    expect(courseReducer(fcsAction)).toEqual(fcsReturn);
  });

  it('the SELECT_COURSE action returns the correct data', () => {
    scReturn = courseReducer(courseActions.selectCourse(2), fcsReturn);
    expect(scReturn.toJS()).toEqual(
      expect.arrayContaining([{
        id: 2,
        name: 'Webpack',
        credit: 20,
        isSelected: true,
      }])
    );
  });

  it('the UNSELECT_COURSE action returns the correct data', () => {
    expect(courseReducer(courseActions.unSelectCourse(2), scReturn).toJS()).toEqual(
      expect.arrayContaining([{
        id: 2,
        name: 'Webpack',
        credit: 20,
        isSelected: false,
      }])
    );
  });
});
