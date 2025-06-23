import type { PokemonDetailed } from '../../features/pokedex/types/pokemon.types';

export async function fetchPokemonList(): Promise<PokemonDetailed[]> {
  const controller = new AbortController();
  const { signal } = controller;

  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30', {
    signal,
  });
  const { results } = await res.json();

  const data = await Promise.all(
    results.map(async ({ name }) => {
      const [detailsRes, speciesRes] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, { signal }),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`, { signal }),
      ]);

      const details = await detailsRes.json();
      const species = await speciesRes.json();

      return {
        name: details.name,
        image: details.sprites.front_default,
        experience: details.base_experience,
        height: details.height,
        weight: details.weight,
        types: details.types.map((t: any) => t.type.name),
        color: species.color.name,
      };
    })
  );

  return data;
}
