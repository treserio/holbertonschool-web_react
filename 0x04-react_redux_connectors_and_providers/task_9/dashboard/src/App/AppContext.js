import { createContext } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';


const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    courses: rootReducer.courses(undefined, {}),
    notes: rootReducer.notes(undefined, {}),
    ui: rootReducer.ui(undefined, {}),
  },
  // courses being a list seems to cause serializer issues, may convert to Map
  middleware: (getDefault) => getDefault({
    serializableCheck: false,
  })
});

// Create context object with default values
const AppContext = createContext({
  store,
});

export default AppContext;
