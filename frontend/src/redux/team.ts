import { IPlayerRankingDTO } from '../components/rankings/graphql';
import {
  ITeamActions,
  PLAYER_TAKEN,
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
      return { ...state, selected: [...state.selected, action.payload] };
    case PLAYER_TAKEN:
      return { ...state, taken: [...state.taken, action.payload] };
    default:
      return state;
  }
};

export default teamReducer;
