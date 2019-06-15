import { createSelector } from 'reselect';
import { IState } from '../../redux/store';

const getTeam = (state: IState) => state.team;
const getDraftMode = (state: IState) => state.draftMode;

export default createSelector(
  getTeam,
  getDraftMode,
  (team, draftMode) => ({
    passed: [...team.selected, ...team.taken].map(player => player.playerId),
    draftModeStatus: draftMode.activated,
  }),
);
