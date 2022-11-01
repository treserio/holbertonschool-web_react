import courseActions from '../actions/courseActionTypes';
const { List } = require('immutable');

const defaultState = List([]);

export default function uiReducer(action, state = defaultState) {
  switch (action.type) {
    case courseActions.FETCH_COURSE_SUCCESS:
      return List(action.data.map((course) => ({
        ...course,
        isSelected: false,
      })));
    case courseActions.SELECT_COURSE:
      return List(state.map((course) => course.id === action.index ? {
          ...course,
          isSelected: true,
        } : course ));
    case courseActions.UNSELECT_COURSE:
      return List(state.map((course) => course.id === action.index ? {
        ...course,
        isSelected: false,
      } : course ));
    }
  return state;
};
