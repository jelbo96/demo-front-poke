import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type NicknameState = {
  nicknames: Record<string, string>;
  setNickname: (name: string, nickname: string) => void;
};

type PokemonListState = {
  pokemons: string[]; // solo guardaremos names eliminados o activos
  setPokemons: (names: string[]) => void;
  removePokemon: (name: string) => void;
  getNickname: (name: string) => string;
  reset: () => void;
};

export const usePokemonStore = create(
  persist<NicknameState & PokemonListState>(
    (set, get) => ({
      nicknames: {},
      setNickname: (name, nickname) =>
        set((state) => ({
          nicknames: { ...state.nicknames, [name]: nickname },
        })),

      getNickname: (name: string) => get().nicknames[name] || '',
      pokemons: [],
      setPokemons: (names) => set({ pokemons: names }),
      removePokemon: (name) =>
        set((state) => ({
          pokemons: state.pokemons.filter((n) => n !== name),
        })),

      reset: () =>
        set({
          nicknames: {},
          pokemons: [],
        }),
    }),
    {
      name: 'pokemon-store',
    }
  )
);
