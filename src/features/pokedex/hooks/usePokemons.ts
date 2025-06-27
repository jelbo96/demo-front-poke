import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '@/shared/utills/fetchWithCancel';
import { usePokemonStore } from './usePokemonStore';
import { type PokemonDetailed } from '../types/pokemon.types';

export function usePokemons() {
  const { pokemons: storedPokemonNames, setPokemons } = usePokemonStore();
  const { data: pokemons = [], ...query } = useQuery<PokemonDetailed[]>({
    queryKey: ['pokemons'],
    queryFn: fetchPokemonList,
    staleTime: 1000 * 60 * 5,
  });

  if (storedPokemonNames.length === 0 && pokemons.length > 0) {
    setPokemons(pokemons.map((p: PokemonDetailed) => p.name));
  }

  interface FilteredPokemon {
    name: string;
    [key: string]: unknown;
  }

  const filteredPokemons: FilteredPokemon[] = pokemons.filter(
    (p: FilteredPokemon) => storedPokemonNames.includes(p.name)
  );

  return { pokemons: filteredPokemons, ...query };
}
