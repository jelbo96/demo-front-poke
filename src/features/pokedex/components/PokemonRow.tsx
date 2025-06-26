import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { type PokemonDetailed } from '../types/pokemon.types';
import { Trash as TrashIcon } from 'lucide-react';

export default function PokemonRow({
  pokemon,
  setSelectedPokemon,
}: {
  pokemon: PokemonDetailed;
  setSelectedPokemon?: (pokemon: PokemonDetailed) => void;
}) {
  return (
    <TableRow
      className="text-left"
      onClick={() => setSelectedPokemon?.(pokemon)}
    >
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
        <Button
          onClick={() => {
            console.log('Eliminar Pokémon:', pokemon.name);
          }}
        >
          <TrashIcon className="w-4 h-4" />
          Eliminar
        </Button>
      </TableCell>
    </TableRow>
  );
}
