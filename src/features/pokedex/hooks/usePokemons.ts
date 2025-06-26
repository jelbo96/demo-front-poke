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

  // Inicializa la lista Zustand si está vacía
  if (storedPokemonNames.length === 0 && pokemons.length > 0) {
    setPokemons(pokemons.map((p) => p.name));
  }

  // Filtra solo los pokemons que no fueron eliminados
  const filteredPokemons = pokemons.filter((p) =>
    storedPokemonNames.includes(p.name)
  );

  return { pokemons: filteredPokemons, ...query };
}
