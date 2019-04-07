import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import team, { ITeamState } from './team';

export interface IState {
  team: ITeamState;
}

const rootReducer = combineReducers<IState>({
  team,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    composeWithDevTools(),
  ),
);

export default store;
