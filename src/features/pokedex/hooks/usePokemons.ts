import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '@/shared/utills/fetchWithCancel';
import { type PokemonDetailed } from '../types/pokemon.types';

export function usePokemons() {
  return useQuery<PokemonDetailed[]>({
    queryKey: ['pokemons'],
    queryFn: fetchPokemonList,
    staleTime: 1000 * 60 * 5, // 5 min
  });
}
