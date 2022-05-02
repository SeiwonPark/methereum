import create from 'zustand';

interface ModelInfo {
  [uuid: string]: {
    name: string;
    tokenId: number;
  };
}

declare interface LocalState {
  clicked: boolean;
  model: ModelInfo;
  changeClickState: () => void;
  changeModelInfo: (obj: ModelInfo) => void;
}

export const useStore = create<LocalState>((set) => ({
  clicked: false,
  model: {},
  changeClickState: () => {
    set((state) => ({
      clicked: !state.clicked,
    }));
  },
  changeModelInfo: (obj: ModelInfo) => {
    set((state) => ({
      model: { ...(state.model), ...obj },
    }));
  },
}));
