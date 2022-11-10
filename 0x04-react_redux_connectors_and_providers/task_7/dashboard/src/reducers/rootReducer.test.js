import rootReducer from './rootReducer';
import uiReducer from "./uiReducer";
import courseReducer from "./courseReducer";
import notesReducer from "./notificationReducer";

describe('rootReducer testing', () => {
  it('returns the correct object', () => {
    expect(rootReducer)
      .toEqual({
        courses: courseReducer,
        notes: notesReducer,
        ui: uiReducer,
      })
  });

});
