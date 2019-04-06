import { configureStore } from 'redux-starter-kit';

const initialState = { test: 'val' };
const testReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = configureStore({
  reducer: testReducer,
});

export default store;
