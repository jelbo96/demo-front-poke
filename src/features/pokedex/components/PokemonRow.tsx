import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { type PokemonDetailed } from '../types/pokemon.types';
import { Trash as TrashIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { usePokemonNicknames } from '../hooks/usePokemonNicknames';

export default function PokemonRow({
  pokemon,
  setSelectedPokemon,
}: {
  pokemon: PokemonDetailed;
  setSelectedPokemon?: (pokemon: PokemonDetailed) => void;
}) {
  const { getNickname, setNickname } = usePokemonNicknames();
  const nickName = getNickname(pokemon.name);

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
      <TableCell className="pr-4">
        <Input
          type="text"
          placeholder="Cambiar apodo"
          className="w-full"
          value={nickName || ''}
          onChange={(e) => {
            setNickname(pokemon.name, e.target.value);
          }}
        />
      </TableCell>
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
