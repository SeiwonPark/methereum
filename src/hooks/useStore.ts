import create from 'zustand';

declare interface LocalState {
  clicked: boolean;
  changeClickState: () => void;
}

export const useStore = create<LocalState>((set) => ({
  clicked: false,
  changeClickState: () => {
    set((state) => ({
      clicked: !state.clicked,
    }));
  },
}));
