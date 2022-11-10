import courseActions from '../actions/courseActionTypes';
import courseSchema from '../schema/coursesSchema';
const { List } = require('immutable');

const defaultState = List([]);

export default function courseReducer(state = defaultState, action) {
  switch (action.type) {
    // FETCH_COURSES_SUCCESS felt like an anti-pattern
    case courseActions.SET_COURSES:
      return List(
        Object.values(courseSchema(action.data).entities.courses)
          .map((course) => ({
              ...course,
              isSelected: false,
          }))
      );
    case courseActions.SELECT_COURSE:
      return state.setIn([action.index - 1, 'isSelected'], true);
    case courseActions.UNSELECT_COURSE:
      return state.setIn([action.index - 1, 'isSelected'], false);
    }
  return state;
};
