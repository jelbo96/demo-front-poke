import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import PokemonRow from './PokemonRow';
import { type PokemonDetailed } from '../types/pokemon.types';
import { useMemo, useState } from 'react';
import clsx from 'clsx';

type Props = {
  pokemons: PokemonDetailed[];
  query?: string;
};

const colorClassMap: Record<string, string> = {
  red: 'bg-red-100',
  blue: 'bg-blue-100',
  green: 'bg-green-100',
  yellow: 'bg-yellow-100',
  purple: 'bg-purple-100',
  pink: 'bg-pink-100',
  brown: 'bg-yellow-200',
  gray: 'bg-gray-100',
  black: 'bg-gray-900 text-white',
  white: 'bg-white border',
};

export default function PokemonTable({ pokemons, query }: Props) {
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedPokemon, setSelectedPokemon] =
    useState<PokemonDetailed | null>(null);

  const bgClass =
    selectedPokemon && selectedPokemon.color
      ? colorClassMap[selectedPokemon.color] || 'bg-neutral-100'
      : 'bg-neutral-100';

  const sortedPokemons = useMemo(() => {
    return [...pokemons]
      .sort((a, b) => {
        return sortAsc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      })
      .filter((pokemon) => {
        if (!query) return true;
        return pokemon.name.toLowerCase().includes(query);
      });
  }, [pokemons, sortAsc, query]);

  return (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-[1000px] table-fixed">
        <TableHeader>
          <TableRow className={clsx(bgClass, 'rounded p-4')}>
            <TableHead className="w-[10%]">Imagen</TableHead>
            <TableHead
              onClick={() => setSortAsc((prev) => !prev)}
              className="cursor-pointer select-none"
            >
              Nombre {sortAsc ? '↑' : '↓'}
            </TableHead>
            <TableHead className="w-[15%] ">Tipo(s)</TableHead>
            <TableHead className="w-[15%]">Experiencia</TableHead>
            <TableHead className="w-[10%]">Altura</TableHead>
            <TableHead className="w-[10%]">Peso</TableHead>
            <TableHead className="w-[15%]">Apodo</TableHead>
            <TableHead className="w-[10%]">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedPokemons.map((p) => (
            <PokemonRow
              key={p.name}
              pokemon={p}
              setSelectedPokemon={setSelectedPokemon}
            />
          ))}

          {sortedPokemons.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No se encontró ningún Pokémon
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
