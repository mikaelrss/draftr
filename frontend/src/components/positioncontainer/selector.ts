import { createSelector } from 'reselect';
import { IState } from '../../redux/store';

const getTeam = (state: any) => state.team;

export default createSelector(
  getTeam,
  team => ({
    passed: [...team.selected, ...team.taken].map(player => player.playerId),
  }),
);
