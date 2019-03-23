import React from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';

import { IPlayerQueryDTO } from '../players/graphql';

interface IProps {
  position: string;
  players: IPlayerQueryDTO[];
}

const Player = ({ player }: { player: IPlayerQueryDTO }) => (
  <TableRow>
    <TableCell>{player.displayName}</TableCell>
    <TableCell>{player.team}</TableCell>
    <TableCell>{player.height}</TableCell>
    <TableCell>{player.weight}</TableCell>
    <TableCell>{player.jersey}</TableCell>
  </TableRow>
);

const PositionContainer = ({ position, players }: IProps) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Height</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Jersey</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map(player => (
            <Player key={player.playerId} player={player} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default PositionContainer;
