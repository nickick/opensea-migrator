import { createContext } from 'react';

export type NFT = {
  image_url: string;
  name: string;
  token_id: string;
};

type PiecesContextType = {
  pieces: Set<string>;
  setPieces: React.Dispatch<React.SetStateAction<Set<string>>>;
  nfts: NFT[];
  setNfts: React.Dispatch<React.SetStateAction<NFT[]>>;
};

const PiecesContext = createContext<PiecesContextType | null>({
  pieces: new Set(),
  setPieces: () => {},
  nfts: [],
  setNfts: () => {},
});

export default PiecesContext;
