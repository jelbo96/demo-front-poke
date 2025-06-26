import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type NicknameState = {
  nicknames: Record<string, string>;
  setNickname: (name: string, nickname: string) => void;
  getNickname: (name: string) => string;
};

export const usePokemonNicknames = create<NicknameState>()(
  persist(
    (set, get) => ({
      nicknames: {},
      setNickname: (name, nickname) =>
        set((state) => ({
          nicknames: { ...state.nicknames, [name]: nickname },
        })),
      getNickname: (name) => get().nicknames[name] || '',
    }),
    {
      name: 'pokemon-nicknames',
    }
  )
);
