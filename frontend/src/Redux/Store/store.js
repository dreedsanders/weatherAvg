import thunk from "redux-thunk";
import { combineReducers, applyMiddleware } from "redux";
import { createStore } from "redux";
import averagesReducer from "../Reducers/averages";
import currentsReducer from "../Reducers/current";
import daysReducer from "../Reducers/days";

const rootReducer = combineReducers({
  averageState: averagesReducer,
  currentState: currentsReducer,
  dayState: daysReducer
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk))
);



