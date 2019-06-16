import { toast } from 'react-toastify';
import {
  ITeamActions,
  PLAYER_TAKEN,
  REMOVE_PLAYER,
  SELECT_PLAYER,
  UNTAKE_PLAYER,
} from './TeamActions';
import { rankings_rank_tiers_players } from '../rankings/__generated__/rankings';

export interface ITeamState {
  selected: rankings_rank_tiers_players[];
  taken: rankings_rank_tiers_players[];
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
      if (state.selected.length >= 15) {
        toast.error('Already drafted maximum number of players');
        return state;
      }
      return { ...state, selected: [...state.selected, action.payload] };
    case PLAYER_TAKEN:
      return { ...state, taken: [...state.taken, action.payload] };
    case REMOVE_PLAYER:
      // eslint-disable-next-line no-case-declarations
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
    case UNTAKE_PLAYER:
      // eslint-disable-next-line no-case-declarations
      const loc = state.taken.findIndex(p => p.playerId === action.payload);
      return {
        ...state,
        taken: [...state.taken.slice(0, loc), ...state.taken.slice(loc + 1)],
      };
    default:
      return state;
  }
};

export default teamReducer;
