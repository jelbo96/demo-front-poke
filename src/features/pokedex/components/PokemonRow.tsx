import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { type PokemonDetailed } from '../types/pokemon.types';

export default function PokemonRow({ pokemon }: { pokemon: PokemonDetailed }) {
  return (
    <TableRow /*  style={{ backgroundColor: pokemon.color }} */>
      <TableCell>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-12 h-12 mx-auto"
        />
      </TableCell>
      <TableCell className="capitalize">{pokemon.name}</TableCell>
      <TableCell>{pokemon.types.join(', ')}</TableCell>
      <TableCell>{pokemon.experience}</TableCell>
      <TableCell>{pokemon.height}</TableCell>
      <TableCell>{pokemon.weight}</TableCell>
      <TableCell>{(pokemon.weight / 10).toFixed(2)} kg</TableCell>
      <TableCell>
        <Button>Ver</Button>
      </TableCell>
    </TableRow>
  );
}
