import uiReducer from "./uiReducer";
import courseReducer from "./courseReducer";
import notesReducer from "./notificationReducer";

export default {
  courses: courseReducer,
  notes: notesReducer,
  ui: uiReducer,
}
