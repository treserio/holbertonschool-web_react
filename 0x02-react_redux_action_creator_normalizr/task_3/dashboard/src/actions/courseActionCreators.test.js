import { selectCourse, unSelectCourse } from './courseActionCreators';

describe('courseActionCreators tests', () => {
  it('confirm selectCourse returns correct object', () => {
    expect(selectCourse(1)).toEqual({
      type: 'SELECT_COURSE',
      index: 1,
    });
  });

  it('confirm unSelectCourse returns correct object', () => {
    expect(unSelectCourse(1)).toEqual({
      type: 'UNSELECT_COURSE',
      index: 1,
    });
  });
});
