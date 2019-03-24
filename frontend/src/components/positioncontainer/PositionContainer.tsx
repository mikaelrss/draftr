import React from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';

import { IPlayerRankingDTO } from '../rankings/graphql';
import TeamLogo from '../../svg/nfllogos/TeamLogo';

interface IProps {
  position: string;
  players: IPlayerRankingDTO[];
}

const Player = ({
  player,
  positionRank,
}: {
  player: IPlayerRankingDTO;
  positionRank: number;
}) => (
  <TableRow>
    <TableCell>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.5em' }}>
        <TeamLogo team={player.team} />
        {player.displayName}
      </div>
    </TableCell>
    <TableCell>{positionRank}</TableCell>
  </TableRow>
);

const PositionContainer = ({ position, players }: IProps) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">Name</TableCell>
            <TableCell variant="head">Position Rank</TableCell>
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
