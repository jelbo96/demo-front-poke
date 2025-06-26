import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '@/shared/utills/fetchWithCancel';
import { usePokemonNicknames } from './usePokemonNicknames';
import { type PokemonDetailed } from '../types/pokemon.types';

export function usePokemons() {
  const { getNickname, setNickname } = usePokemonNicknames();

  const { data: pokemons = [], ...query } = useQuery<PokemonDetailed[]>({
    queryKey: ['pokemons'],
    queryFn: fetchPokemonList,
    staleTime: 1000 * 60 * 5,
  });

  const pokemonsWithNicknames = pokemons.map((p) => ({
    ...p,
    nickname: getNickname(p.name),
  }));

  return {
    pokemons: pokemonsWithNicknames,
    setNickname,
    ...query,
  };
}
