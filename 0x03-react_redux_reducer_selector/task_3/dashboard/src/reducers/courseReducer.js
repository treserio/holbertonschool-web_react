import courseActions from '../actions/courseActionTypes';

const defaultState = [];

export default function uiReducer(action, state = defaultState) {
  switch (action.type) {
    case courseActions.FETCH_COURSE_SUCCESS:
      return action.data.map((course) => ({
        ...course,
        isSelected: false,
      }));
    case courseActions.SELECT_COURSE:
      return state.map((course) => course.id === action.index ? {
          ...course,
          isSelected: true,
        } : course );
    case courseActions.UNSELECT_COURSE:
      return state.map((course) => course.id === action.index ? {
        ...course,
        isSelected: false,
      } : course );
    }
  return state;
};
