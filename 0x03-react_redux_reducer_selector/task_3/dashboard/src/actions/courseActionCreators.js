import courseTypes from './courseActionTypes';

export function selectCourse(index) {
  return {
    type: courseTypes.SELECT_COURSE,
    index,
  };
}

export function unSelectCourse(index) {
  return {
    type: courseTypes.UNSELECT_COURSE,
    index,
  };
}

export function fetchCourses(data) {
  return {
    type: courseTypes.FETCH_COURSE_SUCCESS,
    data,
  }
}
