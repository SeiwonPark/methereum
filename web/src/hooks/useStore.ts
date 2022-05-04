import create from 'zustand';

interface ModelInfo {
  [uuid: string]: {
    name: string;
    tokenId: number;
  };
}

declare interface LocalState {
  clicked: boolean;
  userAddress: string;
  model: ModelInfo;
  changeClickState: () => void;
  changeUserAddress: (address: string) => void;
  changeModelInfo: (obj: ModelInfo) => void;
}

export const useStore = create<LocalState>((set) => ({
  clicked: false,
  userAddress: '',
  model: {},
  changeClickState: () => {
    set((state) => ({
      clicked: !state.clicked,
    }));
  },
  changeUserAddress: (address: string) => {
    set(() => ({
      userAddress: address,
    }));
  },
  changeModelInfo: (obj: ModelInfo) => {
    set((state) => ({
      model: { ...(state.model), ...obj },
    }));
  },
}));
