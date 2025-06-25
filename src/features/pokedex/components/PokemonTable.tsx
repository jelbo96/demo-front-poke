import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PokemonRow from './PokemonRow';
import { type PokemonDetailed } from '../types/pokemon.types';
import { useMemo, useState } from 'react';

type Props = {
  pokemons: PokemonDetailed[];
};

export default function PokemonTable({ pokemons }: Props) {
  const [sortAsc, setSortAsc] = useState(true);

  const sortedPokemons = useMemo(() => {
    return [...pokemons].sort((a, b) => {
      return sortAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  }, [pokemons, sortAsc]);

  return (
    <div className="w-full">
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]">Imagen</TableHead>
            <TableHead
              onClick={() => setSortAsc((prev) => !prev)}
              className="cursor-pointer select-none"
            >
              Nombre {sortAsc ? '↑' : '↓'}
            </TableHead>
            <TableHead className="w-[15%]">Tipo(s)</TableHead>
            <TableHead className="w-[15%]">Experiencia</TableHead>
            <TableHead className="w-[10%]">Altura</TableHead>
            <TableHead className="w-[10%]">Peso</TableHead>
            <TableHead className="w-[15%]">Campo Dinámico</TableHead>
            <TableHead className="w-[10%]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPokemons.map((p) => (
            <PokemonRow key={p.name} pokemon={p} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
