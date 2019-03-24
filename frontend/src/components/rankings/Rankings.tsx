import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import groupBy from 'lodash.groupby';

import { Grid, Typography } from '@material-ui/core';

import { GET_FANTASY_FOOTBALL_RANKINGS, IPlayerRankingDTO } from './graphql';
import Loader from '../shared/loader/Loader';
import PositionContainer from '../positioncontainer/PositionContainer';

interface IData {
  fantasyFootballNerdRankings: IPlayerRankingDTO[];
}

const Rankings = () => {
  const { data, loading } = useQuery<IData>(GET_FANTASY_FOOTBALL_RANKINGS);
  if (loading || !data) return <Loader />;

  const positional = groupBy(data.fantasyFootballNerdRankings, 'position');

  return (
    <Grid container spacing={24} justify="center">
      <Grid item>
        <Typography>RB</Typography>
        <PositionContainer position="RB" players={positional.RB} />
      </Grid>
      <Grid item>
        <Typography>WR</Typography>
        <PositionContainer position="WR" players={positional.WR} />
      </Grid>
      <Grid item>
        <Typography>QB</Typography>

        <PositionContainer position="QB" players={positional.QB} />
      </Grid>
      <Grid item>
        <Typography>TE</Typography>

        <PositionContainer position="TE" players={positional.TE} />
      </Grid>
    </Grid>
  );
};

export default Rankings;
