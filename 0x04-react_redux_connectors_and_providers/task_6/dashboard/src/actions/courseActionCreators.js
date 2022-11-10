import courseTypes from './courseActionTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export function selectCourse({ index }) {
  return {
    type: courseTypes.SELECT_COURSE,
    index,
  };
}

export function unSelectCourse({ index }) {
  return {
    type: courseTypes.UNSELECT_COURSE,
    index,
  };
}

export function setCourses(data) {
  return {
    type: courseTypes.SET_COURSES,
    data,
  }
}

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (args, store) => {
    // store.dispatch(setLoadingState(true));
    // fetch and .json return promises
    fetch('./courses.json')
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            // console.log('data', data);
            store.dispatch(setCourses(data));
          });
        } else console.log('no notes');
      });
    // store.dispatch(setLoadingState(false));
  }
)
