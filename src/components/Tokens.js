import React from 'react';
import Token from './Token';
import {
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableRow,
  } from '@aws-amplify/ui-react';
  
const Tokens = ({
    caption,
    highlightOnHover,
    size,
    variation,
  }) => (
    <Table
      caption={caption}
      highlightOnHover={highlightOnHover}
      size={size}
      variation={variation}
    >
      <TableHead>
        <TableRow>
          <TableCell as="th">Coin</TableCell>
          <TableCell as="th">Price</TableCell>
          <TableCell as="th">Potencial</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>BTC</TableCell>
          <TableCell>20.000 USD</TableCell>
          <TableCell>3x</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>ETH</TableCell>
          <TableCell>1.300 USD</TableCell>
          <TableCell>4x</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Solana</TableCell>
          <TableCell>39 USD</TableCell>
          <TableCell>7x</TableCell>
        </TableRow>
      </TableBody>
    </Table>
);

export default Tokens