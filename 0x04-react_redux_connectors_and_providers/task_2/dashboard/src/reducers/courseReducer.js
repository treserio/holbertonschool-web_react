import courseActions from '../actions/courseActionTypes';
import courseSchema from '../schema/coursesSchema';
const { List } = require('immutable');

const defaultState = List([]);

export default function uiReducer(state = defaultState, action) {
  switch (action.type) {
    case courseActions.FETCH_COURSE_SUCCESS:
      return List(
        Object.values(courseSchema(action.data).entities.courses)
          .map((course) => ({
              ...course,
              isSelected: false,
          }))
          .concat(...state)
      );
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
