import React from 'react';
// prettier-ignore
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, Fab, Theme } from '@material-ui/core';
import { Add, Done } from '@material-ui/icons';

import { IPlayerRankingDTO } from '../rankings/graphql';
import TeamLogo from '../../svg/nfllogos/TeamLogo';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => {
  return {
    fab: {
      margin: theme.spacing.unit,
      height: '36px',
      width: '36px',
    },
    player: {
      display: 'flex',
      alignItems: 'center',
    },
    logo: {
      marginRight: theme.spacing.unit,
    },
  };
};

interface IPlayerProps {
  player: IPlayerRankingDTO;
  positionRank: number;
  classes: {
    player: string;
    fab: string;
    logo: string;
  };
}

const Player = withStyles(styles)(
  ({ player, classes, positionRank }: IPlayerProps) => {
    return (
      <TableRow>
        <TableCell padding="dense">
          <div className={classes.player}>
            <TeamLogo team={player.team} className={classes.logo} />
            {player.displayName}
          </div>
        </TableCell>
        <TableCell padding="dense">{positionRank}</TableCell>
        <TableCell padding="dense">
          <Fab color="primary" className={classes.fab}>
            <Add />
          </Fab>
          <Fab color="secondary" className={classes.fab}>
            <Done />
          </Fab>
        </TableCell>
      </TableRow>
    );
  },
);

interface IProps {
  position: string;
  players: IPlayerRankingDTO[];
}

const PositionContainer = ({ position, players }: IProps) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="dense" variant="head">
              Name
            </TableCell>
            <TableCell padding="dense" variant="head">
              Rank
            </TableCell>
            <TableCell padding="dense" variant="head" />
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, index) => (
            <Player
              key={player.playerId}
              player={player}
              positionRank={index + 1}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default PositionContainer;
