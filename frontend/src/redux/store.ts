import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import team, { ITeamState } from '../components/team/teamReducer';
import draftModeReducer, {
  IDraftState,
} from '../components/appheader/headersettings/draftModeReducer';

export interface IState {
  team: ITeamState;
  draftMode: IDraftState;
}

const rootReducer = combineReducers<IState>({
  team,
  draftMode: draftModeReducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
  },
  rootReducer,
);

export default () => {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk)),
  );
  const persistor = persistStore(store);
  return {
    store,
    persistor,
  };
};
