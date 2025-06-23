import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PokemonRow from './PokemonRow';
import { type PokemonDetailed } from '../types/pokemon.types';

type Props = {
  pokemons: PokemonDetailed[];
};

export default function PokemonTable({ pokemons }: Props) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Imagen</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Tipo(s)</TableHead>
          <TableHead>Experiencia</TableHead>
          <TableHead>Altura</TableHead>
          <TableHead>Peso</TableHead>
          <TableHead>Campo Dinámico</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pokemons.map((p) => (
          <PokemonRow key={p.name} pokemon={p} />
        ))}
      </TableBody>
    </Table>
  );
}
