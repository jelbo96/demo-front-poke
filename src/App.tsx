import './App.css';
import { useState } from 'react';
import { usePokemons } from './features/pokedex/hooks/usePokemons';
import PokemonTable from './features/pokedex/components/PokemonTable';
import { Input } from './components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import { Button } from './components/ui/button';
import { usePokemonStore } from './features/pokedex/hooks/usePokemonStore';

function App() {
  const { pokemons, isLoading, error } = usePokemons();

  const reset = usePokemonStore((state) => state.reset);
  const [query, setQuery] = useState('');

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar Pokémon</p>;

  return (
    <div className="p-4 flex flex-col items-center  mx-auto bg-white shadow-md rounded-lg mt-1 bg-[#435490]  w-full overflow-x-auto">
      <div className="flex items-center justify-between pb-2 pt-8 w-full">
        <h1 className="text-3xl font-bold mb-4">Pokédex</h1>

        <div className="relative w-[350px] max-w-sm flex items-center gap-2">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar Pokémon..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 w-[250px] "
          />

          <Button
            variant="secondary"
            onClick={() => {
              reset();
            }}
          >
            Reestablecer
          </Button>
        </div>
      </div>

      {pokemons && (
        <PokemonTable pokemons={pokemons} query={query.toLowerCase()} />
      )}
    </div>
  );
}

export default App;
