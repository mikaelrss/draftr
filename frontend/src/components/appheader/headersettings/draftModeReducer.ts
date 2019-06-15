import { DraftModeActions, TOGGLE_ACTIVATION_STATUS } from './draftModeActions';

export interface IDraftState {
  activated: boolean;
}

const initialState: IDraftState = {
  activated: false,
};

const draftModeReducer = (
  state = initialState,
  action: DraftModeActions,
): IDraftState => {
  switch (action.type) {
    case TOGGLE_ACTIVATION_STATUS:
      return {
        ...state,
        activated: !state.activated,
      };
    default:
      return state;
  }
};

export default draftModeReducer;
