import {
  ITeamActions,
  PLAYER_TAKEN,
  REMOVE_PLAYER,
  SELECT_PLAYER,
} from '../components/team/TeamActions';
import { rankings_personalRankings_players } from '../components/rankings/__generated__/rankings';

export interface ITeamState {
  selected: rankings_personalRankings_players[];
  taken: rankings_personalRankings_players[];
}

const initialState: ITeamState = {
  selected: [],
  taken: [],
};

const teamReducer = (
  state = initialState,
  action: ITeamActions,
): ITeamState => {
  switch (action.type) {
    case SELECT_PLAYER:
      if (state.selected.length >= 15) return state;
      return { ...state, selected: [...state.selected, action.payload] };
    case PLAYER_TAKEN:
      return { ...state, taken: [...state.taken, action.payload] };
    case REMOVE_PLAYER:
      const index = state.selected.findIndex(
        p => p.playerId === action.payload,
      );
      return {
        ...state,
        selected: [
          ...state.selected.slice(0, index),
          ...state.selected.slice(index + 1),
        ],
      };
    default:
      return state;
  }
};

export default teamReducer;
