import create from 'zustand';

interface ModelInfo {
  [uuid: string]: {
    name: string;
    tokenId: number;
    description: string;
  };
}

declare interface LocalState {
  clicked: boolean;
  userAddress: string;
  model: ModelInfo;
  modelId: number;
  modelDescription: string;
  changeClickState: () => void;
  changeUserAddress: (address: string) => void;
  changeModelInfo: (obj: ModelInfo) => void;
  changeModelId: (id: number) => void;
  changeModelDescription: (desc: string) => void;
}

export const useStore = create<LocalState>((set) => ({
  clicked: false,
  userAddress: '',
  model: {},
  modelId: -1,
  modelDescription: '',
  changeClickState: () => {
    set((state: LocalState) => ({
      clicked: !state.clicked,
    }));
  },
  changeUserAddress: (address: string) => {
    set(() => ({
      userAddress: address,
    }));
  },
  changeModelInfo: (obj: ModelInfo) => {
    set((state: LocalState) => ({
      model: { ...(state.model), ...obj },
    }));
  },
  changeModelId: (id: number) => {
    set(() => ({
      modelId: id,
    }));
  },
  changeModelDescription: (desc: string) => {
    set(() => ({
      modelDescription: desc,
    }));
  },
}));
