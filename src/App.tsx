/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import './App.css';
/* import { Button } from '@/components/ui/button'; */
import { usePokemons } from './features/pokedex/hooks/usePokemons';
import PokemonTable from './features/pokedex/components/PokemonTable';

function App() {
  const { data, isLoading, error } = usePokemons();

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar Pokémon</p>;

  return (
    <div className="p-4 flex flex-col items-center  mx-auto bg-white shadow-md rounded-lg mt-1 bg-[#435490]">
      <div className="">
        <h1 className="text-3xl font-bold mb-4">Pokédex</h1>
        {data && <PokemonTable pokemons={data} />}
      </div>
    </div>
  );
}

export default App;
