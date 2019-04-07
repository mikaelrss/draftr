import { IPlayerRankingDTO } from '../components/rankings/graphql';
import {
  ITeamActions,
  PLAYER_TAKEN,
  REMOVE_PLAYER,
  SELECT_PLAYER,
} from '../components/team/TeamActions';

export interface ITeamState {
  selected: IPlayerRankingDTO[];
  taken: IPlayerRankingDTO[];
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
