import './App.css';
import React, { useState } from 'react';
import { usePokemons } from './features/pokedex/hooks/usePokemons';
import PokemonTable from './features/pokedex/components/PokemonTable';
import { Input } from './components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import { Button } from './components/ui/button';
import { usePokemonStore } from './features/pokedex/hooks/usePokemonStore';

function App() {
  const { pokemons, isLoading, error, setNickname } = usePokemons();

  const reset = usePokemonStore((state) => state.reset);
  const [query, setQuery] = useState('');

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar Pokémon</p>;

  return (
    <div className="p-4 flex flex-col items-center  mx-auto bg-white shadow-md rounded-lg mt-1 bg-[#435490]">
      <Button onClick={() => console.log('Button clicked!', pokemons)}>
        Ver Pokémon
      </Button>

      <Button
        onClick={() => setNickname('pikachu', 'Pika Pika')}
        className="mt-4"
      >
        Cambiar apodo de Pikachu
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          reset();
        }}
      >
        Resetear Pokemons
      </Button>

      <div>
        <div className="flex items-center justify-between pb-2 pt-8">
          <h1 className="text-3xl font-bold mb-4">Pokédex</h1>

          <div className="relative w-[250px] max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar Pokémon..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {pokemons && (
          <PokemonTable pokemons={pokemons} query={query.toLowerCase()} />
        )}
      </div>
    </div>
  );
}

export default App;
